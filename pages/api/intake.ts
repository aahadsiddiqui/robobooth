import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'

// Disable default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

// Helper to parse form data with files
const parseForm = (req: NextApiRequest): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true,
    })

    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}

// Helper to format form data for email
const formatEmailContent = (fields: any, files: any) => {
  // Handle formidable field format (can be string or array)
  const getField = (field: any) => {
    if (Array.isArray(field)) return field[0]
    return field || 'N/A'
  }
  
  const logoFile = files.companyLogo
  const logoInfo = logoFile 
    ? `✓ Logo uploaded (${Array.isArray(logoFile) ? logoFile[0]?.originalFilename || 'file' : logoFile.originalFilename || 'file'})` 
    : 'No logo uploaded'
  
  const inspirationFiles = Object.keys(files).filter(k => k.startsWith('inspirationImage_'))
  const inspirationCount = inspirationFiles.length
  
  return `
New Client Intake Form Submission

CUSTOM OVERLAY FILTER INFORMATION:
- Company Logo: ${logoInfo}
- Design Inspiration Images: ${inspirationCount} image(s) uploaded
- Filter Text: ${getField(fields.filterText)}

ROBOT CUSTOMIZATION:
- Robot Theme: ${getField(fields.robotTheme)}

VOICE ACTIVATION:
- Custom Message: ${getField(fields.voiceActivation)}

CONTACT DETAILS (Day of Event):
- Name: ${getField(fields.contactName)}
- Email: ${getField(fields.contactEmail)}
- Phone: ${getField(fields.contactPhone)}

LOADING INSTRUCTIONS:
${getField(fields.loadingInstructions) || 'No special instructions provided'}

Submitted at: ${getField(fields.submittedAt) || new Date().toISOString()}
  `.trim()
}

