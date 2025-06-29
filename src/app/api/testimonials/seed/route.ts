import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

const sampleTestimonialData = [
  {
    name: 'Suman Verma',
    message: 'A wonderful community that promotes spiritual growth and inner peace through authentic teachings.',
    memberSince: '2019',
    status: 'published',
    featured: false,
    category: 'Community'
  },
  {
    name: 'Priya Sharma',
    message: 'Shakti Sabha ने मेरे जीवन में बहुत बड़ा बदलाव लाया है। यहाँ से मुझे आत्मविश्वास मिला है।',
    memberSince: '2020',
    status: 'published',
    featured: true,
    category: 'Community'
  },
  {
    name: 'Sunita Devi',
    message: 'यहाँ के workshops में भाग लेकर मैंने अपने अंदर की शक्ति को पहचाना है।',
    memberSince: '2021',
    status: 'published',
    featured: false,
    category: 'Workshop'
  },
  {
    name: 'Anita Verma',
    message: 'Counseling sessions ने मेरी life को बेहतर बनाया है। मैंने यहाँ से बहुत कुछ सीखा है।',
    memberSince: '2022',
    status: 'published',
    featured: false,
    category: 'Counseling'
  },
  {
    name: 'Rekha Kumari',
    message: 'Community support ने मुझे बहुत confident बनाया है। अब मैं stronger feel करती हूँ।',
    memberSince: '2023',
    status: 'published',
    featured: true,
    category: 'Community'
  },
  {
    name: 'Kavita Gupta',
    message: 'Shakti Sabha की guidance ने मेरे personal growth में बहुत help की है।',
    memberSince: '2021',
    status: 'published',
    featured: false,
    category: 'Other'
  }
];

export async function POST() {
  try {
    await connectDB();
    
    // Clear existing testimonials
    await Testimonial.deleteMany({});
    
    // Insert sample data
    const testimonials = await Testimonial.insertMany(sampleTestimonialData);
    
    return NextResponse.json({
      message: 'Testimonials seeded successfully',
      count: testimonials.length,
      testimonials
    });
  } catch (error) {
    console.error('Seed testimonials error:', error);
    return NextResponse.json(
      { error: 'Failed to seed testimonials' },
      { status: 500 }
    );
  }
} 