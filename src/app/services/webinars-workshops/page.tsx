"use client"

import React, { useState } from 'react';

const WebinarsWorkshopsPage = () => {
  const [activeTab, setActiveTab] = useState('events');

  const eventsData = [
    {
      title: "Shakti Bhava",
      type: "Physical Event",
      locations: [
        { type: "Schools", schedule: "Every Monday" },
        { type: "Colleges", schedule: "Every Wednesday" },
        { type: "Villages", schedule: "Weekend Workshops" }
      ],
      description: "Empowering sessions focused on self-defense, mental strength, and personal growth"
    }
  ];

  const shaktisutras = [
    "नारी तू नारायणी - You are divine, you are powerful",
    "स्वयं की शक्ति को पहचानो - Recognize your inner strength",
    "साहस तेरा हथियार है - Courage is your weapon",
    "तेरी उड़ान तेरी पहचान - Your flight is your identity"
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6">
            Workshops & Webinars
          </h1>
          <p className="text-xl text-yellow-100/80 max-w-3xl mx-auto">
            Join our transformative sessions and empower yourself with knowledge and skills
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          {['events', 'sutras', 'varta'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
                ${activeTab === tab 
                  ? 'bg-yellow-500/20 text-yellow-300' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
            >
              {tab === 'events' && 'Shakti Bhava Events'}
              {tab === 'sutras' && 'Shakti Sutras'}
              {tab === 'varta' && 'Shakti Varta'}
            </button>
          ))}
        </div>

        {/* Dynamic Content Section */}
        <div className="space-y-8">
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventsData[0].locations.map((location, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg p-8 rounded-xl 
                  border border-yellow-500/20 hover:border-yellow-500/40 
                  transition-all duration-300">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {location.type}
                  </h3>
                  <p className="text-yellow-100/80 mb-4">{location.schedule}</p>
                  <button className="px-6 py-2 bg-gradient-to-r from-yellow-500/50 to-yellow-600/50 
                    text-white rounded-lg hover:from-yellow-500/70 hover:to-yellow-600/70 
                    transition-all duration-300">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sutras' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shaktisutras.map((sutra, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl 
                  border border-yellow-500/20 hover:border-yellow-500/40 
                  transition-all duration-300 text-center">
                  <p className="text-xl text-yellow-100">{sutra}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'varta' && (
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl 
              border border-yellow-500/20">
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Sunday Shakti Varta Sessions
              </h2>
              <div className="space-y-6">
                <p className="text-yellow-100/80 text-center">
                  Join us every Sunday for enlightening discussions on Sanatan Nari Shakti.
                  Explore ancient wisdom and its modern applications.
                </p>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-white mb-4">Next Session</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>🕐 Time: 10:00 AM IST</li>
                    <li>📅 Every Sunday</li>
                    <li>💻 Platform: Google Meet</li>
                  </ul>
                  <button className="mt-6 px-6 py-2 bg-gradient-to-r from-yellow-500/50 
                    to-yellow-600/50 text-white rounded-lg hover:from-yellow-500/70 
                    hover:to-yellow-600/70 transition-all duration-300 w-full">
                    Join Next Session
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebinarsWorkshopsPage;