"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { ImageUpload } from '@/components/ui/image-upload';
import {
  ArrowLeft,
  Save,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Tag,
  FileText,
  Send
} from 'lucide-react';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    status: 'draft',
    tags: '',
    metaDescription: '',
    slug: ''
  });

  const handleSubmit = async (e: React.FormEvent, publishNow = false) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        status: publishNow ? 'published' : formData.status
      };

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }

      clearDraft();
      router.push('/admin/blogs');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, formData.slug]);

  const autoSaveDraft = useCallback(async () => {
    if (!formData.title) return;

    setAutoSaving(true);
    try {
      // Save to localStorage as backup
      localStorage.setItem('blog-draft', JSON.stringify(formData));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setAutoSaving(false);
    }
  }, [formData]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!formData.title) return;

    const autoSaveTimer = setTimeout(() => {
      autoSaveDraft();
    }, 30000);

    return () => clearTimeout(autoSaveTimer);
  }, [formData, autoSaveDraft]);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('blog-draft');
    if (savedDraft) {
      const shouldRestore = confirm('Found a saved draft. Would you like to restore it?');
      if (shouldRestore) {
        setFormData(JSON.parse(savedDraft));
      }
    }
  }, []);

  const clearDraft = () => {
    localStorage.removeItem('blog-draft');
  };

  const getCharacterCount = (text: string, max: number) => {
    const count = text.length;
    const remaining = max - count;
    const percentage = (count / max) * 100;
    return { count, remaining, percentage, isOverLimit: count > max };
  };

  const titleCount = getCharacterCount(formData.title, 100);
  const excerptCount = getCharacterCount(formData.excerpt, 200);
  const metaCount = getCharacterCount(formData.metaDescription, 160);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center space-x-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-blue-400" />
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Create New Blog Post</h1>
              </div>
              <p className="text-gray-400 text-sm mt-1">Share your thoughts with the world</p>
            </div>
          </div>

          {/* Auto-save indicator */}
          <div className="flex items-center space-x-2 text-sm">
            {autoSaving ? (
              <div className="flex items-center space-x-2 text-yellow-400">
                <Clock className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </div>
            ) : lastSaved ? (
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              </div>
            ) : null}
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl">
                <CardHeader className="border-b border-gray-700">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <h2 className="text-lg font-semibold text-white">Basic Information</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                        Title *
                      </label>
                      <span className={`text-xs ${titleCount.isOverLimit ? 'text-red-400' : 'text-gray-500'}`}>
                        {titleCount.count}/100
                      </span>
                    </div>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter an engaging title for your blog post..."
                      className="bg-gray-700/50 border-gray-600 text-white text-lg placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {titleCount.isOverLimit && (
                      <p className="text-xs text-red-400 mt-1 flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Title is too long. Keep it under 100 characters.</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="slug" className="block text-sm font-medium text-gray-300">
                        URL Slug
                      </label>
                      <span className="text-xs text-gray-500">Auto-generated</span>
                    </div>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="url-friendly-slug"
                      className="bg-gray-700/50 border-gray-600 text-white font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Preview: /blogs/{formData.slug || 'your-blog-post'}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300">
                        Excerpt *
                      </label>
                      <span className={`text-xs ${excerptCount.isOverLimit ? 'text-red-400' : 'text-gray-500'}`}>
                        {excerptCount.count}/200
                      </span>
                    </div>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      placeholder="Write a compelling summary that will appear in blog listings..."
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                    {excerptCount.isOverLimit && (
                      <p className="text-xs text-red-400 mt-1 flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Excerpt is too long. Keep it under 200 characters.</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <label htmlFor="tags" className="block text-sm font-medium text-gray-300">
                        Tags
                      </label>
                    </div>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      placeholder="yoga, meditation, wellness (comma-separated)"
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate tags with commas to help readers find your content
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl">
                <CardHeader className="border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Content</h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>{showPreview ? 'Edit' : 'Preview'}</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {showPreview ? (
                    <div className="prose prose-invert max-w-none p-6 bg-gray-900/50 rounded-lg min-h-[400px]">
                      <h1>{formData.title || 'Untitled Post'}</h1>
                      <p className="text-gray-400 italic">{formData.excerpt}</p>
                      <div dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content yet...</p>' }} />
                    </div>
                  ) : (
                    <RichTextEditor
                      content={formData.content}
                      onChange={(content) => handleInputChange('content', content)}
                    />
                  )}
                </CardContent>
              </Card>

              {/* SEO Settings */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl">
                <CardHeader className="border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">SEO & Metadata</h2>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-300">
                        Meta Description
                      </label>
                      <span className={`text-xs ${metaCount.isOverLimit ? 'text-red-400' : 'text-gray-500'}`}>
                        {metaCount.count}/160
                      </span>
                    </div>
                    <Textarea
                      id="metaDescription"
                      value={formData.metaDescription}
                      onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                      placeholder="A brief description for search engines (recommended 150-160 characters)"
                      className="bg-gray-700/50 border-gray-600 text-white"
                      rows={3}
                    />
                    {metaCount.isOverLimit && (
                      <p className="text-xs text-red-400 mt-1">
                        Meta description is too long. Keep it under 160 characters for best SEO.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Image Upload */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl">
                <CardHeader className="border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">Featured Image</h2>
                </CardHeader>
                <CardContent className="pt-6">
                  <ImageUpload
                    onImageUpload={(imageUrl) => handleInputChange('imageUrl', imageUrl)}
                    currentImage={formData.imageUrl}
                  />
                </CardContent>
              </Card>

              {/* Publish Settings */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl">
                <CardHeader className="border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">Publish Settings</h2>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30 shadow-xl">
                <CardContent className="pt-6 space-y-3">
                  <Button
                    type="button"
                    onClick={(e) => handleSubmit(e as React.FormEvent, true)}
                    disabled={loading || !formData.title || !formData.excerpt}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Publishing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Publish Now</span>
                      </div>
                    )}
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading || !formData.title || !formData.excerpt}
                    variant="outline"
                    className="w-full bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                  >
                    <div className="flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Save as Draft</span>
                    </div>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/admin/blogs')}
                    className="w-full border-gray-600 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>

              {/* Tips Card */}
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border-purple-500/30">
                <CardHeader className="border-b border-purple-500/30">
                  <h3 className="text-sm font-semibold text-purple-300">Writing Tips</h3>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="text-xs text-gray-300 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>Use clear, engaging titles under 100 characters</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>Add relevant tags to improve discoverability</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>Include a featured image for better engagement</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>Write compelling meta descriptions for SEO</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
