"use client";
import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  FileText,
  Clock,
  Image as ImageIcon,
  TrendingUp,
  BarChart3,
  Sparkles,
  Grid3x3,
  List,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  author: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
  views: number;
  tags?: string;
}

const BlogsManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views' | 'title'>('newest');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBlogs();
    setTimeout(() => setRefreshing(false), 500);
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.tags && blog.tags.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'views':
        return (b.views || 0) - (a.views || 0);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBlogs(blogs.filter(blog => blog._id !== id));
        } else {
          alert('Failed to delete blog post');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog post');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'published'
      ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">Published</span>
      : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Draft</span>;
  };

  const getStats = () => {
    const total = blogs.length;
    const published = blogs.filter(blog => blog.status === 'published').length;
    const drafts = blogs.filter(blog => blog.status === 'draft').length;
    const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);

    return { total, published, drafts, totalViews };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-400" />
              <h1 className="text-3xl font-bold text-white">Blog Management</h1>
            </div>
            <p className="text-gray-400 mt-1">Manage and organize your blog posts</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
              <a href="/admin/blogs/new" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Blog Post</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border-blue-500/30 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-300">Total Blogs</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border-green-500/30 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-300">Published</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.published}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Eye className="h-8 w-8 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-sm border-yellow-500/30 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-300">Drafts</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.drafts}</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm border-purple-500/30 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-300">Total Views</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.totalViews.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search, Filters, and View Controls */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="flex-1 w-full lg:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by title, excerpt, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Filters and Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Status Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
                    className="px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'views' | 'title')}
                    className="px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="views">Most Views</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-700/50 rounded-md border border-gray-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-l-md transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-r-md transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || filterStatus !== 'all') && (
              <div className="mt-4 flex items-center space-x-2 text-sm">
                <span className="text-gray-400">Active filters:</span>
                {searchTerm && (
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/30">
                    Search: &quot;{searchTerm}&quot;
                  </span>
                )}
                {filterStatus !== 'all' && (
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-md border border-purple-500/30">
                    Status: {filterStatus}
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                  }}
                  className="text-gray-400 hover:text-white underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        {sortedBlogs.length > 0 && (
          <div className="text-sm text-gray-400">
            Showing {sortedBlogs.length} of {blogs.length} blog{blogs.length !== 1 ? 's' : ''}
          </div>
        )}

        {/* Blog Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBlogs.map((blog) => (
              <Card key={blog._id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 overflow-hidden hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 group">
                {blog.imageUrl && blog.imageUrl.startsWith('https://') ? (
                  <div className="aspect-w-16 aspect-h-9 relative h-48 overflow-hidden">
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-500" />
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1 group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>
                    {getStatusBadge(blog.status)}
                  </div>

                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center text-xs text-gray-500 mb-4 space-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{blog.views || 0}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                    >
                      <a href={`/blogs/${blog._id}`} className="flex items-center justify-center">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 bg-blue-600/20 border-blue-500/30 hover:bg-blue-600/30 text-blue-400"
                    >
                      <a href={`/admin/blogs/${blog._id}/edit`} className="flex items-center justify-center">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-600/20 border-red-500/30 hover:bg-red-600/30 text-red-400"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedBlogs.map((blog) => (
              <Card key={blog._id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:shadow-xl hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Image */}
                    {blog.imageUrl && blog.imageUrl.startsWith('https://') ? (
                      <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={blog.imageUrl}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full sm:w-48 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="h-8 w-8 text-gray-500" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">
                          {blog.title}
                        </h3>
                        {getStatusBadge(blog.status)}
                      </div>

                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center text-xs text-gray-500 space-x-4 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          <span>{blog.views || 0} views</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Updated {new Date(blog.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                        >
                          <a href={`/blogs/${blog._id}`} className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="bg-blue-600/20 border-blue-500/30 hover:bg-blue-600/30 text-blue-400"
                        >
                          <a href={`/admin/blogs/${blog._id}/edit`} className="flex items-center">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(blog._id)}
                          className="bg-red-600/20 border-red-500/30 hover:bg-red-600/30 text-red-400"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedBlogs.length === 0 && (
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-4">
                {searchTerm || filterStatus !== 'all' ? (
                  <AlertCircle className="h-16 w-16 text-gray-500" />
                ) : (
                  <FileText className="h-16 w-16 text-gray-500" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm || filterStatus !== 'all' ? 'No blogs found' : 'No blogs yet'}
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                {searchTerm || filterStatus !== 'all'
                  ? 'No blogs match your current filters. Try adjusting your search or filters.'
                  : 'Get started by creating your first blog post and share your thoughts with the world.'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                  <a href="/admin/blogs/new" className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Create Your First Blog</span>
                  </a>
                </Button>
              )}
              {(searchTerm || filterStatus !== 'all') && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                  }}
                  variant="outline"
                  className="bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlogsManagement;
