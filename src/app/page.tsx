import React from 'react'
import Carousel from './components/Carousel/page'
import Link from 'next/link';

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

const page = () => {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-6 animate-fade-in mt-10">
           Welcome to Shakti Sabha 
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-violet-300 mb-6">
            अब डरना नहीं, दहाड़ना है
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
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
                border-white/20 shadow-xl hover:shadow-2xl transition-all 
                duration-300 transform hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 bg-violet-500/20 rounded-full 
                flex items-center justify-center mb-6 mx-auto 
                group-hover:bg-violet-500/30 transition-colors duration-300">
                <span className="text-3xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-300 text-center">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export default page
