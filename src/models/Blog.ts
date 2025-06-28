import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [500, 'Excerpt cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  imageUrl: {
    type: String,
    default: 'https://source.unsplash.com/600x400/?blog'
  },
  author: {
    type: String,
    default: 'Admin User'
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

// Create indexes for better performance
blogSchema.index({ title: 'text', excerpt: 'text' });
blogSchema.index({ status: 1, createdAt: -1 });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog; 