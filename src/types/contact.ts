export interface IContact {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  reply?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
} 