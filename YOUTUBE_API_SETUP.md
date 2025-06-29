# YouTube API Setup Guide

## Overview
To fetch real-time YouTube video statistics (views, likes, duration, etc.), you need to set up YouTube Data API v3.

## Step 1: Get YouTube API Key

### 1. Go to Google Cloud Console
- Visit [Google Cloud Console](https://console.cloud.google.com/)
- Sign in with your Google account

### 2. Create or Select Project
- Create a new project or select an existing one
- Give it a name like "Shakti Sabha Media"

### 3. Enable YouTube Data API v3
- Go to "APIs & Services" → "Library"
- Search for "YouTube Data API v3"
- Click on it and press "Enable"

### 4. Create API Key
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "API Key"
- Copy the generated API key

### 5. Restrict API Key (Recommended)
- Click on your API key to edit it
- Under "API restrictions", select "Restrict key"
- Choose "YouTube Data API v3"
- Under "Application restrictions", you can:
  - Leave unrestricted for development
  - Add your domain for production

## Step 2: Add API Key to Environment

### Add to `.env.local` file:
```env
YOUTUBE_API_KEY=your_api_key_here
```

## Step 3: Usage

### Sync YouTube Data
1. Go to Admin Panel → Media Management
2. Click "Sync YouTube Views" button
3. This will update all media items with current YouTube statistics

### What Gets Updated:
- ✅ **View Count** - Real YouTube view count
- ✅ **Duration** - Actual video duration (e.g., "5:32")
- ✅ **Thumbnail** - High-quality YouTube thumbnail
- ✅ **Title & Description** - Can be synced if needed

### Features Available:
- **Batch Processing** - Updates all videos at once
- **Error Handling** - Graceful fallback if API fails
- **Rate Limiting** - Respects YouTube API limits
- **Smart Formatting** - Converts large numbers (1.2M views)

## Step 4: API Endpoints

### Sync All Media with YouTube
```bash
POST /api/media/sync-youtube
```

### Check Sync Status
```bash
GET /api/media/sync-youtube
```

## API Quotas & Limits

### YouTube Data API Quotas:
- **Free Tier**: 10,000 units per day
- **Each video stats request**: ~3 units
- **Can sync ~3,300 videos per day** for free

### Rate Limits:
- 100 requests per 100 seconds per user
- 10,000 requests per day

## Troubleshooting

### Common Issues:

1. **"YouTube API key not found"**
   - Make sure `YOUTUBE_API_KEY` is in your `.env.local` file
   - Restart your development server

2. **"API error: 403"**
   - Check if YouTube Data API v3 is enabled
   - Verify API key restrictions

3. **"Video not found"**
   - Video might be private or deleted
   - Check if embed URL is correct

4. **"Quota exceeded"**
   - You've hit the daily limit
   - Wait until next day or upgrade to paid plan

### Testing API Key:
```bash
curl "https://www.googleapis.com/youtube/v3/videos?id=XGWKRKWcpZE&part=statistics&key=YOUR_API_KEY"
```

## Cost Information

### Free Tier:
- 10,000 units per day
- Perfect for small to medium websites

### Paid Tier:
- $0.05 per 1,000 additional units
- Very affordable for most use cases

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** only
3. **Restrict API key** to your domain in production
4. **Monitor usage** in Google Cloud Console
5. **Rotate keys** periodically

## Benefits of YouTube Sync

✅ **Real-time data** - Always current view counts  
✅ **Accurate duration** - Exact video length  
✅ **Better thumbnails** - High-quality images  
✅ **Auto-updates** - Keep data fresh  
✅ **Professional look** - Shows real engagement  

Your media page will now display authentic YouTube statistics! 🎉 