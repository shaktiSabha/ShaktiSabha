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
          <h1 className="text-5xl md:text-6xl font-bold text-red-400 mb-6 mt-1 hover:scale-105 transition-transform duration-300">
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

        <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
          <h2 className="text-3xl font-semibold text-white mb-10 text-center relative">
            <span className="relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-white/40 after:bottom-[-10px] after:left-1/3">
            Aryaveera – Founder, Shakti Sabha Organization
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4 p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          About Aryveera
              </h3>
              <p className="text-gray-200 leading-relaxed hover:text-white transition-colors duration-300">
              Aryaveera is a bold visionary, a modern-day Rani Lakshmi Bai, and a fearless advocate for women&apos;s rights, safety, and inner awakening. With a rare combination of ancient wisdom and modern skills, she has empowered thousands of girls and women across India to recognize their true strength – their Shakti.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
          <span className="text-2xl">💭</span>
          Our Vission
              </h3>
              <p className="text-gray-200 leading-relaxed hover:text-white transition-colors duration-300">
              &quot;My vision is not just to protect women — but to awaken the lioness within them. We are not here to beg for safety, we are here to reclaim our ancient strength with wisdom, fire, and fearlessness.&quot;
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default about
