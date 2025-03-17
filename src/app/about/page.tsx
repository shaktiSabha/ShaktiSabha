import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Shakti Sabha and our mission to '
}


const about = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Shakti Sabha is dedicated to empowering women through education, counseling, and community support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To create a supportive environment where women can thrive, learn, and achieve their full potential.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              A world where every woman has equal opportunities and the confidence to pursue her dreams.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600">
              Empowerment, Education, Support, Community, and Inclusivity guide everything we do.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 text-2xl">📚</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Educational Programs</h3>
                <p className="text-gray-600">Skills development and career guidance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 text-2xl">💭</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Counseling Services</h3>
                <p className="text-gray-600">Professional mental health support</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 text-2xl">👥</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Community Events</h3>
                <p className="text-gray-600">Networking and social gatherings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 text-2xl">🤝</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Support Groups</h3>
                <p className="text-gray-600">Safe spaces for sharing and growth</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Psychological and Emotional Empowerment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Building Inner Strength</h3>
              <p className="text-gray-600">
                We focus on developing emotional resilience, self-confidence, and a positive self-image through specialized workshops and one-on-one counseling sessions.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Mental Wellness</h3>
              <p className="text-gray-600">
                Our expert counselors provide support for stress management, anxiety, depression, and other mental health concerns in a safe, confidential environment.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default about
