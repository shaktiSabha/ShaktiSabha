import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const media = await Media.findById(id);
    
    if (!media) {
      return NextResponse.json(
        { success: false, error: 'Media item not found' },
        { status: 404 }
      );
    }
    
    // Increment view count
    media.views += 1;
    await media.save();
    
    return NextResponse.json({
      success: true,
      data: media
    });
  } catch (error) {
    console.error('Error fetching media item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch media item' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const body = await request.json();
    const { title, description, embedUrl, category, status, featured, thumbnailUrl, duration } = body;
    
    const media = await Media.findById(id);
    
    if (!media) {
      return NextResponse.json(
        { success: false, error: 'Media item not found' },
        { status: 404 }
      );
    }
    
    // Update media item
    media.title = title || media.title;
    media.description = description !== undefined ? description : media.description;
    media.embedUrl = embedUrl || media.embedUrl;
    media.category = category || media.category;
    media.status = status || media.status;
    media.featured = featured !== undefined ? featured : media.featured;
    media.thumbnailUrl = thumbnailUrl !== undefined ? thumbnailUrl : media.thumbnailUrl;
    media.duration = duration !== undefined ? duration : media.duration;
    
    await media.save();
    
    return NextResponse.json({
      success: true,
      data: media,
      message: 'Media item updated successfully'
    });
  } catch (error) {
    console.error('Error updating media item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update media item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const media = await Media.findById(id);
    
    if (!media) {
      return NextResponse.json(
        { success: false, error: 'Media item not found' },
        { status: 404 }
      );
    }
    
    // Delete media item from database
    await Media.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Media item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting media item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete media item' },
      { status: 500 }
    );
  }
} 