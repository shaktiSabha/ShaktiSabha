import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot be more than 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot be more than 2000 characters']
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread'
  },
  reply: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

// Create indexes for better performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ createdAt: -1 });

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact; 