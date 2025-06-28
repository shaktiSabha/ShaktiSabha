export interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  status: 'published' | 'draft';
  views: number;
  createdAt: string;
  updatedAt: string;
} 