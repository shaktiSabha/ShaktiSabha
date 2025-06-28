# Dynamic Blog System Setup Guide

## Overview
This project now includes a dynamic blog system with the following features:
- Rich text editor for blog content
- Cloudinary image upload integration
- Admin panel for blog management
- Dynamic blog display with individual blog pages

## Setup Instructions

### 1. Install Dependencies
The required dependencies have already been installed:
- `@tiptap/react` - Rich text editor
- `@tiptap/starter-kit` - Basic editor features
- `@tiptap/extension-image` - Image support in editor
- `cloudinary` - Cloudinary SDK
- `next-cloudinary` - Next.js Cloudinary integration

### 2. Cloudinary Setup
1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret

3. Create a `.env.local` file in the root directory with:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Features Available

#### Admin Panel (`/admin/blogs`)
- View all blog posts (published and drafts)
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- Search and filter blogs

#### Blog Creation (`/admin/blogs/new`)
- Rich text editor with formatting options
- Image upload to Cloudinary
- Draft/Published status
- Title and excerpt fields

#### Public Blog Display (`/blogs`)
- Shows only published blogs
- Responsive grid layout
- Blog cards with images and excerpts
- Click "Read More" to view full blog

#### Individual Blog Pages (`/blogs/[id]`)
- Full blog content display
- Hero image
- Author and date information
- View count
- Share functionality

### 4. Rich Text Editor Features
- Bold, Italic text formatting
- Headings (H1, H2, H3)
- Bullet and numbered lists
- Blockquotes
- Image insertion
- Undo/Redo functionality

### 5. Image Upload
- Drag and drop or click to upload
- Automatic upload to Cloudinary
- Preview before saving
- Remove image option

### 6. API Endpoints
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/[id]` - Get specific blog
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog
- `POST /api/upload-image` - Upload image to Cloudinary

### 7. Database
Currently using in-memory storage (mock database). For production:
- Replace mock data with actual database (MongoDB, PostgreSQL, etc.)
- Add proper authentication for admin routes
- Implement proper error handling

### 8. Styling
The blog system uses:
- Tailwind CSS for styling
- Custom UI components
- Responsive design
- Dark theme for admin panel

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `/admin/blogs` to manage blogs
3. Create new blogs with rich content and images
4. View published blogs at `/blogs`
5. Click on individual blogs to read full content

## Security Notes
- Add authentication to admin routes
- Validate file uploads
- Implement rate limiting
- Use environment variables for sensitive data
- Add CSRF protection

## Future Enhancements
- Categories and tags
- Comments system
- SEO optimization
- Social media sharing
- Email notifications
- Analytics tracking 