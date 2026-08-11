import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { path: filePath } = req.query
    
    if (!filePath || !Array.isArray(filePath)) {
      return res.status(400).json({ error: 'Invalid file path' })
    }

    // The path will be ['intake', 'filename.jpg'] from /api/uploads/intake/filename.jpg
    // We only want the filename part after 'intake'
    if (filePath.length < 2 || filePath[0] !== 'intake') {
      return res.status(400).json({ error: 'Invalid path. Must be /api/uploads/intake/filename' })
    }

    // Get just the filename (everything after 'intake')
    // Decode URL encoding (e.g., %20 -> space)
    const fileName = decodeURIComponent(filePath.slice(1).join('/'))
    
    // Security: ensure no path traversal (after decoding)
    if (fileName.includes('..') || path.isAbsolute(fileName)) {
      return res.status(403).json({ error: 'Invalid filename' })
    }
    
    // Only allow forward slashes for subdirectories (if needed in future)
    // For now, we expect just the filename
    const baseName = path.basename(fileName)
    if (baseName !== fileName && fileName.includes('/')) {
      // Allow subdirectories but validate
      const parts = fileName.split('/').filter(p => p)
      if (parts.some(p => p.includes('..'))) {
        return res.status(403).json({ error: 'Invalid path' })
      }
    }

    // Construct the full file path
    const fullPath = path.join(process.cwd(), 'public', 'uploads', 'intake', fileName)

    // Security check: ensure the file is within the uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'intake')
    const normalizedFullPath = path.normalize(fullPath)
    const normalizedUploadsDir = path.normalize(uploadsDir)
    
    if (!normalizedFullPath.startsWith(normalizedUploadsDir)) {
      console.error('Security check failed:', { normalizedFullPath, normalizedUploadsDir })
      return res.status(403).json({ error: 'Access denied' })
    }

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.error('File not found:', { fullPath, fileName, filePath })
      return res.status(404).json({ error: 'File not found', path: fullPath })
    }

    // Get file stats
    const stats = fs.statSync(fullPath)
    if (!stats.isFile()) {
      return res.status(404).json({ error: 'Not a file' })
    }

    // Determine content type
    const ext = path.extname(fullPath).toLowerCase()
    const contentTypes: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.pdf': 'application/pdf',
    }
    const contentType = contentTypes[ext] || 'application/octet-stream'

    // Set headers
    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Length', stats.size)
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')

    // Stream the file
    const fileStream = fs.createReadStream(fullPath)
    fileStream.pipe(res)
  } catch (error: any) {
    console.error('Error serving file:', error)
    res.status(500).json({ error: 'Failed to serve file' })
  }
}

