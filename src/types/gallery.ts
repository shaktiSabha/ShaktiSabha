export interface Gallery {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  imagePublicId: string;
  category: 'Workshops' | 'Community' | 'Training' | 'Events' | 'Conferences' | 'Other';
  alt: string;
  status: 'draft' | 'published';
  views: number;
  featured: boolean;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGalleryRequest {
  title: string;
  description: string;
  imageUrl: string;
  imagePublicId: string;
  category: string;
  alt: string;
  status?: 'draft' | 'published';
  featured?: boolean;
}

export interface UpdateGalleryRequest extends Partial<CreateGalleryRequest> {
  _id: string;
}

export interface GalleryAPIResponse {
  success: boolean;
  data: Gallery | Gallery[];
  message?: string;
  error?: string;
  count?: number;
} 