// Helper to save file to server storage
const saveFileToServer = async (file: any): Promise<string | null> => {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'intake')
    
    // Ensure directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 15)
    const originalName = file.originalFilename || 'upload'
    const ext = path.extname(originalName) || path.extname(file.filepath) || '.jpg'
    const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${randomStr}_${safeName}`
    const filePath = path.join(uploadsDir, fileName)

    // Copy file from temp location to permanent location
    fs.copyFileSync(file.filepath, filePath)

    // Generate public URL
    const publicUrl = `/api/uploads/intake/${fileName}`
    
    console.log('File saved to server:', {
      fileName,
      originalName: file.originalFilename,
      size: file.size,
      url: publicUrl,
    })

    return publicUrl
  } catch (error: any) {
    console.error('Error saving file to server:', error)
    return null
  }
}

// Helper to upload file to Google Drive (deprecated - using server storage instead)
const uploadToGoogleDrive = async (file: any, folderId?: string): Promise<string | null> => {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Google Service Account credentials not set for Drive upload')
      return null
    }

    console.log('Attempting to upload file to Google Drive:', {
      fileName: file.originalFilename,
      folderId: folderId || 'root',
      fileSize: file.size,
    })

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive', // Full Drive access (changed from drive.file)
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    })

    const drive = google.drive({ version: 'v3', auth })
    
    // Verify folder access if folderId is provided
    if (folderId) {
      try {
        const folderInfo = await drive.files.get({
          fileId: folderId,
          fields: 'id, name, permissions, owners',
          supportsAllDrives: true,
        })
        console.log('Folder access verified:', {
          folderId,
          folderName: folderInfo.data.name,
          owner: folderInfo.data.owners?.[0]?.emailAddress,
        })
      } catch (error: any) {
        console.error('Cannot access folder. Make sure it is shared with the service account with Editor permissions:', error.message)
        return null
      }
    }
    
    // Read the file as a stream (required by Google Drive API)
    const fileContent = fs.createReadStream(file.filepath)
    const fileName = file.originalFilename || `upload_${Date.now()}${path.extname(file.filepath)}`
    
    // Upload to Google Drive
    // IMPORTANT: For service accounts, we need to upload to a shared folder
    // Service accounts cannot create files in their own Drive storage
    // The folder must be in the user's Drive and shared with the service account
    
    if (!folderId) {
      console.error('GOOGLE_DRIVE_FOLDER_ID is required. Service accounts cannot upload to root Drive.')
      return null
    }
    
    // Try uploading directly to the shared folder
    // This should work if the folder is properly shared with Editor permissions
    const uploadParams: any = {
      requestBody: {
        name: fileName,
        parents: [folderId], // Must specify the shared folder
      },
      media: {
        mimeType: file.mimetype || 'image/jpeg',
        body: fileContent,
      },
      fields: 'id, webViewLink, webContentLink, parents, owners',
      supportsAllDrives: true,
      // Try adding this to ensure it uses the folder owner's quota
      enforceSingleParent: true,
    }
    
    let response
    try {
      response = await drive.files.create(uploadParams)
    } catch (error: any) {
      // If direct upload fails, try alternative: upload without parents then move
      if (error.code === 403 && error.message?.includes('storage quota')) {
        console.log('Direct upload failed, trying alternative method...')
        
        // Alternative: Upload to service account's Drive first (this will fail, but let's try a workaround)
        // Actually, this won't work either due to quota limitation
        
        // The real solution: Use OAuth or ensure proper folder sharing
        // For now, let's try one more thing - ensure the folder is a regular folder, not a Shared Drive
        throw new Error('Service account cannot upload files. Please ensure the folder is a regular Google Drive folder (not a Shared Drive) and is shared with the service account with Editor permissions. For personal Google accounts, you may need to use OAuth instead of service accounts.')
      }
      throw error
    }

    console.log('File uploaded to Google Drive:', {
      fileId: response.data.id,
      fileName: fileName,
    })

    // Make the file publicly viewable (or you can share with specific emails)
    await drive.permissions.create({
      fileId: response.data.id!,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
      supportsAllDrives: true, // Required for shared drives/folders
    })

    // Construct the link if webViewLink isn't available
    let link = response.data.webViewLink || response.data.webContentLink
    if (!link && response.data.id) {
      link = `https://drive.google.com/file/d/${response.data.id}/view`
    }
    console.log('Google Drive file link:', link)
    return link || null
  } catch (error: any) {
    console.error('Error uploading to Google Drive:', {
      message: error.message,
      code: error.code,
      details: error.response?.data || error,
    })
    return null
  }
}

// Helper to append to Google Sheets
const appendToGoogleSheets = async (rowData: string[]) => {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) {
      console.error('GOOGLE_SHEET_ID not set, skipping Google Sheets update')
      return
    }

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Google Service Account credentials not set')
      return
    }

    console.log('Attempting to append to Google Sheets:', {
      spreadsheetId,
      rowDataLength: rowData.length,
      serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    })

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    
    // Append row to the sheet named "Intake Form"
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Intake Form!A:J', // Adjust range based on your columns
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    })

    console.log('Successfully appended to Google Sheets:', {
      updatedCells: response.data.updates?.updatedCells,
      updatedRange: response.data.updates?.updatedRange,
    })
  } catch (error: any) {
    console.error('Error appending to Google Sheets:', {
      message: error.message,
      code: error.code,
      details: error.response?.data || error,
    })
    // Don't throw - we still want to send the email even if Google Sheets fails
  }
}

