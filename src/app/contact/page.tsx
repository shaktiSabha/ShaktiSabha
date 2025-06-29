"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Poppins } from "next/font/google";
import { ContactFormData } from "@/types/contact";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen py-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-yellow-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in space-y-6">
            {/* Success Icon */}
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className={`${poppins.className} text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-6`}>
              Message Sent!
            </h1>
            <p className={`${poppins.className} text-2xl md:text-3xl font-light text-white/90 mb-8 max-w-2xl mx-auto`}>
              Thank you for reaching out to us. We&apos;ve received your message and will get back to you within 24 hours.
            </p>
            <div className="space-y-4">
              <p className="text-lg text-white/70">
                ✅ Your message has been saved successfully!
              </p>
              <p className="text-sm text-white/60">
                We will review your message and get back to you within 24 hours.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 text-lg font-medium rounded-full transform transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-yellow-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className={`${poppins.className} text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-6`}>
            Get in Touch
          </h1>
          <p className={`${poppins.className} text-2xl md:text-3xl font-light text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Ready to start your empowerment journey? We&apos;re here to support you every step of the way.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Contact */}
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 className={`${poppins.className} text-xl font-semibold text-white`}>Email Us</h3>
                  <p className="text-white/70">contact@shaktisabha.com</p>
                  <p className="text-sm text-white/50">We respond within 24 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h8z"></path>
                    </svg>
                  </div>
                  <h3 className={`${poppins.className} text-xl font-semibold text-white`}>Follow Us</h3>
                  <div className="flex justify-center space-x-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                      <span className="text-white text-sm">FB</span>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                      <span className="text-white text-sm">IG</span>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                      <span className="text-white text-sm">TW</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className={`${poppins.className} text-xl font-semibold text-white`}>Support Hours</h3>
                  <div className="text-white/70 space-y-1">
                    <p>Monday - Friday: 9 AM - 6 PM</p>
                    <p>Saturday: 10 AM - 4 PM</p>
                    <p className="text-sm text-white/50">IST (Indian Standard Time)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:shadow-2xl transition-all duration-500">
              <CardHeader className="pb-8 text-center">
                <CardTitle className={`${poppins.className} text-4xl font-bold bg-gradient-to-r from-red-400 to-yellow-500 bg-clip-text text-transparent`}>
                  Send us a Message
                </CardTitle>
                <p className="text-white/70 mt-4">
                  Fill out the form below and we&apos;ll get back to you as soon as possible
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-xl backdrop-blur-sm animate-shake">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-red-300 text-sm">{error}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className={`${poppins.className} text-sm font-medium text-white/90`}>
                        Full name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12
                          focus:border-red-400/60 focus:ring-red-400/20 hover:bg-white/10 transition-all duration-300 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className={`${poppins.className} text-sm font-medium text-white/90`}>
                        Email address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12
                          focus:border-red-400/60 focus:ring-red-400/20 hover:bg-white/10 transition-all duration-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className={`${poppins.className} text-sm font-medium text-white/90`}>
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12
                        focus:border-red-400/60 focus:ring-red-400/20 hover:bg-white/10 transition-all duration-300 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className={`${poppins.className} text-sm font-medium text-white/90`}>
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[140px]
                        focus:border-red-400/60 focus:ring-red-400/20 hover:bg-white/10 transition-all duration-300 rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${poppins.className} w-full h-14 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                      text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] 
                      hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                      shadow-xl hover:shadow-red-500/25`}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                          </svg>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                          </svg>
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className={`${poppins.className} text-3xl md:text-4xl font-bold text-white mb-8`}>
              Why Choose Shakti Sabha?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">💪</span>
                </div>
                <h3 className={`${poppins.className} text-xl font-semibold text-white`}>Empowerment Focus</h3>
                <p className="text-white/70">Dedicated to empowering women through education and support</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className={`${poppins.className} text-xl font-semibold text-white`}>Community Support</h3>
                <p className="text-white/70">Join a supportive community of like-minded individuals</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">🌟</span>
                </div>
                <h3 className={`${poppins.className} text-xl font-semibold text-white`}>Expert Guidance</h3>
                <p className="text-white/70">Get guidance from experienced professionals and mentors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
