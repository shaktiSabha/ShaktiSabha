"use client";
import React, { useState, useEffect } from 'react';
import { Quote, Calendar, Award } from 'lucide-react';
import { Testimonial } from '@/types/testimonial';

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch('/api/testimonials');
            if (!response.ok) {
                throw new Error('Failed to fetch testimonials');
            }
            const data = await response.json();
            // Filter only published testimonials for public view
            const publishedTestimonials = data.filter((testimonial: Testimonial) => testimonial.status === 'published');
            setTestimonials(publishedTestimonials);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load testimonials');
        } finally {
            setLoading(false);
        }
    };

    // Separate featured and regular testimonials
    const featuredTestimonials = testimonials.filter(t => t.featured);
    const regularTestimonials = testimonials.filter(t => !t.featured);

    if (loading) {
        return (
            <div className="py-16">
                <div className="container mx-auto px-4 mt-6">
                    <h2 className="text-4xl font-bold text-center mb-16 text-red-400">What Our Members Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:pr-40 lg:pl-40">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="backdrop-blur-xl p-6 rounded-lg shadow-md animate-pulse">
                                <div className="h-4 bg-gray-600 rounded mb-4"></div>
                                <div className="h-4 bg-gray-600 rounded mb-4"></div>
                                <div className="h-4 bg-gray-600 rounded mb-4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-16">
                <div className="container mx-auto px-4 mt-6 text-center">
                    <h2 className="text-4xl font-bold mb-8 text-red-400">What Our Members Say</h2>
                    <p className="text-red-300">Error loading testimonials: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-16">
            <div className="container mx-auto px-4 mt-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-red-400">What Our Members Say</h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Hear from our community members about their transformative experiences with Shakti Sabha
                    </p>
                </div>

                {/* Featured Testimonials */}
                {featuredTestimonials.length > 0 && (
                    <div className="mb-16">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-semibold text-white flex items-center justify-center gap-2">
                                <Award className="h-6 w-6 text-yellow-400" />
                                Featured Stories
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:pr-40 lg:pl-40">
                            {featuredTestimonials.map((testimonial) => (
                                <div 
                                    key={testimonial._id} 
                                    className="backdrop-blur-xl bg-gradient-to-br from-red-900/20 to-purple-900/20 p-8 rounded-xl shadow-xl border border-red-500/20 hover:border-red-400/40 transition-all duration-300 transform hover:scale-105"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <Quote className="h-8 w-8 text-red-400 opacity-60" />
                                    </div>
                                    <p className="text-white italic mb-6 text-lg leading-relaxed">
                                        &quot;{testimonial.message}&quot;
                                    </p>
                                    
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                                        </div>
                                        <div className="text-right">
                                            <span className="flex items-center text-gray-300 text-sm">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                Member since {testimonial.memberSince}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Regular Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:pr-40 lg:pl-40">
                    {regularTestimonials.map((testimonial) => (
                        <div 
                            key={testimonial._id} 
                            className="backdrop-blur-xl bg-white/5 p-6 rounded-lg shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <Quote className="h-6 w-6 text-red-400 opacity-50" />
                            </div>
                            <p className="text-white italic mb-4 leading-relaxed">
                                &quot;{testimonial.message}&quot;
                            </p>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                </div>
                                <div className="text-right">
                                    <span className="flex items-center text-gray-300 text-sm">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        Member since {testimonial.memberSince}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {testimonials.length === 0 && (
                    <div className="text-center py-16">
                        <Quote className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No testimonials available</h3>
                        <p className="text-gray-400">Check back soon for member stories</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestimonialsPage;
