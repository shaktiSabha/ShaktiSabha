"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const categories = ['All', 'Workshops', 'Community', 'Training', 'Events', 'Conferences', 'Other'] as const;
type Category = (typeof categories)[number];

interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  alt: string;
  views: number;
  createdAt: string;
}

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/gallery'); // Only published items by default
      if (!response.ok) {
        throw new Error('Failed to fetch gallery images');
      }
      const data = await response.json();
      if (data.success) {
        setGalleryImages(data.data);
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = galleryImages.filter(
    image => activeCategory === 'All' || image.category === activeCategory
  );

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-red-400 mb-4 hover:scale-105 transition-transform duration-300 mt-1 text-center pb-10">
            Our Gallery
          </h1>
          <p className="text-xl text-rose-100/90 max-w-3xl mx-auto mb-12">
            Capturing moments of strength, unity, and empowerment from our community
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 
                  ${activeCategory === category
                    ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid with Animation */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400"></div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-rose-200/70">No images found in this category.</p>
            <p className="text-rose-200/50 mt-2">Check back soon for new updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div 
                key={image._id}
                className="relative group overflow-hidden rounded-xl aspect-square
                  transform transition-all duration-500 hover:shadow-xl
                  hover:shadow-rose-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent 
                  via-black/50 to-black/80 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 z-10 flex items-center justify-center">
                  <div className="text-center p-4 transform translate-y-4 
                    group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-rose-200 text-sm font-medium px-4 py-1.5 
                      bg-black/50 rounded-full mb-3 inline-block">
                      {image.category}
                    </span>
                    <h3 className="text-white font-semibold mt-2">{image.title}</h3>
                    <p className="text-rose-200/80 text-sm mt-1 line-clamp-2">{image.description}</p>
                    <div className="text-rose-200/60 text-xs mt-2">
                      Views: {image.views} • {new Date(image.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Image
                  src={image.imageUrl}
                  alt={image.alt}
                  fill
                  className="object-cover transform group-hover:scale-110 
                    transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;