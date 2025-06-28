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
  Grid,
  List,
  Star,
  Calendar,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
  views: number;
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
  views: number;
  featured: boolean;
}

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');


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
          views: item.views,
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

  const categories = ['all', ...Array.from(new Set(galleryItems.map(item => item.category)))];

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
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
          alert('Gallery item deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        alert('Failed to delete gallery item');
      }
    }
  };



  const getStatusBadge = (status: string, featured: boolean) => {
    return (
      <div className="flex items-center gap-2">
        {status === 'published' ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-700/50">
            Published
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/50 text-yellow-300 border border-yellow-700/50">
            Draft
          </span>
        )}
        {featured && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-700/50">
            <Star className="h-3 w-3 mr-1" />
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
    featured: galleryItems.filter(item => item.featured).length,
    totalViews: galleryItems.reduce((sum, item) => sum + item.views, 0)
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
          fetchGalleryItems(); // Refresh the list
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-400">Loading gallery items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <ImageIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
                <p className="text-gray-300 mt-1">Manage your gallery images and media content</p>
              </div>
            </div>
            <a
              href="/admin/gallery/new"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Image
            </a>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
            <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 p-4 rounded-xl border border-blue-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Total Images</p>
                  <p className="text-2xl font-bold text-blue-100">{stats.total}</p>
                </div>
                <ImageIcon className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 p-4 rounded-xl border border-green-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Published</p>
                  <p className="text-2xl font-bold text-green-100">{stats.published}</p>
                </div>
                <Eye className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 p-4 rounded-xl border border-yellow-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Drafts</p>
                  <p className="text-2xl font-bold text-yellow-100">{stats.draft}</p>
                </div>
                <Edit className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 p-4 rounded-xl border border-purple-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Featured</p>
                  <p className="text-2xl font-bold text-purple-100">{stats.featured}</p>
                </div>
                <Star className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-900/50 to-indigo-800/50 p-4 rounded-xl border border-indigo-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-300 text-sm font-medium">Total Views</p>
                  <p className="text-2xl font-bold text-indigo-100">{stats.totalViews.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-indigo-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search images..."
                  className="pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 w-full sm:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-700 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gray-600 text-blue-400 shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Grid className="h-4 w-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-gray-600 text-blue-400 shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Items */}
        <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="mx-auto h-16 w-16 text-gray-500 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                {galleryItems.length === 0 ? "No gallery items found" : "No images match your search"}
              </h3>
              <p className="text-gray-400 mb-6">
                {galleryItems.length === 0 
                  ? "Get started by uploading your first image or adding sample data" 
                  : "Try adjusting your search criteria or filters"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/admin/gallery/new"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Image
                </a>
                {galleryItems.length === 0 && (
                  <button
                    onClick={handleSeedGallery}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Sample Data
                  </button>
                )}
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative bg-gray-900 rounded-xl overflow-hidden border border-gray-600 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <a
                        href={`/admin/gallery/${item.id}/edit`}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                      >
                        <Edit className="h-4 w-4 text-gray-700" />
                      </a>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>

                    {/* Views Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                        <Eye className="h-3 w-3 mr-1" />
                        {item.views}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white text-sm line-clamp-1">{item.title}</h3>
                    </div>
                    <p className="text-gray-300 text-xs line-clamp-2 mb-3">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      {getStatusBadge(item.status, item.featured)}
                      <span className="text-xs text-gray-400">{item.category}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-600">
                      <span className="text-xs text-gray-400">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {item.createdAt}
                      </span>
                      <a
                        href={`/our-gallery`}
                        target="_blank"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl border border-gray-600 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-200">
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{item.title}</h3>
                        <p className="text-gray-300 text-sm line-clamp-2 mt-1">{item.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-400">{item.category}</span>
                          <span className="text-sm text-gray-400">
                            <Eye className="h-4 w-4 inline mr-1" />
                            {item.views} views
                          </span>
                          <span className="text-sm text-gray-400">
                            <Calendar className="h-4 w-4 inline mr-1" />
                            {item.createdAt}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 ml-4">
                        {getStatusBadge(item.status, item.featured)}
                        <div className="flex items-center gap-2">
                          <a
                            href={`/admin/gallery/${item.id}/edit`}
                            className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryManagement; 