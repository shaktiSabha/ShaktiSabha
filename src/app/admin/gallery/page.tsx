"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Edit,
  Trash2,
  Eye,
  Search,
  Image as ImageIcon,
  Upload,
  Plus,
  Grid3x3,
  List,
  Star,
  Calendar,
  ExternalLink,
  Filter,
  RefreshCw,
  Sparkles,
  BarChart3,
  AlertCircle,
  Layers,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

interface ApiGalleryItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title' | 'featured'>('newest');

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/gallery?status=all');
      if (!response.ok) {
        throw new Error('Failed to fetch gallery items');
      }
      const data = await response.json();
      if (data.success) {
        setGalleryItems(data.data.map((item: ApiGalleryItem) => ({
          id: item._id,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          category: item.category,
          status: item.status,
          createdAt: new Date(item.createdAt).toLocaleDateString(),
          updatedAt: new Date(item.updatedAt).toLocaleDateString(),
          featured: item.featured
        })));
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      alert('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchGalleryItems();
    setTimeout(() => setRefreshing(false), 500);
  };

  const categories = ['all', ...Array.from(new Set(galleryItems.map(item => item.category)))];

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this gallery item? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/gallery/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete gallery item');
        }

        const data = await response.json();
        if (data.success) {
          setGalleryItems(galleryItems.filter(item => item.id !== id));
        }
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        alert('Failed to delete gallery item');
      }
    }
  };

  const getStatusBadge = (status: string, featured: boolean) => {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {status === 'published' ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Published
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Draft
          </span>
        )}
        {featured && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Star className="h-3 w-3 mr-1 fill-purple-400" />
            Featured
          </span>
        )}
      </div>
    );
  };

  const stats = {
    total: galleryItems.length,
    published: galleryItems.filter(item => item.status === 'published').length,
    draft: galleryItems.filter(item => item.status === 'draft').length,
    featured: galleryItems.filter(item => item.featured).length
  };

  const handleSeedGallery = async () => {
    if (confirm('This will add sample gallery items to your database. Continue?')) {
      try {
        const response = await fetch('/api/gallery/seed', {
          method: 'POST',
        });

        const data = await response.json();

        if (data.success) {
          alert(`Gallery seeded successfully! Added ${data.insertedCount} items.`);
          fetchGalleryItems();
        } else {
          alert(data.message || 'Failed to seed gallery');
        }
      } catch (error) {
        console.error('Error seeding gallery:', error);
        alert('Failed to seed gallery. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400">Loading gallery...</p>
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
              <Sparkles className="h-8 w-8 text-purple-400" />
              <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
            </div>
            <p className="text-gray-400 mt-1">Manage and organize your gallery images</p>
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
            <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
              <a href="/admin/gallery/new" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add New Image</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm border-purple-500/30 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-300">Total Images</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <ImageIcon className="h-8 w-8 text-purple-400" />
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
                  <p className="text-3xl font-bold text-white mt-2">{stats.draft}</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Edit className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 backdrop-blur-sm border-pink-500/30 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-pink-300">Featured</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.featured}</p>
                </div>
                <div className="p-3 bg-pink-500/20 rounded-lg">
                  <Star className="h-8 w-8 text-pink-400 fill-pink-400" />
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
                    placeholder="Search by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Filters and Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Category Filter */}
                <div className="flex items-center space-x-2">
                  <Layers className="h-4 w-4 text-gray-400" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
                    className="px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title' | 'featured')}
                    className="px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title (A-Z)</option>
                    <option value="featured">Featured First</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-700/50 rounded-md border border-gray-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-l-md transition-colors ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-r-md transition-colors ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || filterCategory !== 'all' || filterStatus !== 'all') && (
              <div className="mt-4 flex items-center space-x-2 text-sm flex-wrap gap-2">
                <span className="text-gray-400">Active filters:</span>
                {searchTerm && (
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-md border border-purple-500/30">
                    Search: &quot;{searchTerm}&quot;
                  </span>
                )}
                {filterCategory !== 'all' && (
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/30">
                    Category: {filterCategory}
                  </span>
                )}
                {filterStatus !== 'all' && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-md border border-green-500/30">
                    Status: {filterStatus}
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('all');
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
        {sortedItems.length > 0 && (
          <div className="text-sm text-gray-400">
            Showing {sortedItems.length} of {galleryItems.length} image{galleryItems.length !== 1 ? 's' : ''}
          </div>
        )}

        {/* Gallery Items */}
        {sortedItems.length === 0 ? (
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-4">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' ? (
                  <AlertCircle className="h-16 w-16 text-gray-500" />
                ) : (
                  <ImageIcon className="h-16 w-16 text-gray-500" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {galleryItems.length === 0 ? 'No gallery items found' : 'No images match your search'}
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                {galleryItems.length === 0
                  ? 'Get started by uploading your first image or adding sample data'
                  : 'Try adjusting your search criteria or filters'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
                  <a href="/admin/gallery/new" className="flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload Image</span>
                  </a>
                </Button>
                {galleryItems.length === 0 && (
                  <Button
                    onClick={handleSeedGallery}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sample Data
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <Card key={item.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 overflow-hidden hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300 group">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      asChild
                      size="sm"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 shadow-lg"
                    >
                      <a href={`/admin/gallery/${item.id}/edit`}>
                        <Edit className="h-3 w-3" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500/90 backdrop-blur-sm hover:bg-red-600 text-white shadow-lg"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/90 text-white backdrop-blur-sm">
                        <Star className="h-3 w-3 mr-1 fill-white" />
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-white text-sm line-clamp-1 mb-1 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2 mb-3">{item.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    {getStatusBadge(item.status, false)}
                    <span className="text-xs text-gray-500 px-2 py-1 bg-gray-700/50 rounded-md">{item.category}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.createdAt}
                    </span>
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                    >
                      <a href="/our-gallery" target="_blank">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {sortedItems.map((item) => (
              <Card key={item.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:shadow-xl hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Image */}
                    <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      {item.featured && (
                        <div className="absolute top-2 left-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/90 text-white backdrop-blur-sm">
                            <Star className="h-3 w-3 fill-white" />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white hover:text-purple-400 transition-colors">
                          {item.title}
                        </h3>
                        {getStatusBadge(item.status, false)}
                      </div>

                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center text-xs text-gray-500 space-x-4 mb-3">
                        <span className="px-2 py-1 bg-gray-700/50 rounded-md">{item.category}</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{item.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="bg-purple-600/20 border-purple-500/30 hover:bg-purple-600/30 text-purple-400"
                        >
                          <a href={`/admin/gallery/${item.id}/edit`} className="flex items-center">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600/20 border-red-500/30 hover:bg-red-600/30 text-red-400"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                        >
                          <a href="/our-gallery" target="_blank" className="flex items-center">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManagement;
