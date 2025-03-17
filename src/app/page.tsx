import React from 'react'
import Carousel from './components/Carousel/page'

const page = () => {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-6 animate-fade-in mt-10">
           Welcome to Shakti Sabha 
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-violet-300 mb-6">
            अब डरना नहीं, दहाड़ना है
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Empowering women through resources, education, and community support.
          </p>
        </div>
        <div>
            <Carousel/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">🌟</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Psychological and Emotional Empowerment</h3>
            <p className="text-gray-300 text-center">Supporting mental wellbeing and emotional growth through expert guidance</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">💝</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Counseling Services</h3>
            <p className="text-gray-300 text-center">Professional counseling and support for your journey</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Community Platform</h3>
            <p className="text-gray-300 text-center">Connect and grow with like-minded women</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Webinars and Workshops</h3>
            <p className="text-gray-300 text-center">Interactive learning experiences for personal growth</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Support Groups</h3>
            <p className="text-gray-300 text-center">Safe spaces for sharing and healing together</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Online Courses</h3>
            <p className="text-gray-300 text-center">Comprehensive learning resources for skill development</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">🧘‍♀️</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Healthy Lifestyle</h3>
            <p className="text-gray-300 text-center">Wellness programs and fitness guidance for a balanced life</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">👩‍👩‍👧‍👦</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">For Specific Groups</h3>
            <p className="text-gray-300 text-center">Tailored support for young women, mothers, and professionals</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">🎧</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Podcasts and Media</h3>
            <p className="text-gray-300 text-center">Inspiring content and educational resources on-the-go</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page
