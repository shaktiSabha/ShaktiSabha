"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { ImageUpload } from '@/components/ui/image-upload';
import {
  ArrowLeft,
  Save,
  Loader2,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Tag,
  FileText,
  Send,
  BarChart3,
  Calendar,
  User,
  TrendingUp
} from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  status: 'published' | 'draft';
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  tags?: string;
  metaDescription?: string;
  slug?: string;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    status: 'draft' as 'published' | 'draft',
    tags: '',
    metaDescription: '',
    slug: ''
  });

  const fetchBlog = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`);
      if (response.ok) {
        const blogData = await response.json();
        setBlog(blogData);
        setFormData({
          title: blogData.title,
          excerpt: blogData.excerpt,
          content: blogData.content,
          imageUrl: blogData.imageUrl,
          status: blogData.status,
          tags: blogData.tags || '',
          metaDescription: blogData.metaDescription || '',
          slug: blogData.slug || ''
        });
      } else {
        alert('Blog not found');
        router.push('/admin/blogs');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      alert('Failed to fetch blog');
      router.push('/admin/blogs');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string);
    }
  }, [params.id, fetchBlog]);

  const handleSubmit = async (e: React.FormEvent, publishNow = false) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = {
        ...formData,
        status: publishNow ? 'published' : formData.status
      };

      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      clearDraft();
      router.push('/admin/blogs');
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const autoSaveDraft = useCallback(async () => {
    if (!formData.title) return;

    setAutoSaving(true);
    try {
      // Save to localStorage as backup
      localStorage.setItem(`blog-edit-${params.id}`, JSON.stringify(formData));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setAutoSaving(false);
    }
  }, [formData, params.id]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!formData.title || loading) return;

    const autoSaveTimer = setTimeout(() => {
      autoSaveDraft();
    }, 30000);

    return () => clearTimeout(autoSaveTimer);
  }, [formData, loading, autoSaveDraft]);

  // Load draft from localStorage on mount
  useEffect(() => {
    if (loading || !params.id) return;

    const savedDraft = localStorage.getItem(`blog-edit-${params.id}`);
    if (savedDraft) {
      const shouldRestore = confirm('Found unsaved changes. Would you like to restore them?');
      if (shouldRestore) {
        setFormData(JSON.parse(savedDraft));
      }
    }
  }, [loading, params.id]);

  const clearDraft = () => {
    localStorage.removeItem(`blog-edit-${params.id}`);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto" />
          <p className="text-gray-400">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="text-gray-400 text-lg">Blog not found.</p>
          <Button onClick={() => router.push('/admin/blogs')}>
            Return to Blogs
          </Button>
        </div>
      </div>
    );
  }

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
                <Sparkles className="h-6 w-6 text-purple-400" />
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Edit Blog Post</h1>
              </div>
              <p className="text-gray-400 text-sm mt-1">Update and refine your content</p>
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
                    <FileText className="h-5 w-5 text-purple-400" />
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
                      className="bg-gray-700/50 border-gray-600 text-white text-lg placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
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
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
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
              {/* Blog Stats */}
              <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-blue-500/30 shadow-xl">
                <CardHeader className="border-b border-blue-500/30">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    <h2 className="text-lg font-semibold text-white">Blog Statistics</h2>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Views</span>
                    </div>
                    <span className="text-lg font-bold text-white">{blog.views || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-gray-300">Author</span>
                    </div>
                    <span className="text-sm font-medium text-white">{blog.author}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-gray-300">Created</span>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">Updated</span>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(blog.updatedAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

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
                      onChange={(e) => handleInputChange('status', e.target.value as 'published' | 'draft')}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-purple-500/30 shadow-xl">
                <CardContent className="pt-6 space-y-3">
                  <Button
                    type="button"
                    onClick={(e) => handleSubmit(e as React.FormEvent, true)}
                    disabled={saving || !formData.title || !formData.excerpt}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold shadow-lg"
                  >
                    {saving ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
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
                    disabled={saving || !formData.title || !formData.excerpt}
                    variant="outline"
                    className="w-full bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                  >
                    <div className="flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
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

              {/* Editing Tips */}
              <Card className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 backdrop-blur-sm border-indigo-500/30">
                <CardHeader className="border-b border-indigo-500/30">
                  <h3 className="text-sm font-semibold text-indigo-300">Editing Tips</h3>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="text-xs text-gray-300 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>Review your content for clarity and engagement</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>Update meta description to improve SEO</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>Use preview mode to see how readers will view it</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>Changes are auto-saved every 30 seconds</span>
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
