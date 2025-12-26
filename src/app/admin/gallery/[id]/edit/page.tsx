"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Upload,
  X,
  Image as ImageIcon,
  ArrowLeft,
  Save,
  Eye,
  Star,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  FileText,
  Tag,
  AlertCircle
} from 'lucide-react';
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

const EditGalleryPage = () => {
  const router = useRouter();
  const params = useParams();
  const galleryId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
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

  const fetchGalleryItem = useCallback(async () => {
    try {
      setInitialLoading(true);
      const response = await fetch(`/api/gallery/${galleryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch gallery item');
      }
      const data = await response.json();
      if (data.success) {
        const item = data.data;
        setFormData({
          title: item.title,
          description: item.description,
          category: item.category,
          alt: item.alt,
          status: item.status,
          featured: item.featured,
          imageUrl: item.imageUrl,
          imagePublicId: item.imagePublicId
        });
        setPreviewUrl(item.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching gallery item:', error);
      alert('Failed to load gallery item');
      router.push('/admin/gallery');
    } finally {
      setInitialLoading(false);
    }
  }, [galleryId, router]);

  useEffect(() => {
    if (galleryId) {
      fetchGalleryItem();
    }
  }, [galleryId, fetchGalleryItem]);

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
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Please check console for details';
      alert(`Upload failed: ${errorMessage}`);
      setPreviewUrl(formData.imageUrl); // Revert to original image
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
      alert('Please fill in all required fields and ensure an image is uploaded.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/gallery/${galleryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update gallery item');
      }

      const result = await response.json();

      if (result.success) {
        alert('Gallery item updated successfully!');
        router.push('/admin/gallery');
      } else {
        throw new Error(result.error || 'Failed to update gallery item');
      }
    } catch (error) {
      console.error('Error updating gallery item:', error);
      alert('Failed to update gallery item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400">Loading gallery item...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-7 w-7 text-purple-400" />
                <h1 className="text-3xl font-bold text-white">Edit Gallery Item</h1>
              </div>
              <p className="text-gray-400 mt-1">Update your gallery image and details</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
            >
              <a href="/our-gallery" target="_blank">
                <Eye className="h-4 w-4 mr-2" />
                Preview Gallery
              </a>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image Upload */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Upload Card */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <ImageIcon className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Gallery Image</h2>
                    <p className="text-sm text-gray-400">Upload or replace your image</p>
                  </div>
                </div>

                {previewUrl ? (
                  <div className="space-y-4">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-gray-700 group">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-3 right-3 p-2 bg-red-500/90 backdrop-blur-sm text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg z-10"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {uploading && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                            <p className="text-white text-sm">Uploading...</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <label htmlFor="image-replace" className="cursor-pointer block">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={uploading}
                        className="w-full bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-white"
                        asChild
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Upload className="h-4 w-4" />
                          <span>{uploading ? 'Uploading...' : 'Replace Image'}</span>
                        </div>
                      </Button>
                      <input
                        id="image-replace"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 bg-purple-500/20 rounded-full">
                        <Upload className="h-10 w-10 text-purple-400" />
                      </div>
                      <div>
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Button
                            type="button"
                            disabled={uploading}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            asChild
                          >
                            <div className="flex items-center space-x-2">
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
                      <p className="text-sm text-gray-400">
                        PNG, JPG, GIF up to 10MB • Uploads to Cloudinary
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Basic Information Card */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Basic Information</h2>
                    <p className="text-sm text-gray-400">Essential details about your image</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                      <Tag className="h-4 w-4 mr-2 text-gray-400" />
                      Title <span className="text-red-400 ml-1">*</span>
                    </label>
                    <Input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter a descriptive title"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      Description <span className="text-red-400 ml-1">*</span>
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="bg-gray-700/50 border-gray-600 text-white focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="Provide a detailed description of the image"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.description.length} characters
                    </p>
                  </div>

                  <div>
                    <label htmlFor="alt" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                      <Eye className="h-4 w-4 mr-2 text-gray-400" />
                      Alt Text (Accessibility) <span className="text-red-400 ml-1">*</span>
                    </label>
                    <Input
                      type="text"
                      id="alt"
                      name="alt"
                      value={formData.alt}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white focus:ring-2 focus:ring-purple-500"
                      placeholder="Describe what's in the image for screen readers"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Help visually impaired users understand your image
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-6">
            {/* Publishing Options Card */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Layers className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Settings</h2>
                    <p className="text-sm text-gray-400">Configure visibility</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="category" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                      <Layers className="h-4 w-4 mr-2 text-gray-400" />
                      Category <span className="text-red-400 ml-1">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                      {formData.status === 'published' ? (
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-400" />
                      ) : (
                        <Clock className="h-4 w-4 mr-2 text-yellow-400" />
                      )}
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.status === 'published'
                        ? 'Visible to all visitors'
                        : 'Only visible to admins'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="featured"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600 transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Star className={`h-4 w-4 ${formData.featured ? 'text-purple-400 fill-purple-400' : 'text-gray-400'}`} />
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            Featured Item
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Highlight this image in the gallery
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Validation Alert */}
            {(!formData.title || !formData.description || !formData.imageUrl || !formData.alt) && (
              <Card className="bg-yellow-500/10 backdrop-blur-sm border-yellow-500/30 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-yellow-400 mb-1">Required Fields</h3>
                      <p className="text-xs text-yellow-300/80">
                        Please fill in all required fields before saving
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl">
              <CardContent className="p-6 space-y-3">
                <Button
                  type="submit"
                  disabled={loading || !formData.imageUrl || !formData.title || !formData.description || !formData.alt}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Gallery Item
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                  className="w-full bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-white"
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGalleryPage; 