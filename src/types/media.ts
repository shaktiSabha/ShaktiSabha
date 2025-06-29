export interface Media {
  _id: string;
  title: string;
  description?: string;
  embedUrl: string;
  category: 'Podcast' | 'Interview' | 'Documentary' | 'Workshop' | 'Discussion' | 'Other';
  status: 'draft' | 'published';
  views: number;
  featured: boolean;
  thumbnailUrl?: string;
  duration?: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMediaRequest {
  title: string;
  description?: string;
  embedUrl: string;
  category: string;
  status?: 'draft' | 'published';
  featured?: boolean;
  thumbnailUrl?: string;
  duration?: string;
}

export interface UpdateMediaRequest extends Partial<CreateMediaRequest> {
  _id: string;
} 