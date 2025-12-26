# Image Upload Troubleshooting Checklist

Use this checklist to diagnose and fix image upload issues.

## ✅ Pre-Flight Checks

### 1. Cloudinary Credentials
```bash
npm run test:cloudinary
```
- [ ] Test passes with "✅ All tests passed!"
- [ ] Shows your account details
- [ ] No authentication errors

**If this fails**: Your credentials are wrong. Check `.env` file.

### 2. Development Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] Accessible at `http://localhost:3000`
- [ ] No compilation errors

**If this fails**: Fix any TypeScript/build errors first.

### 3. Environment Variables
Check your `.env` file has:
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dvsqie2oh`
- [ ] `CLOUDINARY_API_KEY=763997192284934`
- [ ] `CLOUDINARY_API_SECRET=iGISN0kVIoUQm5Wjdf676J6Lenw`
- [ ] No extra spaces or quotes around values
- [ ] File is named `.env` (not `.env.txt`)

**If missing**: Add them and restart server.

## 🔍 Upload Test

### Step 1: Open Upload Page
- [ ] Navigate to `/admin/gallery/new`
- [ ] Page loads without errors
- [ ] Upload button is visible

### Step 2: Open Browser Console
- [ ] Press F12 to open DevTools
- [ ] Go to Console tab
- [ ] Clear any existing messages

### Step 3: Prepare Test Image
- [ ] Image file is PNG, JPG, or GIF
- [ ] File size is under 10MB
- [ ] File is not corrupted

### Step 4: Upload Image
- [ ] Click "Upload Image" button
- [ ] File picker opens
- [ ] Select your test image
- [ ] Watch console for messages

## 📊 Expected Console Output

### Success Path:
```
Starting upload: test-image.jpg 2048576 image/jpeg
Upload successful: { imageUrl: "https://res.cloudinary.com/...", publicId: "..." }
```

### Error Path:
```
Starting upload: test-image.jpg 2048576 image/jpeg
Upload failed: [specific error message]
Upload error: Error: [details]
```

## 🐛 Error Messages & Solutions

### "Please select an image file"
- **Cause**: Selected file is not an image
- **Fix**: Select PNG, JPG, GIF, or WebP file

### "File size must be less than 10MB"
- **Cause**: File too large
- **Fix**: Compress or resize image

### "Server configuration error: Missing Cloudinary credentials"
- **Cause**: Environment variables not loaded
- **Fix**: 
  1. Check `.env` file exists
  2. Restart dev server
  3. Run `npm run test:cloudinary`

### "Upload failed: Invalid signature"
- **Cause**: Wrong API secret
- **Fix**: 
  1. Log into Cloudinary dashboard
  2. Copy API secret exactly
  3. Update `.env` file
  4. Restart server

### "Upload failed: Unauthorized"
- **Cause**: Wrong API key or account suspended
- **Fix**: 
  1. Verify credentials in Cloudinary dashboard
  2. Check account status
  3. Try regenerating API key/secret

### "Network error" or "Failed to fetch"
- **Cause**: Server not running or network issue
- **Fix**: 
  1. Check `npm run dev` is running
  2. Verify URL is `localhost:3000`
  3. Check firewall/antivirus

### "Upload failed: [no specific message]"
- **Cause**: Unknown error
- **Fix**: 
  1. Check terminal where `npm run dev` is running
  2. Look for server-side error messages
  3. Check Network tab in DevTools

## 🔧 Terminal Output

### In your terminal (where npm run dev runs):

**Success:**
```
Uploading file: test-image.jpg, size: 2048576 bytes, type: image/jpeg
Upload successful: shakti-sabha-gallery/abc123
```

**Error:**
```
Uploading file: test-image.jpg, size: 2048576 bytes, type: image/jpeg
Cloudinary upload error: [error details]
Upload error: [full error]
```

## 📱 Network Tab Check

1. Open DevTools → Network tab
2. Try uploading
3. Look for `/api/upload-image` request
4. Check:
   - [ ] Request is sent (shows in list)
   - [ ] Status code (200 = success, 4xx/5xx = error)
   - [ ] Response body (click request → Response tab)

### Status Codes:
- **200**: Success ✅
- **400**: Bad request (invalid file)
- **401**: Unauthorized (wrong credentials)
- **403**: Forbidden (account issue)
- **500**: Server error (check terminal)

## 🎯 Quick Fixes

### Fix 1: Restart Everything
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Fix 2: Clear Browser Cache
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### Fix 3: Test with Different Image
- Try a small (< 1MB) JPG file
- Use a simple filename (no spaces/special chars)

### Fix 4: Check Cloudinary Dashboard
1. Go to https://cloudinary.com/console
2. Check account status
3. Verify credentials
4. Check usage limits

## ✅ Success Indicators

You'll know it's working when:
- [ ] Console shows "Upload successful"
- [ ] Alert says "Image uploaded successfully!"
- [ ] Image preview appears on page
- [ ] No errors in console or terminal

## 📞 Still Stuck?

If you've tried everything and it still doesn't work:

1. **Run the test**: `npm run test:cloudinary`
2. **Copy console output**: From browser DevTools
3. **Copy terminal output**: From npm run dev
4. **Share these**: So we can see the exact error

Remember: Your Cloudinary account is working (test passed), so the issue is likely:
- File selection/validation
- Network/browser issue
- Server not running
- Cache issue

Most issues are solved by restarting the dev server! 🔄
