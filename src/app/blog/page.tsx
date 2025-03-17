import React from 'react'
import type { Metadata } from 'next'
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stay updated with our latest articles, success stories and community updates'
}



const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest articles, success stories and community updates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Articles Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Articles</h2>
            <p className="text-gray-600 mb-4">
              Read our latest articles on women empowerment, leadership, and personal growth.
            </p>
            <Link href="/blog/[blogid]" className="text-gray-800 hover:text-gray-600 font-medium">
              Read More →
            </Link>
          </div>

          {/* Success Stories Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-gray-600 mb-4">
              Inspiring stories of women who have overcome challenges and achieved their goals.
            </p>
            <Link href="/success-stories" className="text-gray-800 hover:text-gray-600 font-medium">
              Read More →
            </Link>
          </div>

          {/* Support Groups Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Support Groups</h2>
            <p className="text-gray-600 mb-4">
              Join our supportive community groups and connect with like-minded women.
            </p>
            <Link href="/support-groups" className="text-gray-800 hover:text-gray-600 font-medium">
              Join Now →
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="space-x-4">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/terms" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
