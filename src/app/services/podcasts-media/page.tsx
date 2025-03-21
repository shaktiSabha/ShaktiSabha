"use client"

import React, { useState } from 'react';
import Image from 'next/image';

interface MediaContent {
  id: string;
  speaker: string;
  title: string;
  description: string;
  type: 'podcast' | 'video';
  duration: string;
  thumbnail: string;
  link: string;
  tags: string[];
}

const mediaContent: MediaContent[] = [
  {
    id: 'ac-001',
    speaker: 'आचार्य सुकामा जी',
    title: 'नारी शक्ति का वैदिक स्वरूप',
    description: 'Discover the Vedic perspective on feminine power and its relevance in modern times',
    type: 'video',
    duration: '45:20',
    thumbnail: '/media/acharya-sukama.jpg',
    link: 'https://youtube.com/watch?v=your-video-id',
    tags: ['वैदिक ज्ञान', 'नारी शक्ति', 'आध्यात्मिक']
  },
  {
    id: 'tt-001',
    speaker: 'तितिक्षा',
    title: 'आत्मरक्षा और आत्मविश्वास',
    description: 'Learn about self-defense techniques and building inner confidence',
    type: 'podcast',
    duration: '32:15',
    thumbnail: '/media/titiksha.jpg',
    link: 'https://spotify.com/episode/your-episode-id',
    tags: ['self-defense', 'confidence', 'empowerment']
  },
  {
    id: 'vd-001',
    speaker: 'डॉ. वंदना जी',
    title: 'मानसिक स्वास्थ्य और सशक्तिकरण',
    description: 'Understanding mental health and its role in women empowerment',
    type: 'video',
    duration: '52:40',
    thumbnail: '/media/dr-vandana.jpg',
    link: 'https://youtube.com/watch?v=your-video-id',
    tags: ['mental health', 'psychology', 'wellness']
  },
  {
    id: 'em-001',
    speaker: 'Shakti Sabha Team',
    title: 'Rise & Conquer: Women Warriors Series',
    description: 'Inspiring stories of women who overcame challenges and achieved success',
    type: 'podcast',
    duration: '28:45',
    thumbnail: '/media/warriors-series.jpg',
    link: 'https://spotify.com/episode/your-episode-id',
    tags: ['inspiration', 'success stories', 'motivation']
  }
];

const PodcastsAndMediaPage = () => {
  const [filter, setFilter] = useState<'all' | 'podcast' | 'video'>('all');

  const filteredContent = mediaContent.filter(content => 
    filter === 'all' ? true : content.type === filter
  );

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-rose-400 to-purple-600 mb-6">
            Podcasts & Media
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enlightening conversations and empowering content from inspiring speakers
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          {['all', 'podcast', 'video'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as typeof filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${filter === type 
                  ? 'bg-rose-500/20 text-rose-300' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContent.map((content) => (
            <article 
              key={content.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden 
                border border-rose-500/20 hover:border-rose-500/40 
                transition-all duration-300 group"
            >
              <div className="relative h-48">
                <Image
                  src={content.thumbnail}
                  alt={content.title}
                  fill
                  className="object-cover transform group-hover:scale-105 
                    transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${content.type === 'podcast' 
                      ? 'bg-purple-500/70 text-purple-100' 
                      : 'bg-rose-500/70 text-rose-100'}`}>
                    {content.type.toUpperCase()}
                  </span>
                  <span className="text-white text-sm">{content.duration}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {content.speaker}
                  </h3>
                  <h4 className="text-xl font-medium text-rose-300 mb-2">
                    {content.title}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {content.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {content.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-white/5 rounded-full 
                      text-xs text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 px-4 bg-gradient-to-r from-rose-500/50 
                    to-purple-600/50 text-white rounded-lg text-center
                    hover:from-rose-500/70 hover:to-purple-600/70 
                    transition-all duration-300"
                >
                  {content.type === 'podcast' ? 'Listen Now' : 'Watch Now'}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastsAndMediaPage;