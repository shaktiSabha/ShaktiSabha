import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  designation: {
    type: String,
    trim: true,
    maxlength: [150, 'Designation cannot be more than 150 characters']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company cannot be more than 100 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },

  imageUrl: {
    type: String,
    default: 'https://source.unsplash.com/150x150/?portrait'
  },
  imagePublicId: {
    type: String, // For Cloudinary image management
    default: ''
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot be more than 100 characters']
  },
  memberSince: {
    type: String,
    default: '2024'
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['Workshop', 'Training', 'Community', 'Counseling', 'Other'],
    default: 'Other'
  },
  addedBy: {
    type: String,
    default: 'Admin User'
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

// Create indexes for better performance
testimonialSchema.index({ status: 1, createdAt: -1 });
testimonialSchema.index({ featured: 1, status: 1 });
testimonialSchema.index({ category: 1, status: 1 });
testimonialSchema.index({ name: 'text', message: 'text' });

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial; 