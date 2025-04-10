"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

const ContactPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add form submission logic here
  }

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
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400
                      focus:border-red-500/50 hover:bg-white/10"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400
                      focus:border-red-500/50 hover:bg-white/10"
                  />
                </div>
              </div>

              <Input
                placeholder="Subject"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400
                  focus:border-red-500/50 hover:bg-white/10"
              />

              <Textarea
                placeholder="Your message"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400
                  focus:border-red-500/50 hover:bg-white/10 min-h-[150px]"
              />

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
  )
}

export default ContactPage
