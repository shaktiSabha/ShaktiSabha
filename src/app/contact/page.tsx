"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user starts typing
  };

  const validateForm = () => {
    const newErrors: typeof errors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Form submitted successfully:', formData);
          alert('Thank you for contacting us! We will get back to you soon.');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        } else {
          console.error('Failed to submit the form');
          alert('Something went wrong. Please try again later.');
        }
      } catch (error) {
        console.error('Error submitting the form:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-red-500 mb-6 animate-fade-in">
            Get in Touch
          </h1>
          <h2 className={`${poppins.className} text-3xl md:text-4xl font-bold text-red-400 mb-6`}>
            We&apos;re Here to Help
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
            Have questions or need support? Reach out to us anytime.
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-[var(--yellow-primary)]/20 max-w-xl mx-auto">
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-semibold text-red-300 text-center">
              Contact Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400
                      focus:border-red-500/50 hover:bg-white/10"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400
                      focus:border-red-500/50 hover:bg-white/10"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400
                  focus:border-red-500/50 hover:bg-white/10"
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400
                  focus:border-red-500/50 hover:bg-white/10 min-h-[150px]"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}

              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white
                  transition-all duration-300 transform hover:-translate-y-1"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ContactPage;
