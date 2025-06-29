import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

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
    
    let galleryQuery = Gallery.find(query).sort({ createdAt: -1 });
    
    if (limit > 0) {
      galleryQuery = galleryQuery.limit(limit);
    }
    
    const galleries = await galleryQuery.exec();
    
    return NextResponse.json({
      success: true,
      data: galleries,
      count: galleries.length
    });
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch galleries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { title, description, imageUrl, imagePublicId, category, alt, status, featured } = body;
    
    // Validation
    if (!title || !description || !imageUrl || !imagePublicId || !category || !alt) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const gallery = new Gallery({
      title,
      description,
      imageUrl,
      imagePublicId,
      category,
      alt,
      status: status || 'draft',
      featured: featured || false
    });
    
    await gallery.save();
    
    return NextResponse.json({
      success: true,
      data: gallery,
      message: 'Gallery item created successfully'
    });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create gallery item' },
      { status: 500 }
    );
  }
} 