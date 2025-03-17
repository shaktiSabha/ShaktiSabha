"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';



const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300 mt-10">Contact Us</h1>
          <p className="text-xl text-gray-200">Get in touch with us for any queries or suggestions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105
              transition-all duration-300 border border-white/10">
            <h2 className="text-2xl font-semibold mb-6 text-white hover:text-pink-300">Contact Information</h2>
            <div className="space-y-6">
              {/* Contact Info Items */}
              <div className="flex items-start space-x-4">
                <div className="relative w-6 h-6 opacity-70">
                  <Image src="/icons/location.svg" alt="Location" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Address</h3>
                  <p className="text-gray-200">123 Shakti Sabha Street, City, State, PIN</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="relative w-6 h-6 opacity-70">
                  <Image src="/icons/phone.svg" alt="Phone" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone</h3>
                  <p className="text-gray-200">+91 1234567890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="relative w-6 h-6 opacity-70">
                  <Image src="/icons/email.svg" alt="Email" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <p className="text-gray-200">contact@shaktisabha.org</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-white mb-3">Social Media</h3>
                <div className="flex space-x-6">
                  {['facebook', 'twitter', 'instagram'].map((social) => (
                    <Link
                      key={social}
                      href={`https://${social}.com/shaktisabha`}
                      className="relative w-8 h-8 transform hover:scale-110 transition-transform duration-300"
                    >
                      <Image src={`/icons/${social}.svg`} alt={social} fill className="object-contain opacity-70 hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg 
              hover:shadow-2xl hover:bg-white/20 hover:scale-105
              transition-all duration-300 border border-white/10">
            <h2 className="text-2xl font-semibold mb-6 text-white hover:text-pink-300">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg 
                    bg-white/5 border border-white/10 
                    text-white placeholder-gray-400
                    focus:ring-2 focus:ring-pink-500 focus:border-transparent
                    transition duration-200 ease-in-out backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg 
                    bg-white/5 border border-white/10 
                    text-white placeholder-gray-400
                    focus:ring-2 focus:ring-pink-500 focus:border-transparent
                    transition duration-200 ease-in-out backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-200">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg 
                    bg-white/5 border border-white/10 
                    text-white placeholder-gray-400
                    focus:ring-2 focus:ring-pink-500 focus:border-transparent
                    transition duration-200 ease-in-out backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full px-4 py-3 rounded-lg 
                    bg-white/5 border border-white/10 
                    text-white placeholder-gray-400
                    focus:ring-2 focus:ring-pink-500 focus:border-transparent
                    transition duration-200 ease-in-out backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 
                    rounded-lg text-sm font-medium text-white
                    bg-gradient-to-r from-pink-500 to-purple-600
                    hover:from-pink-600 hover:to-purple-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
                    transform hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
