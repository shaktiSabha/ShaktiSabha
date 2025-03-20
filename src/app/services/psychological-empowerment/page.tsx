"use client"

import React from 'react';

const PsychologicalEmpowermentPage = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-rose-400 to-pink-600 mb-6">
            Psychological & Emotional Empowerment
          </h1>
          <p className="text-xl text-rose-100/80 max-w-3xl mx-auto">
            Supporting mental wellbeing and emotional growth through expert guidance
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column: Featured Content */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl 
              border border-rose-500/20 hover:border-rose-500/30 
              transition-all duration-300 group">
              <h2 className="text-2xl font-semibold text-white mb-4 
                group-hover:text-rose-300 transition-colors duration-300">
                मानसिक शक्ति का विकास
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                महिलाएँ सिर्फ़ बाहरी दुनिया से नहीं, बल्कि अपने दिमाग से भी लड़ती हैं। 
                उनकी सबसे बड़ी लड़ाई शंका, भय, और मानसिक जंजीरों से होती है।
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl 
              border border-rose-500/20 hover:border-rose-500/30 
              transition-all duration-300 group">
              <h2 className="text-2xl font-semibold text-white mb-4 
                group-hover:text-rose-300 transition-colors duration-300">
                हमारा लक्ष्य
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                हम उन्हें यह सिखाएँगे कि कैसे अपनी सोच को नियंत्रित कर एक अटूट मानसिक 
                शक्ति विकसित करें।
              </p>
            </div>
          </div>

          {/* Right Column: Key Features */}
          <div className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 
            backdrop-blur-lg p-8 rounded-2xl border border-rose-500/20">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Key Features of Our Program
            </h3>
            <div className="space-y-4">
              {[
                'Mental Resilience Building',
                'Emotional Intelligence Development',
                'Self-confidence Enhancement',
                'Stress Management Techniques',
                'Personal Growth Workshops'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 
                  p-4 bg-white/5 rounded-lg hover:bg-white/10 
                  transition-all duration-300">
                  <span className="text-rose-400">✦</span>
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 
            text-white rounded-xl font-bold hover:from-rose-600 hover:to-pink-700 
            transform hover:scale-105 transition-all duration-300 shadow-lg 
            hover:shadow-rose-500/25">
            Join Our Next Workshop
          </button>
        </div>
      </div>
    </div>
  );
};

export default PsychologicalEmpowermentPage;