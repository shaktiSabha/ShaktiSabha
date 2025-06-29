"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Play, ExternalLink } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  embedUrl: string;
  category: string;
  status: 'draft' | 'published';
  featured: boolean;
  duration: string;
}

export default function NewMediaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    embedUrl: '',
    category: 'Other',
    status: 'draft',
    featured: false,
    duration: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create media');
      }

      router.push('/admin/media');
    } catch (error) {
      console.error('Error creating media:', error);
      alert(`Failed to create media: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-convert YouTube URLs to embed format
    if (field === 'embedUrl' && typeof value === 'string') {
      if (value.includes('youtube.com/watch?v=')) {
        const videoId = value.split('v=')[1]?.split('&')[0];
        if (videoId) {
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          setFormData(prev => ({ ...prev, embedUrl }));
          setPreviewUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
        }
      } else if (value.includes('youtube.com/embed/')) {
        const videoId = value.split('embed/')[1]?.split('?')[0];
        if (videoId) {
          setPreviewUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
        }
      }
    }
  };

  const getVideoId = (url: string) => {
    if (url.includes('embed/')) {
      return url.split('embed/')[1]?.split('?')[0];
    }
    if (url.includes('watch?v=')) {
      return url.split('v=')[1]?.split('&')[0];
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => router.push('/admin/media')}
            className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Media
          </Button>
          <h1 className="text-3xl font-bold text-white">Add New Media</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <h2 className="text-xl font-semibold text-white">Media Details</h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title *
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Enter media title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Enter media description"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      YouTube URL or Embed URL *
                    </label>
                    <Input
                      type="url"
                      value={formData.embedUrl}
                      onChange={(e) => handleInputChange('embedUrl', e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="https://www.youtube.com/watch?v=... or https://www.youtube.com/embed/..."
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Paste YouTube watch URL or embed URL. It will be automatically converted to embed format.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                        required
                      >
                        <option value="Podcast">Podcast</option>
                        <option value="Interview">Interview</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Discussion">Discussion</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Duration (optional)
                      </label>
                      <Input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="e.g., 45:30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>

                    <div className="flex items-center pt-8">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => handleInputChange('featured', e.target.checked)}
                          className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-800"
                        />
                        <span className="text-sm text-gray-300">Featured Media</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Creating...' : 'Create Media'}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => router.push('/admin/media')}
                      className="bg-gray-600 hover:bg-gray-700 text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700 sticky top-8">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Preview</h3>
              </CardHeader>
              <CardContent>
                {formData.embedUrl ? (
                  <div className="space-y-4">
                    <div className="aspect-video">
                      {previewUrl ? (
                        <div className="relative aspect-video">
                          <Image
                            src={previewUrl}
                            alt="Video thumbnail"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-12 w-12 text-white opacity-80" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                          <Play className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {formData.title && (
                      <h4 className="font-semibold text-white">{formData.title}</h4>
                    )}
                    
                    {formData.description && (
                      <p className="text-sm text-gray-400 line-clamp-3">{formData.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
                        {formData.category}
                      </span>
                      {formData.status === 'published' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
                          Published
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
                          Draft
                        </span>
                      )}
                      {formData.featured && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500 text-black">
                          Featured
                        </span>
                      )}
                    </div>

                    {getVideoId(formData.embedUrl) && (
                      <a
                        href={`https://www.youtube.com/watch?v=${getVideoId(formData.embedUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View on YouTube
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Enter a YouTube URL to see preview</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 