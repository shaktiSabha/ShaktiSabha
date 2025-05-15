"use client"

import Link from 'next/link';
import React from 'react';

const PsychologicalEmpowermentPage = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text p-5 
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
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Key Features of Our Program
            </h3>
            <p className="text-lg text-gray-200 mb-6">
              Empowering women through a holistic and deeply transformative approach.
            </p>
            <div className="space-y-4">
              <div className="flex flex-col p-6 bg-white/5 rounded-lg 
              hover:bg-white/10 transition-all duration-300 
              hover:shadow-lg hover:shadow-rose-500/10 border border-rose-500/10
              hover:border-rose-500/20 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-rose-400 text-xl animate-pulse">✦</span>
                <span className="text-gray-200 font-semibold text-lg 
                bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text 
                text-transparent">Mental Resilience Building</span>
              </div>
              <p className='text-gray-300/80 text-sm pl-7 leading-relaxed 
                hover:text-gray-200 transition-colors duration-300'>
                We equip women with the psychological strength to navigate adversity 
                with courage and clarity. Our structured modules include cognitive 
                restructuring, resilience exercises, and trauma-informed tools that 
                build a strong foundation of mental endurance and emotional stability.
              </p>
              </div>
              <div className="flex flex-col p-6 bg-white/5 rounded-lg 
              hover:bg-white/10 transition-all duration-300 
              hover:shadow-lg hover:shadow-rose-500/10 border border-rose-500/10
              hover:border-rose-500/20 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-rose-400 text-xl animate-pulse">✦</span>
                <span className="text-gray-200 font-semibold text-lg 
                bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text 
                text-transparent">Emotional Intelligence Development</span>
              </div>
              <p className='text-gray-300/80 text-sm pl-7 leading-relaxed 
                hover:text-gray-200 transition-colors duration-300'>
                Understanding and managing emotions is key to self-mastery. Through guided sessions on self-awareness, empathy building, and emotional regulation, we enable participants to enhance interpersonal skills, resolve conflicts mindfully, and lead with emotional balance.
              </p>
              </div>
              <div className="flex flex-col p-6 bg-white/5 rounded-lg 
              hover:bg-white/10 transition-all duration-300 
              hover:shadow-lg hover:shadow-rose-500/10 border border-rose-500/10
              hover:border-rose-500/20 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-rose-400 text-xl animate-pulse">✦</span>
                <span className="text-gray-200 font-semibold text-lg 
                bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text 
                text-transparent">Self-confidence Enhancement</span>
              </div>
              <p className='text-gray-300/80 text-sm pl-7 leading-relaxed 
                hover:text-gray-200 transition-colors duration-300'>
                Confidence is not a gift — it’s a skill we help you build. Our programs integrate body language training, communication strategies, self-image work, and mindset shifts that empower every woman to own her voice, assert her presence, and lead from within.
              </p>
              </div>
              <div className="flex flex-col p-6 bg-white/5 rounded-lg 
              hover:bg-white/10 transition-all duration-300 
              hover:shadow-lg hover:shadow-rose-500/10 border border-rose-500/10
              hover:border-rose-500/20 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-rose-400 text-xl animate-pulse">✦</span>
                <span className="text-gray-200 font-semibold text-lg 
                bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text 
                text-transparent">Stress Management Techniques</span>
              </div>
              <p className='text-gray-300/80 text-sm pl-7 leading-relaxed 
                hover:text-gray-200 transition-colors duration-300'>
                In a world of constant noise, inner peace is a superpower. We introduce evidence-based and culturally-rooted stress relief practices — such as mindfulness, yogic breathwork, and guided journaling — designed to restore calm, focus, and emotional regulation.
              </p>
              </div>
              <div className="flex flex-col p-6 bg-white/5 rounded-lg 
              hover:bg-white/10 transition-all duration-300 
              hover:shadow-lg hover:shadow-rose-500/10 border border-rose-500/10
              hover:border-rose-500/20 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-rose-400 text-xl animate-pulse">✦</span>
                <span className="text-gray-200 font-semibold text-lg 
                bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text 
                text-transparent">Personal Growth Workshops</span>
              </div>
              <p className='text-gray-300/80 text-sm pl-7 leading-relaxed 
                hover:text-gray-200 transition-colors duration-300'>
                We believe growth is not linear — it’s expansive. Our hands-on workshops are built to unlock personal potential, featuring themes like purpose discovery, leadership training, goal setting, and habit transformation. Each session is curated to help women rise beyond limits.<br/><br />
Ready to unlock your inner power? Our programs are not just courses — they are experiences that create lasting transformation in mindset, lifestyle, and emotional wellbeing.

              </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/services/webinars-workshops" className="inline-block mb-6">
          <button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 
            text-white rounded-xl font-bold hover:from-rose-600 hover:to-pink-700 
            transform hover:scale-105 transition-all duration-300 shadow-lg 
            hover:shadow-rose-500/25">
            Join Our Next Workshop
          </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default PsychologicalEmpowermentPage;