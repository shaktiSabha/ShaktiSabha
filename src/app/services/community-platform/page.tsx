"use client"

import React, { useState } from 'react';

interface JoinForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  preferred_platform: string;
  interests: string[];
  experience_level: string;
}

const CommunityPlatformPage = () => {
  const [formData, setFormData] = useState<JoinForm>({
    name: '',
    email: '',
    phone: '',
    city: '',
    preferred_platform: '',
    interests: [],
    experience_level: ''
  });

  const socialPlatforms = [
    {
      name: 'WhatsApp',
      icon: '📱',
      description: 'Daily support and quick updates',
      link: 'https://chat.whatsapp.com/your-group-link',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Telegram',
      icon: '✈️',
      description: 'News, resources, and community discussions',
      link: 't.me/your-group-link',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Discord',
      icon: '💬',
      description: 'Voice chats and topic-based channels',
      link: 'discord.gg/your-invite-link',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Instagram',
      icon: '📸',
      description: 'Visual updates and stories',
      link: 'instagram.com/your-handle',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-yellow-400 to-orange-600 mb-6">
            Join Our Community
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect, learn, and grow with like-minded women across multiple platforms
          </p>
        </div>

        {/* Social Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {socialPlatforms.map((platform) => (
            <div key={platform.name} 
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl 
                border border-white/10 hover:border-white/20 
                transition-all duration-300 group">
              <div className="text-4xl mb-4">{platform.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {platform.name}
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                {platform.description}
              </p>
              <a
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-2 px-4 rounded-lg text-center text-white 
                  bg-gradient-to-r ${platform.color} opacity-80 
                  hover:opacity-100 transition-all duration-300`}
              >
                Join {platform.name}
              </a>
            </div>
          ))}
        </div>

        {/* Ground Work Join Form */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl 
          border border-yellow-500/20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Join Our Ground Movement
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                  text-white placeholder-gray-400 focus:border-yellow-500/50"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                  text-white placeholder-gray-400 focus:border-yellow-500/50"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                  text-white placeholder-gray-400 focus:border-yellow-500/50"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                  text-white placeholder-gray-400 focus:border-yellow-500/50"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
                required
              />
            </div>
            <select
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                text-white focus:border-yellow-500/50"
              value={formData.experience_level}
              onChange={e => setFormData({...formData, experience_level: e.target.value})}
              required
            >
              <option value="">Select Experience Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <div className="space-y-2">
              <p className="text-white mb-2">Areas of Interest</p>
              {['Self-Defense', 'Yoga', 'Meditation', 'Leadership', 'Wellness'].map((interest) => (
                <label key={interest} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const newInterests = e.target.checked
                        ? [...formData.interests, interest]
                        : formData.interests.filter(i => i !== interest);
                      setFormData({...formData, interests: newInterests});
                    }}
                    className="form-checkbox h-4 w-4 text-yellow-500"
                  />
                  <span className="text-gray-300">{interest}</span>
                </label>
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 
                text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 
                transition-all duration-300"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityPlatformPage;