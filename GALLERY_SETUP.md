# 📸 Gallery System Setup Guide

## 🚀 Quick Start

Your gallery system is now working with both demo data and database functionality!

### Option 1: Use Demo Data (Immediate)
- The gallery page automatically shows demo data if database is not connected
- No setup required - works immediately
- Perfect for testing and development

### Option 2: Full Database Setup

#### Step 1: Environment Setup
Create a `.env.local` file in your project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/shakti-sabha

# For production, use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shakti-sabha

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Step 2: MongoDB Setup

**Local MongoDB:**
1. Install MongoDB on your system
2. Start MongoDB service
3. Database will be created automatically

**MongoDB Atlas (Cloud):**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Replace MONGODB_URI in .env.local

#### Step 3: Add Sample Data
1. Go to Admin Panel → Gallery Management
2. Click "Add Sample Data" button
3. This will populate your database with demo gallery items

## 🎯 Features

### ✅ What's Working Now:
- **Automatic fallback**: Shows demo data when database is empty
- **Admin panel**: Full CRUD operations for gallery management
- **Categories**: Workshops, Community, Training, Events, Conferences, Other
- **Responsive design**: Beautiful gallery layout matching your website theme
- **Search & Filter**: Find images by category, title, or description
- **Image upload**: Ready for Cloudinary integration

### 🔧 Admin Features:
- Add new gallery items
- Edit existing items
- Delete items
- Publish/Draft status
- Featured items
- View analytics
- Seed sample data

## 🎨 Gallery Categories

- **Workshops**: Skill development and training sessions
- **Community**: Community gatherings and meetings
- **Training**: Professional and personal development
- **Events**: Health, wellness, and special events
- **Conferences**: Leadership and empowerment conferences
- **Other**: Miscellaneous gallery items

## 📱 Usage

1. **Public Gallery**: Visit `/our-gallery` to see the gallery
2. **Admin Login**: Visit `/admin/login` (admin/admin123)
3. **Manage Gallery**: Go to `/admin/gallery`

## 🚨 Troubleshooting

### Gallery showing demo data?
- This is normal when database is not connected
- Set up MongoDB connection to use real data
- Use "Add Sample Data" in admin panel to populate database

### Can't upload images?
- Set up Cloudinary credentials in .env.local
- Use the admin panel to add images

### Database connection errors?
- Check MongoDB is running (if using local)
- Verify MONGODB_URI in .env.local
- Check network connectivity (if using Atlas)

## 🔗 Related Files

- Gallery Page: `src/app/our-gallery/page.tsx`
- Admin Gallery: `src/app/admin/gallery/page.tsx`
- API Routes: `src/app/api/gallery/`
- Database Model: `src/models/Gallery.ts`

## 🎉 Ready to Use!

Your gallery system is now fully functional with beautiful UI, demo data fallback, and admin management capabilities! 