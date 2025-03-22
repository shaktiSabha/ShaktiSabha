"use client"

import React from 'react'
import Carousel from './components/Carousel/page'
import Link from 'next/link'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

const services = [
  {
    icon: "🌟",
    title: "Psychological and Emotional Empowerment",
    description: "Supporting mental wellbeing and emotional growth through expert guidance",
    href: "/services/psychological-empowerment"
  },
  {
    icon: "💝",
    title: "Counseling Services",
    description: "Professional counseling and support for your journey",
    href: "/services/counseling"
  },
  {
    icon: "👥",
    title: "Community Platform",
    description: "Connect and grow with like-minded women",
    href: "/services/community-platform"
  },
  {
    icon: "🎯",
    title: "Webinars and Workshops",
    description: "Interactive learning experiences for personal growth",
    href: "/services/webinars-workshops"
  },
  {
    icon: "🤝",
    title: "Support Groups",
    description: "Safe spaces for sharing and healing together",
    href: "/services/support-groups"
  },
  {
    icon: "📚",
    title: "Online Courses",
    description: "Comprehensive learning resources for skill development",
    href: "/services/online-courses"
  },
  {
    icon: "🧘‍♀️",
    title: "Healthy Lifestyle",
    description: "Wellness programs and fitness guidance for a balanced life",
    href: "/services/healthy-lifestyle"
  },
  {
    icon: "👩‍👩‍👧‍👦",
    title: "For Specific Groups",
    description: "Tailored support for young women, mothers, and professionals",
    href: "/services/specific-groups"
  },
  {
    icon: "🎧",
    title: "Podcasts and Media",
    description: "Inspiring content and educational resources on-the-go",
    href: "/services/podcasts-media"
  }
];

const Page = () => {

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-red-400 mb-6 animate-fade-in mt-10">
            Welcome to Shakti Sabha 
          </h1>
          <h2 className={`${poppins.className} text-3xl md:text-4xl font-bold text-red-300 mb-6`}>
            अब डरना नहीं, दहाड़ना है
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Empowering women through resources, education, and community support.
          </p>
        </div>

        <div>
          <Carousel/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Link 
              key={index}
              href={service.href}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border 
                border-[var(--yellow-primary)]/20 shadow-xl hover:shadow-2xl 
                transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 bg-[var(--yellow-primary)]/20 rounded-full 
                flex items-center justify-center mb-6 mx-auto 
                group-hover:bg-[var(--yellow-primary)]/30 transition-colors duration-300">
                <span className="text-3xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-red-300 mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-white text-center">
                {service.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mb-12">
          <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold text-red-400 mb-6 text-center`}>
            Our Active Petitions
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-[var(--yellow-primary)]/20">
              <h3 className="text-xl font-semibold text-red-300 mb-3">
                ROAR Against Rape! Need a New Law Against Rapists
              </h3>
              <p className="text-white mb-3 text-sm">
                Join our petition demanding stricter laws and faster execution of justice for rape cases in India.
              </p>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://chng.it/jMjtzNzpK6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-center text-sm"
                >
                  Sign Petition
                </a>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/yKkhFULPle8"
                    title="Petition Campaign Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                {/* Added Related Media Section */}
                <div className="mt-4 border-t border-[var(--yellow-primary)]/20 pt-4">
                  <h4 className="text-lg font-semibold text-red-300 mb-3">Related Media</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a 
                      href="/services/podcasts-media" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span className="text-xl">🎧</span>
                      <span className="text-white text-sm">Listen to our Podcast</span>
                    </a>
                    <a 
                      href="https://www.youtube.com/@aaryaveeraa" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span className="text-xl">📺</span>
                      <span className="text-white text-sm">Watch Video Series</span>
                    </a>
                    <a 
                      href="https://medium.com/shakti-sabha/articles" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span className="text-xl">📝</span>
                      <span className="text-white text-sm">Read Articles</span>
                    </a>
                    <a 
                      href="https://instagram.com/shaktisabha" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span className="text-xl">📱</span>
                      <span className="text-white text-sm">Social Media Updates</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page;