// Helper to send email
const sendEmail = async (content: string, fields: any) => {
  try {
    const recipientEmail = process.env.INTAKE_EMAIL_RECIPIENT || 'info@robobooth.ca'
    
    // Get contact email from fields
    const getField = (field: any) => {
      if (Array.isArray(field)) return field[0]
      return field || ''
    }
    const contactEmail = getField(fields.contactEmail)
    
    // Use Formspree or similar service
    if (process.env.FORMSPREE_INTAKE_ENDPOINT) {
      const formData = new FormData()
      formData.append('_to', recipientEmail)
      formData.append('_subject', 'New Client Intake Form Submission')
      formData.append('message', content)
      if (contactEmail) {
        formData.append('_replyto', contactEmail)
      }
      
      await fetch(process.env.FORMSPREE_INTAKE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      })
    } else {
      // Fallback: Log to console (you can implement your own email service here)
      console.log('='.repeat(80))
      console.log('NEW CLIENT INTAKE FORM SUBMISSION')
      console.log('='.repeat(80))
      console.log(content)
      console.log('='.repeat(80))
      console.log(`\nTo: ${recipientEmail}`)
      if (contactEmail) {
        console.log(`Reply-To: ${contactEmail}`)
      }
      console.log('\nNote: Configure FORMSPREE_INTAKE_ENDPOINT or implement email service')
    }
  } catch (error) {
    console.error('Error sending email:', error)
    // Don't throw - we still want to save to Google Sheets even if email fails
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Parse form data
    const { fields, files } = await parseForm(req)
    
    // Helper to get field value
    const getField = (field: any) => {
      if (Array.isArray(field)) return field[0] || ''
      return field || ''
    }

    // Save files to server storage and get links
    let logoLink = ''
    const inspirationLinks: string[] = []
    
    // Get base URL for constructing full file URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (req.headers.origin || `http://${req.headers.host || 'localhost:3000'}`)
    
    // Save company logo
    if (files.companyLogo) {
      const logoFile = Array.isArray(files.companyLogo) ? files.companyLogo[0] : files.companyLogo
      const relativePath = await saveFileToServer(logoFile)
      if (relativePath) {
        logoLink = `${baseUrl}${relativePath}`
      }
    }

    // Save inspiration images
    const inspirationFiles = Object.keys(files).filter(k => k.startsWith('inspirationImage_'))
    for (const key of inspirationFiles) {
      const file = Array.isArray(files[key]) ? files[key][0] : files[key]
      const relativePath = await saveFileToServer(file)
      if (relativePath) {
        inspirationLinks.push(`${baseUrl}${relativePath}`)
      }
    }

    // Prepare row data for Google Sheets
    // Match your column order: Timestamp, Contact Name, Contact Email, Contact Phone, 
    // Company Logo, Inspiration Images, Filter Text, Robot Theme, Voice Activation, Loading Instructions
    const rowData = [
      new Date().toISOString(), // Timestamp
      getField(fields.contactName),
      getField(fields.contactEmail),
      getField(fields.contactPhone),
      logoLink || 'No logo uploaded',
      inspirationLinks.length > 0 
        ? `${inspirationLinks.length} image(s): ${inspirationLinks.join(', ')}` 
        : 'No images uploaded',
      getField(fields.filterText),
      getField(fields.robotTheme),
      getField(fields.voiceActivation),
      getField(fields.loadingInstructions) || '',
    ]

    // Append to Google Sheets
    console.log('Preparing to append row data:', rowData)
    await appendToGoogleSheets(rowData)

    // Format content for email
    const emailContent = formatEmailContent(fields, files)
    
    // Send email (async, don't wait)
    sendEmail(emailContent, fields).catch(console.error)

    // Clean up uploaded files from temp directory
    try {
      if (files.companyLogo) {
        const logoFile = Array.isArray(files.companyLogo) ? files.companyLogo[0] : files.companyLogo
        if (logoFile.filepath && fs.existsSync(logoFile.filepath)) {
          fs.unlinkSync(logoFile.filepath)
        }
      }
      Object.keys(files).forEach(key => {
        if (key.startsWith('inspirationImage_')) {
          const file = Array.isArray(files[key]) ? files[key][0] : files[key]
          if (file.filepath && fs.existsSync(file.filepath)) {
            fs.unlinkSync(file.filepath)
          }
        }
      })
    } catch (cleanupError) {
      console.error('Error cleaning up files:', cleanupError)
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Intake form submitted successfully' 
    })
  } catch (error: any) {
    console.error('Error processing intake form:', error)
    return res.status(500).json({ 
      error: 'Failed to process intake form',
      details: error.message 
    })
  }
}

