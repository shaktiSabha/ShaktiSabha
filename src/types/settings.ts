export interface Settings {
  _id?: string;
  websiteName: string;
  logoUrl: string;
  logoPublicId: string;
  favicon: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  createdAt?: string;
  updatedAt?: string;
} 