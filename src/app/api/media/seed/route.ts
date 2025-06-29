import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';

const sampleMediaData = [
  {
    title: 'Podcast with Acharya Sukama Ji',
    description: 'An insightful conversation with Acharya Sukama Ji about spiritual empowerment and women\'s rights in ancient texts.',
    embedUrl: 'https://www.youtube.com/embed/XGWKRKWcpZE',
    category: 'Podcast',
    status: 'published',
    featured: true,
    views: 1250
  },
  {
    title: 'Interview with Vandana Sharma Ji',
    description: 'A powerful interview discussing women\'s leadership and empowerment in modern society.',
    embedUrl: 'https://www.youtube.com/embed/fJEC5Mao3Es',
    category: 'Interview',
    status: 'published',
    featured: false,
    views: 890
  },
  {
    title: 'World Record Holder - Pratibha Thakkadpally',
    description: 'Celebrating achievements and breaking barriers - an inspiring story of determination and success.',
    embedUrl: 'https://www.youtube.com/embed/W43AsPI-UzY',
    category: 'Interview',
    status: 'published',
    featured: true,
    views: 2150
  },
  {
    title: 'Conspiracy Investigation',
    description: 'Uncovering truth and debunking myths - a deep dive into conspiracy theories affecting women.',
    embedUrl: 'https://www.youtube.com/embed/Cfa09zSU2AQ',
    category: 'Documentary',
    status: 'published',
    featured: false,
    views: 756
  },
  {
    title: 'Menstruation Myths Debunked',
    description: 'Breaking taboos and spreading awareness about menstrual health and hygiene.',
    embedUrl: 'https://www.youtube.com/embed/8Ql8VHkmGtM',
    category: 'Discussion',
    status: 'published',
    featured: true,
    views: 3200
  },
  {
    title: 'Women Rights in Vedas',
    description: 'Exploring ancient texts and discovering the true position of women in Vedic literature.',
    embedUrl: 'https://www.youtube.com/embed/UZGvzO1I1e8',
    category: 'Documentary',
    status: 'published',
    featured: false,
    views: 1800
  },
  {
    title: 'Women of Ramayana',
    description: 'Understanding the powerful female characters in Ramayana and their relevance today.',
    embedUrl: 'https://www.youtube.com/embed/XtNJeIX8hgM',
    category: 'Documentary',
    status: 'published',
    featured: false,
    views: 1600
  }
];

export async function POST() {
  try {
    await connectDB();
    
    // Check if media data already exists
    const existingItems = await Media.countDocuments();
    
    if (existingItems > 0) {
      return NextResponse.json({
        success: false,
        message: `Media collection already has ${existingItems} items. Cannot seed when data exists.`,
        existingCount: existingItems
      });
    }
    
    // Insert sample data
    const insertedItems = await Media.insertMany(sampleMediaData);
    
    return NextResponse.json({
      success: true,
      message: 'Media collection seeded successfully with sample data!',
      insertedCount: insertedItems.length,
      data: insertedItems
    });
    
  } catch (error) {
    console.error('Error seeding media:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed media',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 