"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const Carousel: React.FC = () => {
  const images = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
    '/banner4.jpg',
    '/banner5.jpg',
    '/banner6.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full aspect-[16/9] mb-10">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="relative w-full h-full flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-full flex-shrink-0"
            >
              <Image
                src={image}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 100vw,
                       100vw"
                quality={90}
              />
              {/* Optional: Add gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 
            transition-all duration-300 hover:scale-110 focus:outline-none 
            focus:ring-2 focus:ring-white/50"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 
            transition-all duration-300 hover:scale-110 focus:outline-none 
            focus:ring-2 focus:ring-white/50"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 
              ${currentIndex === index ? 'bg-white w-4' : 'bg-white/50'}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
