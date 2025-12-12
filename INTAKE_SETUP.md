# Client Intake Form Setup Guide

This guide will help you set up the client intake form at `/intake` with email forwarding, Google Sheets integration, and Google Drive file storage.

## Installation

First, install the required dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

### Email Configuration

```env
# Email recipient for intake form submissions
INTAKE_EMAIL_RECIPIENT=info@robobooth.ca

# Optional: Formspree endpoint for email delivery
# If not set, emails will be logged to console
FORMSPREE_INTAKE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

### Google Sheets & Drive Integration

To enable Google Sheets and Drive integration, you'll need to set up a Google Service Account:

1. **Create a Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Required APIs:**
   - Navigate to "APIs & Services" > "Library"
   - Enable the following APIs:
     - **Google Sheets API**
     - **Google Drive API**

3. **Create a Service Account:**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Give it a name (e.g., "robobooth-intake")
   - Click "Create and Continue"
   - Skip the optional steps and click "Done"

4. **Create and Download Key:**
   - Click on the service account you just created
   - Go to the "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the JSON file

5. **Share Google Sheet with Service Account:**
   - Open your Google Sheet (e.g., "Intake Form")
   - Click "Share" button
   - Add the service account email (found in the JSON file as `client_email`)
   - Give it "Editor" permissions
   - Copy the Google Sheet ID from the URL:
     - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
     - Example: `https://docs.google.com/spreadsheets/d/1-gn-eHUuzKzHfwokp37XfAzGG_BOVXU429Atu6xoamo/edit`
     - The `SHEET_ID` is what you need: `1-gn-eHUuzKzHfwokp37XfAzGG_BOVXU429Atu6xoamo`

6. **Share Google Drive Folder with Service Account:**
   - Open your Google Drive folder (e.g., "Robo Booth Intake Files")
   - Click "Share" button
   - Add the service account email (same one from step 5)
   - Give it "Editor" permissions
   - Copy the Folder ID from the URL:
     - URL format: `https://drive.google.com/drive/folders/FOLDER_ID`
     - Example: `https://drive.google.com/drive/u/3/folders/1URwU0cleBmZ7a-nGm_bUMbLvBkKKr793`
     - The `FOLDER_ID` is: `1URwU0cleBmZ7a-nGm_bUMbLvBkKKr793`

7. **Add to Environment Variables:**
   ```env
   # Google Sheets Configuration
   GOOGLE_SHEET_ID=1-gn-eHUuzKzHfwokp37XfAzGG_BOVXU429Atu6xoamo
   GOOGLE_DRIVE_FOLDER_ID=1URwU0cleBmZ7a-nGm_bUMbLvBkKKr793
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   ```

   **Important:** 
   - Copy the entire private key from the JSON file
   - Keep the `\n` characters or replace them with actual newlines
   - The private key should be wrapped in quotes
   - Make sure your Google Sheet has a tab named "Intake Form" (or update the range in the code)

## Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/intake`

3. Fill out the form and submit

4. Check:
   - Email should be sent to `INTAKE_EMAIL_RECIPIENT` (or logged to console)
   - Google Sheet should be updated with a new row (if configured)
   - Uploaded files should appear in your Google Drive folder with links in the sheet

## Form Fields

The intake form includes:

1. **Custom Overlay Filter Information:**
   - Company Logo upload
   - Design inspiration images (multiple)
   - Filter text

2. **Robot Customization:**
   - Robot theme/description

3. **Custom Voice Activation:**
   - One-liner message for the robot

4. **Contact Details (Day of Event):**
   - Contact name
   - Contact email
   - Contact phone

5. **Loading Instructions (Optional):**
   - Special setup/loading instructions

## Troubleshooting

### Email not sending
- Check that `INTAKE_EMAIL_RECIPIENT` is set correctly
- If using Formspree, verify the endpoint URL is correct
- Check server logs for error messages

### Google Sheet not updating
- Verify the service account email has editor access to the spreadsheet
- Check that `GOOGLE_SHEET_ID` is correct (just the ID, not the full URL)
- Ensure your sheet has a tab named "Intake Form" (or update the range in the code)
- Ensure the private key is properly formatted with `\n` characters
- Check server logs for authentication errors

### Files not uploading to Google Drive
- Verify the service account email has editor access to the Drive folder
- Check that `GOOGLE_DRIVE_FOLDER_ID` is correct (just the ID, not the full URL)
- Ensure Google Drive API is enabled in Google Cloud Console
- Check server logs for upload errors

### File upload issues
- Ensure the uploads directory has write permissions
- Check file size limits (currently set to 10MB per file)
- Verify file types are supported (images)

## Security Notes

- Keep your `.env.local` file private and never commit it to version control
- The intake form is accessible at `/intake` - consider adding authentication if needed
- File uploads are temporarily stored and then deleted after processing
- Consider implementing rate limiting for production use

