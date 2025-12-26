# Cloudinary Upload Troubleshooting Guide

## Common Issues and Solutions

### 1. Check Environment Variables
Your `.env` file looks correct, but ensure:
- No extra spaces around the values
- The file is named `.env` (not `.env.local`)
- Development server was restarted after adding variables

**Current Configuration:**
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dvsqie2oh
CLOUDINARY_API_KEY=763997192284934
CLOUDINARY_API_SECRET=iGISN0kVIoUQm5Wjdf676J6Lenw
```

### 2. Verify Cloudinary Account Status
1. Log into your Cloudinary dashboard at https://cloudinary.com/console
2. Check if your account is active and not suspended
3. Verify the credentials match exactly

### 3. Check Upload Preset (if using unsigned uploads)
If you're using unsigned uploads, you need an upload preset:
1. Go to Settings → Upload in Cloudinary dashboard
2. Scroll to "Upload presets"
3. Create an unsigned preset named `shakti-sabha-uploads`
4. Set folder to `shakti-sabha-gallery`

### 4. Test the API Route Directly

Run this command to test if the API route is working:

```bash
curl -X POST http://localhost:3000/api/upload-image \
  -F "file=@path/to/test-image.jpg" \
  -F "folder=shakti-sabha-gallery"
```

### 5. Check Browser Console
Open browser DevTools (F12) and check:
- Network tab for failed requests
- Console tab for JavaScript errors
- Look for CORS errors or 401/403 authentication errors

### 6. Common Error Messages

**"Upload failed" or 401 Unauthorized:**
- Invalid API credentials
- Check if API key/secret are correct
- Ensure no extra spaces in .env file

**"Invalid signature" or 403 Forbidden:**
- API secret is incorrect
- Cloudinary account might be suspended

**Network Error or CORS:**
- Check if you're running on localhost:3000
- Verify Next.js dev server is running

**File too large:**
- Free Cloudinary accounts have upload limits
- Check file size (should be under 10MB)

### 7. Debug Mode

Add console logging to see what's happening:


## Quick Fix Steps

### Step 1: Test Cloudinary Connection
Run this command to verify your Cloudinary credentials:

```bash
npm run test:cloudinary
```

This will check:
- If environment variables are loaded
- If API credentials are valid
- Your account status and usage

### Step 2: Check the Browser Console
1. Open your browser DevTools (F12)
2. Go to the Console tab
3. Try uploading an image
4. Look for error messages starting with "Upload error:" or "Cloudinary upload error:"

### Step 3: Check Network Tab
1. Open DevTools → Network tab
2. Try uploading an image
3. Look for the `/api/upload-image` request
4. Check the response status and error message

### Step 4: Verify File Requirements
- File must be an image (PNG, JPG, GIF, etc.)
- File size must be under 10MB
- File name should not contain special characters

### Step 5: Restart Development Server
After any changes to `.env` file:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## Updated Code Features

The upload system now includes:

✅ **Better Error Messages**: Detailed error logging in console
✅ **File Validation**: Checks file type and size before upload
✅ **Configuration Check**: Verifies Cloudinary credentials are set
✅ **Success Feedback**: Shows success message after upload
✅ **Debug Logging**: Console logs for troubleshooting

## Still Having Issues?

### Check These Common Problems:

1. **Environment Variables Not Loading**
   - Make sure file is named `.env` (not `.env.txt` or `.env.local`)
   - Restart your development server
   - Check for typos in variable names

2. **Invalid Credentials**
   - Log into Cloudinary dashboard
   - Go to Dashboard → Account Details
   - Copy credentials exactly (no spaces)
   - Regenerate API secret if needed

3. **Account Suspended**
   - Check your Cloudinary email for notifications
   - Verify account is active in dashboard
   - Check if you've exceeded free tier limits

4. **CORS Issues**
   - Make sure you're accessing via `localhost:3000`
   - Check Cloudinary dashboard → Settings → Security
   - Ensure "Allowed fetch domains" includes your domain

5. **Network/Firewall Issues**
   - Check if your firewall blocks Cloudinary
   - Try disabling VPN if using one
   - Test on different network

## Manual Test

You can test the upload API directly using this curl command:

```bash
curl -X POST http://localhost:3000/api/upload-image \
  -F "file=@C:\path\to\your\image.jpg" \
  -F "folder=shakti-sabha-gallery"
```

Replace `C:\path\to\your\image.jpg` with an actual image path.

## Get Help

If none of these solutions work:

1. Run `npm run test:cloudinary` and share the output
2. Check browser console and share any error messages
3. Check the terminal where `npm run dev` is running for server errors
4. Verify your Cloudinary account status at https://cloudinary.com/console

## Additional Resources

- [Cloudinary Node.js Documentation](https://cloudinary.com/documentation/node_integration)
- [Cloudinary Upload API](https://cloudinary.com/documentation/image_upload_api_reference)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
