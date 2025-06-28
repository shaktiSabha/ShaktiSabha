import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  imagePublicId: {
    type: String, // For Cloudinary image management
    required: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Workshops', 'Community', 'Training', 'Events', 'Conferences', 'Other'],
    default: 'Other'
  },
  alt: {
    type: String,
    required: [true, 'Alt text is required for accessibility'],
    trim: true,
    maxlength: [200, 'Alt text cannot be more than 200 characters']
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  uploadedBy: {
    type: String,
    default: 'Admin User'
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

// Create indexes for better performance
gallerySchema.index({ category: 1, status: 1, createdAt: -1 });
gallerySchema.index({ featured: 1, status: 1 });
gallerySchema.index({ title: 'text', description: 'text' });

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

export default Gallery; 