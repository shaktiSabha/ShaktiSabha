"use client"

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

  const supportGroups = [
    {
      title: "Mental Wellness Circle",
      schedule: "Mondays, 7 PM",
      topics: ["Anxiety", "Depression", "Stress Management"],
      facilitator: "Dr. Priya Sharma"
    },
    {
      title: "Career & Life Balance",
      schedule: "Wednesdays, 6 PM",
      topics: ["Work Stress", "Time Management", "Goal Setting"],
      facilitator: "Ms. Ritu Verma"
    },
    {
      title: "Family Relations",
      schedule: "Saturdays, 11 AM",
      topics: ["Marriage", "Parenting", "In-laws Relations"],
      facilitator: "Dr. Meera Reddy"
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
        <div className="mb-16 bg-white/10 backdrop-blur-lg p-8 rounded-xl 
          border border-purple-500/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Need Immediate Support?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="https://wa.me/yourwhatsappnumber" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 px-6 py-4 
                  bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-all duration-300">
                <span className="text-2xl">💬</span>
                <span className="text-white">Chat on WhatsApp</span>
              </a>
              <a href="mailto:counseling@shaktisabha.com" 
                className="flex items-center justify-center space-x-3 px-6 py-4 
                  bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-all duration-300">
                <span className="text-2xl">📧</span>
                <span className="text-white">Send Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Book Appointment Form */}
        <div className="mb-16 bg-white/10 backdrop-blur-lg p-8 rounded-xl 
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

        {/* Support Groups Section */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl 
          border border-purple-500/20">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Sister Circle Support Groups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportGroups.map((group, index) => (
              <div key={index} className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {group.title}
                </h3>
                <p className="text-purple-300 mb-3">{group.schedule}</p>
                <p className="text-gray-400 mb-3">Facilitator: {group.facilitator}</p>
                <div className="space-y-2">
                  {group.topics.map((topic, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-pink-400">•</span>
                      <span className="text-gray-300">{topic}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full py-2 bg-purple-500/20 text-white 
                  rounded-lg hover:bg-purple-500/30 transition-all duration-300">
                  Join Group
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselingPage;
