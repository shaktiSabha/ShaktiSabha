import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { 
      name, 
      message, 
      memberSince, 
      status = 'draft'
    } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    const newTestimonial = new Testimonial({
      name,
      message,
      memberSince: memberSince || '2024',
      status,
      featured: false,
      category: 'Community'
    });

    const savedTestimonial = await newTestimonial.save();
    return NextResponse.json(savedTestimonial, { status: 201 });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
} 