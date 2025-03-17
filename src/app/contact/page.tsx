"use client"
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
    // Handle form submission logic here
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">Get in touch with us for any queries or suggestions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="relative w-6 h-6">
                  <Image
                    src="/icons/location.svg"
                    alt="Location"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Address</h3>
                  <p className="text-gray-600">123 Shakti Sabha Street, City, State, PIN</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="relative w-6 h-6">
                  <Image
                    src="/icons/phone.svg"
                    alt="Phone"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                  <p className="text-gray-600">+91 1234567890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="relative w-6 h-6">
                  <Image
                    src="/icons/email.svg"
                    alt="Email"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Email</h3>
                  <p className="text-gray-600">contact@shaktisabha.org</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Social Media</h3>
                <div className="flex space-x-6">
                  {['facebook', 'twitter', 'instagram'].map((social) => (
                    <Link
                      key={social}
                      href={`https://${social}.com/shaktisabha`}
                      className="relative w-8 h-8 transform hover:scale-110 transition-transform duration-300"
                    >
                      <Image
                        src={`/icons/${social}.svg`}
                        alt={social}
                        fill
                        className="object-contain"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-800 
                  bg-white text-gray-700 text-base
                  focus:outline-none focus:ring-2 focus:ring-gay-800 focus:border-transparent
                  transition duration-200 ease-in-out
                  placeholder-gray-800
                  shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 
                  bg-white text-gray-700 text-base
                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent
                  transition duration-200 ease-in-out
                  placeholder-gray-400
                  shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 
                  bg-white text-gray-700 text-base
                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent
                  transition duration-200 ease-in-out
                  placeholder-gray-400
                  shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="border mt-1 block w-full rounded-md border-gray-800 shadow-sm focus:border-gray-800 focus:ring-gray-800"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-gray-600 to-gray-600 hover:from-gray-700 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-300"
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
