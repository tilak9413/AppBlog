import { NextRequest, NextResponse } from 'next/server';

interface ServiceInquiry {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  serviceId: number;
  serviceName: string;
  message: string;
  budget?: string;
  timeline?: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  submittedAt: string;
  contactedAt?: string;
}

// Service inquiries (in a real app, this would be a database)
let inquiries: ServiceInquiry[] = [];

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

// POST /api/service-inquiry - Submit service inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'serviceId', 'message'];
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

    // Create new service inquiry
    const newInquiry: ServiceInquiry = {
      id: Date.now(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      companyName: body.companyName,
      serviceId: body.serviceId,
      serviceName: body.serviceName || 'Unknown Service',
      message: body.message,
      budget: body.budget,
      timeline: body.timeline,
      status: 'new',
      submittedAt: new Date().toISOString()
    };

    // In a real app, you would:
    // 1. Save to database
    // 2. Send email notification to sales team
    // 3. Send confirmation email to customer
    // 4. Add to CRM system

    inquiries.push(newInquiry);

    console.log('Service inquiry submitted:', newInquiry);

    return NextResponse.json({
      success: true,
      data: {
        id: newInquiry.id,
        message: 'Thank you for your inquiry! Our team will contact you within 24 hours to discuss your requirements.'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Service inquiry error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit service inquiry' },
      { status: 500 }
    );
  }
}

// GET /api/service-inquiry - Get service inquiries (admin only)
export async function GET(request: NextRequest) {
  try {
    // In a real app, you would check for admin authentication here
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status') || 'all';

    let filteredInquiries = inquiries;
    
    if (status !== 'all') {
      filteredInquiries = inquiries.filter(inquiry => inquiry.status === status);
    }

    // Sort by submission date (newest first)
    filteredInquiries.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    const paginatedInquiries = filteredInquiries.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedInquiries,
      pagination: {
        total: filteredInquiries.length,
        limit,
        offset,
        hasMore: offset + limit < filteredInquiries.length
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch service inquiries' },
      { status: 500 }
    );
  }
}
