"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, Calendar } from 'lucide-react';

const categories = ['All', 'Workshops', 'Community', 'Training', 'Events', 'Conferences', 'Other'] as const;
type Category = (typeof categories)[number];

interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  alt: string;
  createdAt: string;
}

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchGalleryImages = useCallback(async (category: Category = activeCategory) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build API URL with category filter
      const url = new URL('/api/gallery', window.location.origin);
      if (category !== 'All') {
        url.searchParams.set('category', category);
      }
      url.searchParams.set('status', 'published');
      
      console.log('Fetching gallery with URL:', url.toString());
      console.log('Category:', category);
      
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error('Failed to fetch gallery images');
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.success) {
        setGalleryImages(data.data || []);
        console.log('Set images:', data.data?.length || 0);
      } else {
        throw new Error(data.error || 'Failed to fetch gallery data');
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      setError(error instanceof Error ? error.message : 'Failed to load gallery');
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchGalleryImages();
  }, [fetchGalleryImages]);

  const handleCategoryChange = (category: Category) => {
    console.log('Category button clicked:', category);
    console.log('Current activeCategory:', activeCategory);
    setActiveCategory(category);
    fetchGalleryImages(category);
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto'; // Restore scroll
  };

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const goToPreviousImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowRight':
          goToNextImage();
          break;
        case 'ArrowLeft':
          goToPreviousImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, goToNextImage, goToPreviousImage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-red-400 mb-4 hover:scale-105 transition-transform duration-300 mt-1 text-center pb-10">
            Our Gallery
          </h1>
          <p className="text-xl text-rose-100/90 max-w-3xl mx-auto mb-4">
            Capturing moments of strength, unity, and empowerment from our community
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                disabled={loading}
                className={`px-6 py-2 rounded-full transition-all duration-300 disabled:opacity-50
                  ${activeCategory === category
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-lg'
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
            <p className="ml-4 text-rose-200">Loading gallery...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 max-w-2xl mx-auto">
              <p className="text-red-400 text-lg font-medium mb-2">⚠️ Error Loading Gallery</p>
              <p className="text-red-200/80">{error}</p>
              <button 
                onClick={() => fetchGalleryImages()}
                className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-8 max-w-2xl mx-auto">
              <p className="text-blue-400 text-xl font-medium mb-2">📸 No Images Found</p>
              <p className="text-blue-200/80 mb-4">
                {activeCategory === 'All' 
                  ? 'No gallery images have been added yet.' 
                  : `No images found in the "${activeCategory}" category.`
                }
              </p>
              <p className="text-blue-200/60 text-sm">
                Gallery images can be added through the admin panel.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={image._id}
                onClick={() => openModal(index)}
                className="relative group overflow-hidden rounded-xl aspect-square
                  transform transition-all duration-500 hover:shadow-xl
                  hover:shadow-rose-500/20 cursor-pointer"
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
                    <h3 className="text-white font-semibold mt-2 mb-2">{image.title}</h3>
                    <p className="text-rose-200/80 text-sm mt-1 line-clamp-2 mb-2">{image.description}</p>
                    <div className="text-rose-200/60 text-xs mt-2 flex items-center justify-center">
                      <span>📅 {new Date(image.createdAt).toLocaleDateString()}</span>
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

        {/* Call to Action */}
        {galleryImages.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-red-400 mb-4">
                Join Our Empowerment Journey
              </h3>
              <p className="text-white/80 mb-6">
                Be part of our community and attend our workshops, training sessions, and events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/join-us" 
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium"
                >
                  Join Our Community
                </a>
                <a 
                  href="/contact" 
                  className="bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium border border-white/20"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal/Lightbox */}
        {modalOpen && galleryImages.length > 0 && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous button */}
            {galleryImages.length > 1 && (
              <button
                onClick={goToPreviousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
            )}

            {/* Next button */}
            {galleryImages.length > 1 && (
              <button
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            )}

            {/* Main image container */}
            <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
              <div className="relative max-w-full max-h-full">
                <Image
                  src={galleryImages[currentImageIndex]?.imageUrl || ''}
                  alt={galleryImages[currentImageIndex]?.alt || ''}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  priority
                />
                
                {/* Image info overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-3 py-1.5 bg-red-500/80 text-white text-sm font-medium rounded-full">
                      {galleryImages[currentImageIndex]?.category}
                    </span>
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(galleryImages[currentImageIndex]?.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-white text-xl font-bold mb-2">
                    {galleryImages[currentImageIndex]?.title}
                  </h2>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {galleryImages[currentImageIndex]?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Image counter */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm font-medium">
                  {currentImageIndex + 1} / {galleryImages.length}
                </span>
              </div>
            )}

            {/* Zoom hint */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
              <ZoomIn className="w-4 h-4 text-white" />
              <span className="text-white text-xs">Click image to zoom</span>
            </div>

            {/* Navigation hint */}
            {galleryImages.length > 1 && (
              <div className="absolute top-16 left-4 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                <span className="text-white text-xs">Use ← → keys or click arrows</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;