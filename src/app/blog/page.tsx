import React from 'react'
import type { Metadata } from 'next'
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stay updated with our latest articles, success stories and community updates'
}

const BlogPage = () => {
  const postId = '123';

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300 mt-10">
            Our Blog
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Stay updated with our latest articles, success stories and community updates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Articles Section */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4 hover:text-pink-300">
              Latest Articles
            </h2>
            <p className="text-gray-200 mb-6">
              Read our latest articles on women empowerment, leadership, and personal growth.
            </p>
            <Link 
              href={`/blog/${postId}`} 
              className="text-white hover:text-pink-300 font-medium transition-colors duration-300"
            >
              Read More →
            </Link>
          </div>

          {/* Success Stories Section */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:-rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4 hover:text-pink-300">
              Success Stories
            </h2>
            <p className="text-gray-200 mb-6">
              Inspiring stories of women who have overcome challenges and achieved their goals.
            </p>
            <Link 
              href="/success-stories" 
              className="text-white hover:text-pink-300 font-medium transition-colors duration-300"
            >
              Read More →
            </Link>
          </div>

          {/* Support Groups Section */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4 hover:text-pink-300">
              Support Groups
            </h2>
            <p className="text-gray-200 mb-6">
              Join our supportive community groups and connect with like-minded women.
            </p>
            <Link 
              href="/support-groups" 
              className="text-white hover:text-pink-300 font-medium transition-colors duration-300"
            >
              Join Now →
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="space-x-4">
            <Link 
              href="/privacy" 
              className="text-gray-200 hover:text-pink-300 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/terms" 
              className="text-gray-200 hover:text-pink-300 transition-colors duration-300"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
