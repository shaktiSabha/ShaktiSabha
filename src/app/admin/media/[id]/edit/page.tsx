"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  embedUrl: string;
  category: string;
  status: 'draft' | 'published';
  featured: boolean;
  duration: string;
}

export default function EditMediaPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    embedUrl: '',
    category: 'Other',
    status: 'draft',
    featured: false,
    duration: ''
  });

  const fetchMedia = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/media/${id}`);
      if (response.ok) {
        const data = await response.json();
        const media = data.data;
        setFormData({
          title: media.title,
          description: media.description || '',
          embedUrl: media.embedUrl,
          category: media.category,
          status: media.status,
          featured: media.featured,
          duration: media.duration || ''
        });
      } else {
        alert('Media not found');
        router.push('/admin/media');
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      alert('Failed to fetch media');
      router.push('/admin/media');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (params.id) {
      fetchMedia(params.id as string);
    }
  }, [params.id, fetchMedia]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/media/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update media');
      }

      router.push('/admin/media');
    } catch (error) {
      console.error('Error updating media:', error);
      alert('Failed to update media. Please try again.');
    } finally {
      setSaving(false);
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
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => router.push('/admin/media')}
            className="bg-gray-800 hover:bg-gray-700 text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Media
          </Button>
          <h1 className="text-3xl font-bold text-white">Edit Media</h1>
        </div>

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
                  disabled={saving}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Updating...' : 'Update Media'}
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
    </div>
  );
} 