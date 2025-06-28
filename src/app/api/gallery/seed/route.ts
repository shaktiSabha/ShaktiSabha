import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

const sampleGalleryData = [
  {
    title: 'Women Empowerment Workshop',
    description: 'A powerful session on building confidence and leadership skills for women in our community. Participants learned essential techniques for personal and professional growth.',
    imageUrl: '/banner1.jpg',
    imagePublicId: 'shakti-sabha-gallery/workshop-1',
    category: 'Workshops',
    alt: 'Women participating in empowerment workshop',
    status: 'published',
    featured: true,
    views: 245
  },
  {
    title: 'Self Defense Training Session',
    description: 'Learning essential self-defense techniques to ensure personal safety and build confidence. Expert trainers guided participants through practical exercises.',
    imageUrl: '/banner2.jpg',
    imagePublicId: 'shakti-sabha-gallery/training-1',
    category: 'Training',
    alt: 'Self defense training session',
    status: 'published',
    featured: false,
    views: 189
  },
  {
    title: 'Community Gathering 2024',
    description: 'Our annual community meeting where women share experiences and support each other. A platform for networking and mutual empowerment.',
    imageUrl: '/banner3.jpg',
    imagePublicId: 'shakti-sabha-gallery/community-1',
    category: 'Community',
    alt: 'Women community gathering',
    status: 'published',
    featured: true,
    views: 312
  },
  {
    title: 'Leadership Conference',
    description: 'Inspiring talks and workshops focused on developing leadership qualities among women. Industry experts shared valuable insights and strategies.',
    imageUrl: '/banner4.jpg',
    imagePublicId: 'shakti-sabha-gallery/conference-1',
    category: 'Conferences',
    alt: 'Women leadership conference',
    status: 'published',
    featured: false,
    views: 198
  },
  {
    title: 'Health & Wellness Event',
    description: 'Promoting physical and mental health awareness through interactive sessions and activities. Focus on holistic wellbeing for women.',
    imageUrl: '/banner5.jpg',
    imagePublicId: 'shakti-sabha-gallery/event-1',
    category: 'Events',
    alt: 'Health and wellness event',
    status: 'published',
    featured: false,
    views: 156
  },
  {
    title: 'Skill Development Workshop',
    description: 'Hands-on training sessions to develop professional and personal skills. Covering digital literacy, communication, and entrepreneurship.',
    imageUrl: '/banner6.jpg',
    imagePublicId: 'shakti-sabha-gallery/workshop-2',
    category: 'Workshops',
    alt: 'Skill development workshop',
    status: 'published',
    featured: false,
    views: 134
  }
];

export async function POST() {
  try {
    await connectDB();
    
    // Check if gallery data already exists
    const existingItems = await Gallery.countDocuments();
    
    if (existingItems > 0) {
      return NextResponse.json({
        success: false,
        message: `Gallery already has ${existingItems} items. Cannot seed when data exists.`,
        existingCount: existingItems
      });
    }
    
    // Insert sample data
    const insertedItems = await Gallery.insertMany(sampleGalleryData);
    
    return NextResponse.json({
      success: true,
      message: 'Gallery seeded successfully with sample data!',
      insertedCount: insertedItems.length,
      data: insertedItems
    });
    
  } catch (error) {
    console.error('Error seeding gallery:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed gallery',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 