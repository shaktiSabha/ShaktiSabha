import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community - Shakti Sabha',
  description: 'Join our supportive community of women empowering women through discussion forums, story sharing, and mentorship'
};

const CommunityPage = () => {
  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300 mt-20">
            Our Community
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Join our supportive network of women lifting each other up through shared experiences and mentorship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Discussion Forum Section */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">💭</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Private Women-Only Forum</h2>
            <p className="text-gray-300 text-center mb-6">
              A safe space for women to discuss, share experiences, and support each other in confidence.
            </p>
            <button className="w-full py-2 px-4 bg-white/10 text-white rounded-lg 
                hover:bg-white/20 transition-all duration-300">
              Join Discussion
            </button>
          </div>

          {/* Share Your Story Section */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:-rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">📝</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Speak Up, Rise Up</h2>
            <p className="text-gray-300 text-center mb-6">
              Share your journey and inspire others. Every story matters, every voice counts.
            </p>
            <button className="w-full py-2 px-4 bg-white/10 text-white rounded-lg 
                hover:bg-white/20 transition-all duration-300">
              Share Your Story
            </button>
          </div>

          {/* Mentorship Section */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105 hover:rotate-1
              transition-all duration-300 cursor-pointer border border-white/10">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl">🤝</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Mentorship Program</h2>
            <p className="text-gray-300 text-center mb-6">
              Connect with experienced mentors who can guide you on your journey to success.
            </p>
            <button className="w-full py-2 px-4 bg-white/10 text-white rounded-lg 
                hover:bg-white/20 transition-all duration-300">
              Find a Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
