import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learn and Empower',
  description: 'Empower yourself with self-defense, mental strength, and knowledge of your rights'
}

const LearnandEmpower = () => {
  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300 mt-20">
            Learn and Empower
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Knowledge is power. Empower yourself with essential skills and understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Self-Defense Section */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🥋</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4 hover:text-pink-300">
              Self-Defense Courses
            </h2>
            <p className="text-gray-200 mb-6">
              Learn practical self-defense techniques from certified instructors. Available in both free and premium formats.
            </p>
            <button className="px-4 py-2 bg-red-500/20 text-white rounded-lg hover:bg-red-500/40 transition-all duration-300">
              Explore Courses
            </button>
          </div>

          {/* Mind Mastery Section */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:-rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🧠</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4 hover:text-pink-300">
              Mind Mastery
            </h2>
            <p className="text-gray-200 mb-6">
              Develop mental and emotional strength through guided practices and expert counseling.
            </p>
            <button className="px-4 py-2 bg-purple-500/20 text-white rounded-lg hover:bg-purple-500/40 transition-all duration-300">
              Start Journey
            </button>
          </div>

          {/* Legal Rights Section */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">⚖️</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4 hover:text-pink-300">
              Legal & Financial Rights
            </h2>
            <p className="text-gray-200 mb-6">
              Understand your legal rights and gain financial literacy through expert guidance.
            </p>
            <button className="px-4 py-2 bg-blue-500/20 text-white rounded-lg hover:bg-blue-500/40 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnandEmpower
