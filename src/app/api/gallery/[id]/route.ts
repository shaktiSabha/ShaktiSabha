import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const gallery = await Gallery.findById(id);
    
    if (!gallery) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    // Increment view count
    gallery.views += 1;
    await gallery.save();
    
    return NextResponse.json({
      success: true,
      data: gallery
    });
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery item' },
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
    const { title, description, imageUrl, imagePublicId, category, alt, status, featured } = body;
    
    const gallery = await Gallery.findById(id);
    
    if (!gallery) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    // If image is being changed, delete old image from Cloudinary
    if (imagePublicId && gallery.imagePublicId !== imagePublicId) {
      try {
        await cloudinary.uploader.destroy(gallery.imagePublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting old image from Cloudinary:', cloudinaryError);
      }
    }
    
    // Update gallery item
    gallery.title = title || gallery.title;
    gallery.description = description || gallery.description;
    gallery.imageUrl = imageUrl || gallery.imageUrl;
    gallery.imagePublicId = imagePublicId || gallery.imagePublicId;
    gallery.category = category || gallery.category;
    gallery.alt = alt || gallery.alt;
    gallery.status = status || gallery.status;
    gallery.featured = featured !== undefined ? featured : gallery.featured;
    
    await gallery.save();
    
    return NextResponse.json({
      success: true,
      data: gallery,
      message: 'Gallery item updated successfully'
    });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update gallery item' },
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
    const gallery = await Gallery.findById(id);
    
    if (!gallery) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    // Delete image from Cloudinary
    try {
      await cloudinary.uploader.destroy(gallery.imagePublicId);
    } catch (cloudinaryError) {
      console.error('Error deleting image from Cloudinary:', cloudinaryError);
    }
    
    // Delete gallery item from database
    await Gallery.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
} 