# Cloudinary Setup Guide

## Step 1: Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com/)
2. Sign up for a free account
3. After signup, you'll get your dashboard with credentials

## Step 2: Get Your Credentials
From your Cloudinary Dashboard, copy these values:
- **Cloud Name** (shown at the top of dashboard)
- **API Key** 
- **API Secret**

## Step 3: Create Environment File
Create a `.env.local` file in your project root with:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/shakti-sabha
```

## Step 4: Create Upload Preset
1. In your Cloudinary Dashboard, go to **Settings** → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Set these values:
   - **Preset name**: `shakti-sabha-uploads`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `shakti-sabha-blogs`
5. Save the preset

## Step 5: Restart Development Server
After creating the `.env.local` file, restart your development server:

```bash
npm run dev
```

## Image Upload Features
- Direct file upload from device
- URL-based image upload
- Automatic image optimization
- Cloud storage with CDN

Your image upload should now work perfectly! 