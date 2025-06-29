import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { sendContactConfirmationEmail } from '@/lib/emailService';

// GET - Fetch all contact submissions (for admin)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;
    
    // Build query
    const query: {
      status?: string;
      $or?: Array<{
        name?: { $regex: string; $options: string };
        email?: { $regex: string; $options: string };
        subject?: { $regex: string; $options: string };
      }>;
    } = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST - Create new contact submission
export async function POST(request: NextRequest) {
  console.log('📝 Contact form submission started');
  
  try {
    console.log('🔌 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected successfully');
    
    console.log('📄 Parsing request body...');
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    console.log('📊 Received data:', { name, email, subject, messageLength: message?.length });

    // Validation
    if (!name || !email || !subject || !message) {
      console.log('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format');
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    console.log('💾 Creating contact record...');
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });

    await contact.save();
    console.log('✅ Contact saved successfully with ID:', contact._id);

    // Send confirmation email to user (non-blocking)
    console.log('📧 Attempting to send confirmation email...');
    try {
      const emailSent = await sendContactConfirmationEmail(contact.email, contact.name, contact.subject);
      if (emailSent) {
        console.log('✅ Confirmation email sent successfully to:', contact.email);
      } else {
        console.log('⚠️ Confirmation email not sent (email service not configured)');
      }
    } catch (emailError) {
      console.error('❌ Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    console.log('🎉 Contact form submission completed successfully');
    return NextResponse.json(
      { message: 'Contact form submitted successfully', contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('💥 Error creating contact:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    );
  }
} 