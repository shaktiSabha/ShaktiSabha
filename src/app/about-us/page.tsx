import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Shakti Sabha',
  description: 'Breaking barriers, building warriors - Learn about our mission to empower women'
}

const about = () => {
  return (
    <div className="min-h-screen relative">      
      <main className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 mt-10 hover:scale-105 transition-transform duration-300">
            About Us
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We are more than an organization - we are a movement of women supporting women, 
            turning challenges into opportunities and fears into strength.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Mission Card */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 
              hover:bg-white/20 transition-all hover:scale-105 hover:rotate-1 group">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto 
                group-hover:bg-white/20 transition-all">
              <span className="text-3xl">⚔️</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Our Mission</h2>
            <p className="text-gray-200 leading-relaxed text-center">
              Breaking Barriers, Building Warriors. We transform women through education, 
              self-defense training, and psychological empowerment.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 
              hover:bg-white/20 transition-all hover:scale-105 hover:-rotate-1 group">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto 
                group-hover:bg-white/20 transition-all">
              <span className="text-3xl">🌟</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Our Vision</h2>
            <p className="text-gray-200 leading-relaxed text-center">
              A World Where Women Fear Nothing. Where every woman walks with confidence, 
              speaks with power, and lives without boundaries.
            </p>
          </div>

          {/* Impact Card */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 
              hover:bg-white/20 transition-all hover:scale-105 hover:rotate-1 group">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto 
                group-hover:bg-white/20 transition-all">
              <span className="text-3xl">💪</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Our Impact</h2>
            <p className="text-gray-200 leading-relaxed text-center">
              Real Women, Real Power. Our community of warriors grows stronger every day, 
              supporting and inspiring each other to reach new heights.
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20 mb-20">
          <h2 className="text-3xl font-semibold text-white mb-10 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { icon: "📚", title: "Educational Programs", desc: "Skills development and career guidance" },
              { icon: "💭", title: "Counseling Services", desc: "Professional mental health support" },
              { icon: "👥", title: "Community Events", desc: "Networking and social gatherings" },
              { icon: "🤝", title: "Support Groups", desc: "Safe spaces for sharing and growth" }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-200">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20">
          <h2 className="text-3xl font-semibold text-white mb-10 text-center">Psychological and Emotional Empowerment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Building Inner Strength</h3>
              <p className="text-gray-200 leading-relaxed">
                We focus on developing emotional resilience, self-confidence, and a positive self-image through specialized workshops and one-on-one counseling sessions.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Mental Wellness</h3>
              <p className="text-gray-200 leading-relaxed">
                Our expert counselors provide support for stress management, anxiety, depression, and other mental health concerns in a safe, confidential environment.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default about
