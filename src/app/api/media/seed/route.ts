import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';

export async function POST() {
  try {
    await connectDB();
    
    const totalItems = await Media.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'Media collection status',
      totalItems,
      note: 'Use admin panel to add media items'
    });
    
  } catch (error) {
    console.error('Error checking media status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check media status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 