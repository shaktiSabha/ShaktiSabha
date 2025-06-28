"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter, Calendar, FileText, Users, Clock, Image as ImageIcon } from 'lucide-react';
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
}

const BlogsManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');


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

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
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
      ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">Published</span>
      : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">Draft</span>;
  };

  const getStats = () => {
    const total = blogs.length;
    const published = blogs.filter(blog => blog.status === 'published').length;
    const drafts = blogs.filter(blog => blog.status === 'draft').length;
    
    return { total, published, drafts };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Blog Management</h1>
          <p className="text-gray-300 mt-1">Manage your blog posts and articles</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <a href="/admin/blogs/new" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Blog Post</span>
          </a>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Total Blogs</p>
                <p className="text-2xl font-semibold text-white">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Published</p>
                <p className="text-2xl font-semibold text-white">{stats.published}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Drafts</p>
                <p className="text-2xl font-semibold text-white">{stats.drafts}</p>
              </div>
            </div>
          </CardContent>
        </Card>


      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full sm:max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <Card key={blog._id} className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
            {blog.imageUrl && (
              <div className="aspect-w-16 aspect-h-9 relative h-48">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {!blog.imageUrl && (
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
                {getStatusBadge(blog.status)}
              </div>
              
              <div className="flex items-center text-xs text-gray-400 mb-4">
                <Users className="h-4 w-4 mr-1" />
                <span className="mr-3">By {blog.author}</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-3">{new Date(blog.createdAt).toLocaleDateString()}</span>
                <Eye className="h-4 w-4 mr-1" />
                <span>{blog.views || 0} views</span>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex-1"
                >
                  <a href={`/blogs/${blog._id}`} className="flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex-1"
                >
                  <a href={`/admin/blogs/${blog._id}/edit`} className="flex items-center justify-center">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredBlogs.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No blogs found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? "No blogs match your current filters." 
                : "Get started by creating your first blog post."
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="/admin/blogs/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Blog
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogsManagement; 