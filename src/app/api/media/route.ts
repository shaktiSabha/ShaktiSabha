import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '0');
    
    // Build query
    const query: Record<string, string | boolean> = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (status && status !== 'all') {
      query.status = status;
    } else if (!status) {
      // For public API, only show published by default when no status is specified
      query.status = 'published';
    }
    // If status is 'all', don't add status filter to show all items
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    let mediaQuery = Media.find(query).sort({ createdAt: -1 });
    
    if (limit > 0) {
      mediaQuery = mediaQuery.limit(limit);
    }
    
    const mediaItems = await mediaQuery.exec();
    
    return NextResponse.json({
      success: true,
      data: mediaItems,
      count: mediaItems.length
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { title, description, embedUrl, category, status, featured, thumbnailUrl, duration } = body;
    
    // Validation
    if (!title || !embedUrl || !category) {
      return NextResponse.json(
        { success: false, error: 'Title, embed URL, and category are required' },
        { status: 400 }
      );
    }
    
    const media = new Media({
      title,
      description: description || '',
      embedUrl,
      category,
      status: status || 'draft',
      featured: featured || false,
      thumbnailUrl: thumbnailUrl || '',
      duration: duration || ''
    });
    
    await media.save();
    
    return NextResponse.json({
      success: true,
      data: media,
      message: 'Media item created successfully'
    });
  } catch (error) {
    console.error('Error creating media item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create media item' },
      { status: 500 }
    );
  }
} 