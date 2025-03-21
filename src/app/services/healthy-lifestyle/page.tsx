"use client"

import React from 'react';
import Image from 'next/image';

interface HealthArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  content: string[];
}

const healthArticles: HealthArticle[] = [
  {
    id: 'health-1',
    title: 'योग और ध्यान: आत्मिक और शारीरिक स्वास्थ्य का मार्ग',
    excerpt: 'Discover the transformative power of yoga and meditation for holistic well-being',
    category: 'Yoga & Meditation',
    readTime: '8 min',
    image: '/health/yoga-meditation.jpg',
    content: [
      'Daily yoga practice for mental and physical strength',
      'Meditation techniques for stress management',
      'Breathing exercises for better focus',
      'Yoga poses for women\'s health'
    ]
  },
  {
    id: 'health-2',
    title: 'पोषण और आयुर्वेद: स्वस्थ जीवन का आधार',
    excerpt: 'Learn about balanced nutrition and Ayurvedic principles for optimal health',
    category: 'Nutrition',
    readTime: '10 min',
    image: '/health/nutrition.jpg',
    content: [
      'Understanding your body type (Prakriti)',
      'Seasonal eating guidelines',
      'Healing herbs and spices',
      'Meal planning for busy women'
    ]
  },
  {
    id: 'health-3',
    title: 'मानसिक स्वास्थ्य: आत्मविश्वास और संतुलन',
    excerpt: 'Building mental resilience and maintaining emotional balance',
    category: 'Mental Health',
    readTime: '12 min',
    image: '/health/mental-health.jpg',
    content: [
      'Stress management techniques',
      'Building self-confidence',
      'Emotional intelligence practices',
      'Work-life balance tips'
    ]
  },
  {
    id: 'health-4',
    title: 'व्यायाम और फिटनेस: शक्ति का स्रोत',
    excerpt: 'Effective exercise routines for strength and vitality',
    category: 'Fitness',
    readTime: '7 min',
    image: '/health/fitness.jpg',
    content: [
      'Home workout routines',
      'Strength training basics',
      'Cardio exercises for heart health',
      'Recovery and rest importance'
    ]
  },
  {
    id: 'health-5',
    title: 'स्वस्थ जीवनशैली: दैनिक आदतें और नियम',
    excerpt: 'Daily habits and routines for a healthier lifestyle',
    category: 'Lifestyle',
    readTime: '9 min',
    image: '/health/lifestyle.jpg',
    content: [
      'Morning routine optimization',
      'Sleep hygiene practices',
      'Digital wellness tips',
      'Sustainable healthy habits'
    ]
  }
];

const HealthAndLifestylePage = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-green-400 to-emerald-600 mb-6">
            Health & Lifestyle
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover holistic approaches to health, wellness, and balanced living
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthArticles.map((article) => (
            <article 
              key={article.id} 
              className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden 
                border border-green-500/20 hover:border-green-500/40 
                transition-all duration-300 group"
            >
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transform group-hover:scale-105 
                    transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 
                    rounded-full text-sm">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-400">{article.readTime} read</span>
                </div>
                <h2 className="text-xl font-semibold text-white mb-3 
                  group-hover:text-green-300 transition-colors duration-300">
                  {article.title}
                </h2>
                <p className="text-gray-300 mb-4">{article.excerpt}</p>
                <ul className="space-y-2">
                  {article.content.map((point, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-400">
                      <span className="mr-2 text-green-500">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full py-2 px-4 bg-gradient-to-r 
                  from-green-500/50 to-emerald-600/50 text-white rounded-lg 
                  hover:from-green-500/70 hover:to-emerald-600/70 
                  transition-all duration-300">
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthAndLifestylePage;