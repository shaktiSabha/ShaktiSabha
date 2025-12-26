import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, excerpt, content, imageUrl, status = 'draft' } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, excerpt, and content are required' },
        { status: 400 }
      );
    }

    const newBlog = new Blog({
      title,
      excerpt,
      content,
      imageUrl: imageUrl || '/placeholder-blog.svg',
      author: 'Admin User',
      status
    });

    const savedBlog = await newBlog.save();
    return NextResponse.json(savedBlog, { status: 201 });
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
} 