import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Media - Shakti Sabha',
  description: 'Explore our blog posts and podcast on women empowerment, self-defense, and personal growth'
}

const BlogAndMediaPage = () => {
  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300 mt-20">
            Blog & Media
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Empowering content to help you grow stronger, wiser, and more confident
          </p>
        </div>

        {/* Blog Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white mb-6">Latest Articles</h2>
            {/* Blog Cards */}
            {[
              {
                title: "5 Deadly Self-Defense Moves Every Woman Must Know",
                excerpt: "Learn essential self-defense techniques that could save your life in dangerous situations.",
                readTime: "8 min read",
                category: "Self Defense"
              },
              {
                title: "How to Outsmart an Attacker Psychologically?",
                excerpt: "Understanding the psychology of attackers and how to use mental tactics for self-protection.",
                readTime: "10 min read",
                category: "Safety"
              },
              {
                title: "Healing from Toxic Relationships",
                excerpt: "A comprehensive guide to recognizing, leaving, and healing from toxic relationships.",
                readTime: "12 min read",
                category: "Mental Health"
              }
            ].map((post, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg 
                  hover:shadow-2xl hover:bg-white/20 hover:scale-102
                  transition-all duration-300 cursor-pointer border border-white/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-gray-400 text-sm">{post.category}</span>
                  <span className="text-gray-400 text-sm">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 hover:text-gray-300">
                  {post.title}
                </h3>
                <p className="text-gray-300">{post.excerpt}</p>
                <button className="mt-4 text-gray-300 hover:text-white transition-colors duration-300">
                  Read More →
                </button>
              </div>
            ))}
          </div>

          {/* Podcast Section */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/10">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Shakti Speaks Podcast</h2>
              <p className="text-gray-300">
                Real Women, Real Power Stories - Listen to inspiring stories of triumph, resilience, and empowerment.
              </p>
              
              {/* Latest Episodes */}
              <div className="space-y-4 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Latest Episodes</h3>
                {[1, 2, 3].map((episode) => (
                  <div 
                    key={episode}
                    className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg 
                      hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎙️</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Episode {episode}</h4>
                      <p className="text-gray-400 text-sm">45 minutes</p>
                    </div>
                    <button className="ml-auto text-gray-300 hover:text-white">
                      ▶️ Play
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 px-4 bg-white/10 text-white rounded-lg 
                hover:bg-white/20 transition-all duration-300 mt-6">
                View All Episodes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogAndMediaPage
