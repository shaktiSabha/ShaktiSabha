import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  websiteName: {
    type: String,
    default: 'Shakti Sabha'
  },
  logoUrl: {
    type: String,
    default: '/shaktsabhaaa.jpg'
  },
  logoPublicId: {
    type: String,
    default: ''
  },
  favicon: {
    type: String,
    default: '/favicon.ico'
  },
  description: {
    type: String,
    default: 'Empowering women through education and support'
  },
  contactEmail: {
    type: String,
    default: 'contact@shaktisabha.com'
  },
  contactPhone: {
    type: String,
    default: ''
  },
  socialMedia: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    youtube: { type: String, default: '' }
  }
}, {
  timestamps: true
});

const Settings = mongoose.models?.Settings || mongoose.model('Settings', settingsSchema);

export default Settings; 