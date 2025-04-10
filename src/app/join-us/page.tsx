import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Us - Shakti Sabha',
  description: 'Join our movement to empower women and create positive change in society'
};

const JoinUsPage = () => {
  const involvementOptions = [
    {
      title: "Become a Warrior",
      description: "Join our membership program and access exclusive resources, training, and community support",
      icon: "⚔️",
      action: "Join Now",
      primary: true
    },
    {
      title: "Volunteer With Us",
      description: "Share your skills and time to help empower other women in our community",
      icon: "🤝",
      action: "Apply Now",
      primary: false
    },
    {
      title: "Donate to Empower",
      description: "Support our mission to provide free self-defense training and crisis support",
      icon: "💝",
      action: "Donate",
      primary: false
    }
  ];

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-red-400 mb-4 hover:scale-105 transition-transform duration-300 mt-20">
            Join Our Movement
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Together, we can create a safer, stronger, and more empowered future for women
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Main CTA Card */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 transition-all duration-300 
              border border-white/10 mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Become a Shakti Member
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of women who are part of this empowering journey. 
              Get access to exclusive resources, events, and a supportive community.
            </p>
            <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold 
                hover:bg-gray-200 transform hover:scale-105 
                transition-all duration-300 shadow-lg">
              JOIN THE MOVEMENT
            </button>
          </div>

          {/* Get Involved Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Get Involved</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {involvementOptions.map((option, index) => (
                <div 
                  key={index}
                  className={`bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
                    hover:shadow-2xl transition-all duration-300 
                    border border-white/10 text-center
                    ${option.primary ? 'hover:bg-white/30' : 'hover:bg-white/20'}`}
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full 
                    flex items-center justify-center text-3xl">
                    {option.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{option.title}</h3>
                  <p className="text-gray-300 mb-6">{option.description}</p>
                  {/* <button 
                    className={`px-6 py-3 rounded-lg font-bold transition-all duration-300
                      ${option.primary 
                        ? 'bg-white text-gray-900 hover:bg-gray-200' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                      } transform hover:scale-105`}
                  >
                    {option.action}
                  </button> */}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "👥",
                title: "Community Support",
                description: "Connect with like-minded women"
              },
              {
                icon: "📚",
                title: "Exclusive Resources",
                description: "Access premium learning materials"
              },
              {
                icon: "🎯",
                title: "Personal Growth",
                description: "Develop leadership skills"
              },
              {
                icon: "🤝",
                title: "Networking",
                description: "Build meaningful connections"
              }
            ].map((benefit, index) => (
              <div key={index} 
                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl 
                  hover:bg-white/20 transition-all duration-300 
                  border border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full 
                    flex items-center justify-center text-2xl">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{benefit.title}</h3>
                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;
