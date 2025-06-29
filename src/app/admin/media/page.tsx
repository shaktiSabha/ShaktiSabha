"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Play, 
  Plus,
  Video,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MediaItem {
  _id: string;
  title: string;
  description?: string;
  embedUrl: string;
  category: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  views: number;
  duration?: string;
}

const MediaManagement = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/media?status=all');
      if (!response.ok) {
        throw new Error('Failed to fetch media items');
      }
      const data = await response.json();
      if (data.success) {
        setMediaItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching media items:', error);
      alert('Failed to load media items');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncYouTube = async () => {
    if (confirm('This will sync view counts and other data from YouTube. Continue?')) {
      try {
        const response = await fetch('/api/media/sync-youtube', {
          method: 'POST',
        });
        const data = await response.json();
        
        if (data.success) {
          alert(`Successfully synced ${data.updated} media items with YouTube!\n\nUpdated videos:\n${data.details?.map((d: { videoId: string; views: string; duration: string }) => `• ${d.videoId}: ${d.views} views`).join('\n') || ''}`);
          fetchMediaItems();
        } else {
          alert(data.message || 'Failed to sync YouTube data');
        }
      } catch (error) {
        console.error('Error syncing YouTube data:', error);
        alert('Failed to sync YouTube data');
      }
    }
  };



  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this media item?')) {
      try {
        const response = await fetch(`/api/media/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setMediaItems(mediaItems.filter(item => item._id !== id));
          alert('Media item deleted successfully');
        } else {
          alert('Failed to delete media item');
        }
      } catch (error) {
        console.error('Error deleting media item:', error);
        alert('Failed to delete media item');
      }
    }
  };

  const categories = ['all', ...Array.from(new Set(mediaItems.map(item => item.category)))];

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    return status === 'published' 
      ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">Published</span>
      : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">Draft</span>;
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      'Podcast': 'bg-purple-900 text-purple-300',
      'Interview': 'bg-blue-900 text-blue-300',
      'Documentary': 'bg-green-900 text-green-300',
      'Workshop': 'bg-orange-900 text-orange-300',
      'Discussion': 'bg-red-900 text-red-300',
      'Other': 'bg-gray-900 text-gray-300'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[category as keyof typeof colors] || colors.Other}`}>
        {category}
      </span>
    );
  };

  const getThumbnailUrl = (embedUrl: string) => {
    const videoId = embedUrl.split('embed/')[1]?.split('?')[0];
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Media Management</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span>{mediaItems.length} Total</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{mediaItems.reduce((acc, item) => acc + item.views, 0)} Views</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleSyncYouTube}
              variant="outline"
              className="bg-blue-800 border-blue-600 text-white hover:bg-blue-700"
            >
              Sync YouTube Views
            </Button>
            <a
              href="/admin/media/new"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Media
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredItems.length} of {mediaItems.length} media items
          </p>
        </div>

        {/* Media Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No media items found</h3>
            <p className="text-gray-400 mb-6">Create your first media item to get started.</p>
            <a
              href="/admin/media/new"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Media
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item._id} className="group relative bg-gray-900 rounded-xl overflow-hidden border border-gray-600 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={getThumbnailUrl(item.embedUrl)}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/480x360/1f2937/9ca3af?text=Video+Thumbnail';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <a
                      href={`/admin/media/${item._id}/edit`}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                    >
                      <Edit className="h-4 w-4 text-gray-700" />
                    </a>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-yellow-500 text-black">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryBadge(item.category)}
                    {getStatusBadge(item.status)}
                  </div>
                  
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">{item.title}</h3>
                  
                  {item.description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {item.views}
                      </span>
                    </div>
                    <span>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaManagement; 