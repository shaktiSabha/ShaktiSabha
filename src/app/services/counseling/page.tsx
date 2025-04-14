"use client"

import Image from 'next/image';
import React, { useState } from 'react';

interface AppointmentForm {
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  session_type: string;
  concerns: string;
}

const CounselingPage = () => {
  const [formData, setFormData] = useState<AppointmentForm>({
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    session_type: 'online',
    concerns: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  return (
    <div className="grid  py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-purple-400 to-pink-600 mb-6 p-4">
            Counseling Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional support for your mental and emotional well-being
          </p>
        </div>

        {/* Quick Chat Section */}
        <div className="mb-16 bg-white/10 backdrop-blur-sm p-2 rounded-xl 
          border border-purple-500/20">
            <div className="max-w-xl mx-auto text-center p-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-green-300 to-blue-400 mb-4">
              Need Immediate Support?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://wa.me/yourwhatsappnumber" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg p-4 
              bg-gradient-to-br from-green-500/10 to-green-500/30 
              hover:from-green-500/20 hover:to-green-500/40 
              border border-green-500/20 backdrop-blur-sm
              transition-all duration-300 transform hover:scale-102">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 
              to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              <div className="relative flex flex-col items-center space-y-2">
              <Image
                  src="/icons/whatsapp.png" // or a remote URL
                  alt="Description of image"
                  width={40}
                  height={40}
                />
              <span className="text-white font-medium text-base">Chat on WhatsApp</span>
              </div>
              </a>
              <a href="mailto:counseling@shaktisabha.com" 
              className="group relative overflow-hidden rounded-lg p-4 
              bg-gradient-to-br from-blue-500/10 to-blue-500/30 
              hover:from-blue-500/20 hover:to-blue-500/40 
              border border-blue-500/20 backdrop-blur-sm
              transition-all duration-300 transform hover:scale-102">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 
              to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              <div className="relative flex flex-col items-center space-y-2">
              <Image
                  src="/icons/telegram.png" // or a remote URL
                  alt="Description of image"
                  width={40}
                  height={40}
                />
              <span className="text-white font-medium text-base">Chat on Telegram</span>
              </div>
              </a>
            </div>
            </div>
        </div>

        {/* Book Appointment Form */}
        <div className="mb-5 bg-white/10 backdrop-blur-lg p-6 rounded-xl 
          border border-pink-500/20">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Book a Counseling Session
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                  text-white placeholder-gray-400 focus:border-pink-500/50 
                  focus:ring-1 focus:ring-pink-500/50"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                  text-white placeholder-gray-400 focus:border-pink-500/50 
                  focus:ring-1 focus:ring-pink-500/50"
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
                  text-white placeholder-gray-400 focus:border-pink-500/50 
                  focus:ring-1 focus:ring-pink-500/50"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                required
              />
              <input
                type="date"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                  text-white placeholder-gray-400 focus:border-pink-500/50 
                  focus:ring-1 focus:ring-pink-500/50"
                value={formData.preferred_date}
                onChange={e => setFormData({...formData, preferred_date: e.target.value})}
                required
              />
            </div>
            <select
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                text-white focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
              value={formData.session_type}
              onChange={e => setFormData({...formData, session_type: e.target.value})}
              required
            >
              <option value="online">Online Session</option>
              <option value="in-person">In-Person Session</option>
              <option value="phone">Phone Session</option>
            </select>
            <textarea
              placeholder="Brief description of your concerns..."
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                text-white placeholder-gray-400 focus:border-pink-500/50 
                focus:ring-1 focus:ring-pink-500/50 h-32 resize-none"
              value={formData.concerns}
              onChange={e => setFormData({...formData, concerns: e.target.value})}
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 
                text-white rounded-lg hover:from-purple-600 hover:to-pink-700 
                transition-all duration-300"
            >
              Request Appointment
            </button>
          </form>
        </div>

        
      </div>
    </div>
  );
};

export default CounselingPage;
