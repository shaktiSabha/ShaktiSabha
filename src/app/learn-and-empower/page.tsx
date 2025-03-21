import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

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

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

        {/* Counseling Services Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Counseling Services & Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chat Support Card */}
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border 
              border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span>💬</span> Instant Chat Support
              </h3>
              <p className="text-gray-200 mb-6">
                Get immediate assistance through our secure chat platform. Our trained 
                counselors are available 24/7 to help you.
              </p>
              <Link href="/chat-support" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500/50 to-rose-500/50 
                  text-white rounded-lg hover:from-pink-500/70 hover:to-rose-500/70 
                  transition-all duration-300">
                Start Chat
              </Link>
            </div>

            {/* Appointment Booking Card */}
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border 
              border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span>📅</span> Book a Counseling Session
              </h3>
              <p className="text-gray-200 mb-6">
                Schedule a private counseling session with our expert counselors. 
                Available both online and in-person.
              </p>
              <Link href="/book-appointment" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/50 to-violet-500/50 
                  text-white rounded-lg hover:from-purple-500/70 hover:to-violet-500/70 
                  transition-all duration-300">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Support Groups Section */}
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border 
          border-yellow-500/20 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Sisterhood Support Groups
          </h2>
          <div className="space-y-6">
            <p className="text-gray-200 text-center max-w-3xl mx-auto">
              Join our virtual support groups on Google Meet. Connect with others, 
              share experiences, and grow together in a safe, supportive environment.
            </p>
            
            {/* Support Group Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {[
                { title: 'Mental Wellness', schedule: 'Mondays, 7 PM', icon: '🌸' },
                { title: 'Career Growth', schedule: 'Wednesdays, 6 PM', icon: '💼' },
                { title: 'Personal Development', schedule: 'Fridays, 8 PM', icon: '✨' },
                { title: 'Family Matters', schedule: 'Saturdays, 11 AM', icon: '👨‍👩‍👧‍👦' },
                { title: 'Financial Independence', schedule: 'Tuesdays, 7 PM', icon: '💰' },
                { title: 'Self-Defense Practice', schedule: 'Thursdays, 6 PM', icon: '🥋' },
              ].map((group, index) => (
                <div key={index} 
                  className="bg-white/10 p-6 rounded-lg hover:bg-white/20 
                    transition-all duration-300 cursor-pointer">
                  <span className="text-2xl mb-2 block">{group.icon}</span>
                  <h3 className="text-lg font-semibold text-white mb-2">{group.title}</h3>
                  <p className="text-gray-300 text-sm">{group.schedule}</p>
                  <button className="mt-4 px-4 py-2 bg-yellow-500/20 text-white rounded-lg 
                    hover:bg-yellow-500/40 transition-all duration-300 text-sm w-full">
                    Join Group
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnandEmpower
