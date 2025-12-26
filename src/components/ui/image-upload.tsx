"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from './button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  label?: string;
}

export function ImageUpload({ onImageUpload, currentImage, label = "Image" }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);

  // Sync previewUrl with currentImage prop changes
  useEffect(() => {
    setPreviewUrl(currentImage || null);
  }, [currentImage]);

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

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'shakti-sabha-blogs'); // Default folder for blog images

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Upload failed:', data);
        throw new Error(data.error || data.details || 'Upload failed');
      }

      console.log('Upload successful:', data);
      onImageUpload(data.imageUrl);
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
    onImageUpload('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <ImageIcon className="h-5 w-5 text-gray-400" />
        <span className="text-sm font-medium text-gray-300">{label}</span>
      </div>

      {previewUrl ? (
        <div className="relative w-full h-48">
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
        <div className="space-y-4">
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
        </div>
      )}
    </div>
  );
} 