import { NextRequest, NextResponse } from 'next/server';

// Contact form validation schema
interface ContactFormData {
  firstName: string;
  lastName: string;
  companyName?: string;
  companyWebsite?: string;
  email: string;
  phone: string;
  message: string;
  privacyPolicy: boolean;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone format
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[0-9\s-()+\.]{7,15}$/;
  return phoneRegex.test(phone);
}

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'message', 'privacyPolicy'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!isValidPhone(body.phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Validate privacy policy acceptance
    if (!body.privacyPolicy) {
      return NextResponse.json(
        { success: false, error: 'Privacy policy must be accepted' },
        { status: 400 }
      );
    }

    // In a real app, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user
    // 4. Add to CRM system

    const contactSubmission = {
      id: Date.now(),
      ...body,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    // Simulate saving to database
    console.log('Contact form submission:', contactSubmission);

    return NextResponse.json({
      success: true,
      data: {
        id: contactSubmission.id,
        message: 'Thank you for your message! We will get back to you within 24 hours.'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

// GET /api/contact - Get contact form submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    // In a real app, you would check for admin authentication here
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Simulate fetching from database
    const submissions = []; // This would come from your database

    return NextResponse.json({
      success: true,
      data: submissions,
      pagination: {
        total: submissions.length,
        limit,
        offset,
        hasMore: offset + limit < submissions.length
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}
