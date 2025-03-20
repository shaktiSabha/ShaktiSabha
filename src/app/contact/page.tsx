"use client"
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-400 
            to-pink-600 text-transparent bg-clip-text transform hover:scale-105 
            transition-all duration-300">
            Get in Touch
          </h1>
          <p className="text-xl text-rose-100/80 max-w-2xl mx-auto">
            Have questions or need support? We&apos;re here to help you 24/7
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
          p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10 
          hover:border-rose-500/20 transition-all duration-500">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-rose-100/90 
                  flex items-center space-x-2">
                  <span>Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                    text-white placeholder-gray-400 focus:border-rose-500/50 
                    focus:ring-2 focus:ring-rose-500/20 transition-all duration-300
                    hover:bg-white/10"
                  required
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-rose-100/90 
                  flex items-center space-x-2">
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                    text-white placeholder-gray-400 focus:border-rose-500/50 
                    focus:ring-2 focus:ring-rose-500/20 transition-all duration-300
                    hover:bg-white/10"
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-rose-100/90">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                  text-white placeholder-gray-400 focus:border-rose-500/50 
                  focus:ring-2 focus:ring-rose-500/20 transition-all duration-300
                  hover:bg-white/10"
                required
                placeholder="How can we help you?"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-rose-100/90">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                  text-white placeholder-gray-400 focus:border-rose-500/50 
                  focus:ring-2 focus:ring-rose-500/20 transition-all duration-300
                  hover:bg-white/10 resize-none"
                required
                placeholder="Type your message here..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl text-white font-medium
                bg-gradient-to-r from-rose-500 to-pink-600 
                hover:from-rose-600 hover:to-pink-700
                transform hover:scale-[1.02] active:scale-[0.98]
                transition-all duration-300 shadow-lg hover:shadow-rose-500/25
                focus:outline-none focus:ring-2 focus:ring-rose-500/50 
                focus:ring-offset-2 focus:ring-offset-black"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
