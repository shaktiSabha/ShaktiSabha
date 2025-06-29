"use client";
import { useState, useEffect } from 'react';
import { Play, Clock, Eye, Star } from 'lucide-react';

interface MediaItem {
  _id: string;
  title: string;
  description?: string;
  embedUrl: string;
  category: string;
  views: number;
  featured: boolean;
  duration?: string;
  createdAt: string;
}

export default function PodcastsMedia() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMediaItems(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(mediaItems.map(item => item.category)))];
  
  const filteredItems = selectedCategory === 'All' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  const getCategoryBadge = (category: string) => {
    const colors = {
      'Podcast': 'bg-purple-600/80 backdrop-blur-sm border border-purple-400/50 text-purple-100',
      'Interview': 'bg-blue-600/80 backdrop-blur-sm border border-blue-400/50 text-blue-100',
      'Documentary': 'bg-green-600/80 backdrop-blur-sm border border-green-400/50 text-green-100',
      'Workshop': 'bg-orange-600/80 backdrop-blur-sm border border-orange-400/50 text-orange-100',
      'Discussion': 'bg-red-600/80 backdrop-blur-sm border border-red-400/50 text-red-100',
      'Other': 'bg-gray-600/80 backdrop-blur-sm border border-gray-400/50 text-gray-100'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[category as keyof typeof colors] || colors.Other}`}>
        {category}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center mb-8 mt-16 text-red-500">Our Podcasts & Media</h1>
        
        {/* Skeleton Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 animate-pulse">
              {/* Video Skeleton */}
              <div className="aspect-video mb-4 bg-gray-600 rounded-lg"></div>
              
              {/* Content Skeleton */}
              <div className="space-y-3">
                {/* Category Badge Skeleton */}
                <div className="w-20 h-6 bg-gray-600 rounded-full"></div>
                
                {/* Title Skeleton */}
                <div className="space-y-2">
                  <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-600 rounded w-1/2"></div>
                </div>
                
                {/* Description Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
                
                {/* Footer Info Skeleton */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <div className="h-4 bg-gray-700 rounded w-16"></div>
                    <div className="h-4 bg-gray-700 rounded w-12"></div>
                  </div>
                  <div className="h-4 bg-gray-700 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 ">
      <h1 className="text-4xl font-bold text-center mb-8 mt-16 text-red-500">Our Podcasts & Media</h1>
      
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-red-500/90 backdrop-blur-md text-white border border-red-400/50'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 max-w-md mx-auto">
            <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No media content available</h3>
            <p className="text-gray-300">Please check back later for new content.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item._id} className="group bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 hover:bg-white/15 transition-all duration-300">
              <div className="aspect-video mb-4 relative overflow-hidden rounded-lg shadow-lg">
                <iframe
                  className="w-full h-full"
                  src={item.embedUrl}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-yellow-500/90 backdrop-blur-sm text-black">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {getCategoryBadge(item.category)}
                </div>
                
                <h3 className="font-semibold text-lg text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                
                {item.description && (
                  <p className="text-gray-300 text-sm line-clamp-2">{item.description}</p>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {item.views.toLocaleString()} views
                    </span>
                    {item.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.duration}
                      </span>
                    )}
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
  );
}
