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
    }, 6000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full md:w-4/5 mx-auto h-[300px] md:h-[450px] mt-0 mb-4 md:mb-8 rounded-lg shadow-md">
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div
          className="relative w-full h-full flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-full flex-shrink-0 flex items-center justify-center"
            >
              <Image
                src={image}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-contain w-full h-full"
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 100vw,
                       100vw"
                quality={90}
              />
              <div className="absolute inset-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-1 md:p-4">
        <button
          className="p-1.5 md:p-3 rounded-full bg-white/50 md:bg-white/60 text-gray-800 hover:bg-white/70 
            transition-all duration-300 md:hover:scale-105 focus:outline-none md:shadow-lg"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="p-1.5 md:p-3 rounded-full bg-white/50 md:bg-white/60 text-gray-800 hover:bg-white/70 
            transition-all duration-300 md:hover:scale-105 focus:outline-none md:shadow-lg"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${currentIndex === index ? 'bg-white w-6 shadow-md' : 'bg-white/70 hover:bg-white/90'}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
