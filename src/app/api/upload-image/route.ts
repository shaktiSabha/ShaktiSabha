import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryResult {
  secure_url: string;
  public_id: string;
}

export async function POST(request: NextRequest) {
  try {
    // Verify Cloudinary configuration
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary configuration');
      return NextResponse.json(
        { error: 'Server configuration error: Missing Cloudinary credentials' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'shakti-sabha-blogs';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    console.log(`Uploading file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise<CloudinaryResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: folder,
          transformation: folder === 'shakti-sabha-gallery' ? [
            { width: 1200, height: 800, crop: 'fill', quality: 'auto' }
          ] : undefined
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Upload successful:', result?.public_id);
            resolve(result as CloudinaryResult);
          }
        }
      );

      uploadStream.end(buffer);
    });

    return NextResponse.json({
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);

    // Provide more specific error messages
    let errorMessage = 'Failed to upload image';
    const errorDetails = error instanceof Error ? error.message : 'Unknown error';

    if (error instanceof Error && error.message) {
      errorMessage += `: ${error.message}`;
    }

    // Check for Cloudinary-specific error properties
    if (typeof error === 'object' && error !== null && 'http_code' in error) {
      errorMessage += ` (HTTP ${(error as { http_code: number }).http_code})`;
    }

    return NextResponse.json(
      { error: errorMessage, details: errorDetails },
      { status: 500 }
    );
  }
} 