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
      'Podcast': 'bg-purple-600 text-purple-100',
      'Interview': 'bg-blue-600 text-blue-100',
      'Documentary': 'bg-green-600 text-green-100',
      'Workshop': 'bg-orange-600 text-orange-100',
      'Discussion': 'bg-red-600 text-red-100',
      'Other': 'bg-gray-600 text-gray-100'
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
        <h1 className="text-4xl font-bold text-center mb-12 mt-16 text-red-500">Our Podcasts & Media</h1>
              <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-white">Loading media content...</div>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-900">
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
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No media content available</h3>
          <p className="text-gray-300">Please check back later for new content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item._id} className="group">
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
                    <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-yellow-500 text-black">
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
