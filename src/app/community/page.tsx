"use client"

import React, { useState } from 'react';


const CommunityGroups = [
  {
    platform: 'WhatsApp',
    icon: '📱',
    description: 'Join our WhatsApp community for daily inspiration and support',
    color: 'from-green-500/50 to-emerald-500/50',
    hoverColor: 'from-green-500/70 to-emerald-500/70',
    link: 'https://chat.whatsapp.com/your-group-link'
  },
  {
    platform: 'Telegram',
    icon: '✈️',
    description: 'Connect with our larger community on Telegram',
    color: 'from-blue-500/50 to-cyan-500/50',
    hoverColor: 'from-blue-500/70 to-cyan-500/70',
    link: 't.me/your-group-link'
  },
  {
    platform: 'Discord',
    icon: '💬',
    description: 'Join discussions and voice chats on our Discord server',
    color: 'from-indigo-500/50 to-purple-500/50',
    hoverColor: 'from-indigo-500/70 to-purple-500/70',
    link: 'discord.gg/your-invite-link'
  },
  {
    platform: 'Instagram',
    icon: '📸',
    description: 'Follow our journey and stay updated on Instagram',
    color: 'from-pink-500/50 to-rose-500/50',
    hoverColor: 'from-pink-500/70 to-rose-500/70',
    link: 'instagram.com/your-handle'
  }
];

const CommunityPage = () => {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    interests: '',
    preferredPlatform: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

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

        {/* Social Community Groups Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Join Our Social Communities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CommunityGroups.map((group, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl 
                border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="text-4xl mb-4 text-center">{group.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center">
                  {group.platform}
                </h3>
                <p className="text-gray-300 text-center mb-4 text-sm">
                  {group.description}
                </p>
                <a
                  href={group.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-2 px-4 rounded-lg text-center text-white 
                    bg-gradient-to-r ${group.color} hover:${group.hoverColor} 
                    transition-all duration-300`}
                >
                  Join {group.platform}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Ground Work Joining Form */}
        <div className="mt-16 bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Join Our Ground Movement
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-200 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 
                    transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 
                    transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-200 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 
                    transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                    text-white focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 
                    transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-200 mb-2">Areas of Interest</label>
              <textarea
                value={formData.interests}
                onChange={e => setFormData({...formData, interests: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                  text-white focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 
                  transition-all duration-300 h-24 resize-none"
                placeholder="Tell us what interests you about our community..."
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 
                  text-white rounded-lg hover:from-rose-600 hover:to-pink-700 
                  transition-all duration-300 transform hover:scale-105"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
