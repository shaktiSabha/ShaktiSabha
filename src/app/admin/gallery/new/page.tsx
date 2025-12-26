"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const categories = ['Workshops', 'Community', 'Training', 'Events', 'Conferences', 'Other'];

interface FormData {
  title: string;
  description: string;
  category: string;
  alt: string;
  status: 'draft' | 'published';
  featured: boolean;
  imageUrl: string;
  imagePublicId: string;
}

const NewGalleryPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'Workshops',
    alt: '',
    status: 'draft',
    featured: false,
    imageUrl: '',
    imagePublicId: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, GIF, etc.)');
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);

    try {
      console.log('Starting upload:', file.name, file.size, file.type);

      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('folder', 'shakti-sabha-gallery');

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Upload failed:', data);
        throw new Error(data.error || data.details || 'Upload failed');
      }

      console.log('Upload successful:', data);

      setFormData(prev => ({
        ...prev,
        imageUrl: data.imageUrl,
        imagePublicId: data.publicId
      }));

      alert('Image uploaded successfully!');
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message || 'Please check console for details'}`);
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    setFormData(prev => ({
      ...prev,
      imageUrl: '',
      imagePublicId: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.imageUrl || !formData.alt) {
      alert('Please fill in all required fields and upload an image.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create gallery item');
      }

      const result = await response.json();

      if (result.success) {
        alert('Gallery item created successfully!');
        router.push('/admin/gallery');
      } else {
        throw new Error(result.error || 'Failed to create gallery item');
      }
    } catch (error) {
      console.error('Error creating gallery item:', error);
      alert('Failed to create gallery item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Gallery Item</h1>
          <p className="text-gray-300">Upload and manage your gallery images</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 space-y-6">
        {/* Image Upload */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Gallery Image *</span>
          </div>

          {previewUrl ? (
            <div className="relative w-full h-64">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-700">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="image-upload" className="cursor-pointer w-full">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploading}
                    className="w-full"
                    asChild
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                    </div>
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                PNG, JPG, GIF up to 10MB • Uploads to Cloudinary
              </p>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title *
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Enter gallery item title"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="alt" className="block text-sm font-medium text-gray-300 mb-1">
            Alt Text (for accessibility) *
          </label>
          <Input
            type="text"
            id="alt"
            name="alt"
            value={formData.alt}
            onChange={handleInputChange}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Describe what's in the image"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description *
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Enter detailed description of the gallery item"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-300">
              Featured Item
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !formData.imageUrl}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Creating...' : 'Create Gallery Item'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewGalleryPage; 