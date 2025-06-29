export interface Testimonial {
  _id: string;
  name: string;
  designation?: string;
  company?: string;
  message: string;

  imageUrl: string;
  imagePublicId?: string;
  location?: string;
  memberSince: string;
  status: 'draft' | 'published';
  featured: boolean;
  category: 'Workshop' | 'Training' | 'Community' | 'Counseling' | 'Other';
  addedBy: string;
  createdAt: string;
  updatedAt: string;
} 