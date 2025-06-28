# MongoDB Setup for Blog System

## Overview
The blog system now uses MongoDB for persistent data storage. This guide will help you set up MongoDB for your project.

## Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (free tier available)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Set Environment Variable**
   Create `.env.local` file in your project root:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shakti-sabha?retryWrites=true&w=majority
   ```
   Replace `username`, `password`, and `cluster` with your actual values.

### Option 2: Local MongoDB

1. **Install MongoDB Community Edition**
   - Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB Service**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

3. **Set Environment Variable**
   ```env
   MONGODB_URI=mongodb://localhost:27017/shakti-sabha
   ```

## Database Features

### Blog Schema
```javascript
{
  title: String (required, max 200 chars),
  excerpt: String (required, max 500 chars),
  content: String (required),
  imageUrl: String (default: placeholder image),
  author: String (default: "Admin User"),
  status: String (enum: "draft" | "published"),
  views: Number (default: 0),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Indexes
- Text index on `title` and `excerpt` for search
- Compound index on `status` and `createdAt` for filtering

## API Endpoints

### Blog Management
- `GET /api/blogs` - Get all blogs (sorted by creation date)
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/[id]` - Get specific blog (increments views)
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog

### Image Upload
- `POST /api/upload-image` - Upload image to Cloudinary

## Environment Variables

Create `.env.local` file:
```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Testing the Setup

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Check MongoDB connection**
   - Look for "MongoDB connected successfully" in console
   - If error, check your connection string

3. **Create a test blog**
   - Go to `/admin/blogs/new`
   - Create a blog post
   - Check if it appears in `/admin/blogs`

## Troubleshooting

### Connection Issues
- Verify your MongoDB URI is correct
- Check if MongoDB service is running (local setup)
- Ensure network access (Atlas setup)

### Database Errors
- Check MongoDB logs for detailed error messages
- Verify database permissions
- Ensure indexes are created properly

### Performance Tips
- Use MongoDB Atlas for better performance
- Monitor database size and queries
- Consider adding more indexes for complex queries

## Production Deployment

### MongoDB Atlas (Recommended)
- Use MongoDB Atlas for production
- Set up proper authentication
- Configure network access
- Enable monitoring and alerts

### Environment Variables
- Set production environment variables
- Use strong passwords
- Enable SSL connections
- Configure backup strategies

## Security Considerations

1. **Database Security**
   - Use strong passwords
   - Enable authentication
   - Restrict network access
   - Regular backups

2. **Application Security**
   - Validate input data
   - Sanitize HTML content
   - Rate limiting
   - Error handling

3. **API Security**
   - Add authentication to admin routes
   - Validate file uploads
   - Implement CSRF protection
   - Use HTTPS in production 