import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  embedUrl: {
    type: String,
    required: [true, 'Embed URL is required'],
    validate: {
      validator: function(v: string) {
        return /^https:\/\/(www\.)?(youtube\.com\/embed\/|youtu\.be\/)/.test(v);
      },
      message: 'Please provide a valid YouTube embed URL'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Podcast', 'Interview', 'Documentary', 'Workshop', 'Discussion', 'Other'],
    default: 'Other'
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
  thumbnailUrl: {
    type: String,
    default: ''
  },
  duration: {
    type: String, // e.g., "45:30" for 45 minutes 30 seconds
    default: ''
  },
  uploadedBy: {
    type: String,
    default: 'Admin User'
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

// Create indexes for better performance
mediaSchema.index({ category: 1, status: 1, createdAt: -1 });
mediaSchema.index({ featured: 1, status: 1 });
mediaSchema.index({ title: 'text', description: 'text' });

const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);

export default Media; 