import { NextRequest, NextResponse } from 'next/server';

interface NewsletterSubscription {
  id: number;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  preferences?: {
    categories: string[];
    frequency: 'daily' | 'weekly' | 'monthly';
  };
}

// Newsletter subscribers (in a real app, this would be a database)
let subscribers: NewsletterSubscription[] = [];

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, preferences } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email === email);
    
    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json(
          { success: false, error: 'Email is already subscribed' },
          { status: 409 }
        );
      } else {
        // Reactivate subscription
        existingSubscriber.status = 'active';
        existingSubscriber.subscribedAt = new Date().toISOString();
        if (preferences) {
          existingSubscriber.preferences = preferences;
        }
        
        return NextResponse.json({
          success: true,
          data: existingSubscriber,
          message: 'Successfully resubscribed to newsletter'
        });
      }
    }

    // Create new subscription
    const newSubscription: NewsletterSubscription = {
      id: Date.now(),
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active',
      preferences: preferences || {
        categories: ['all'],
        frequency: 'weekly'
      }
    };

    subscribers.push(newSubscription);

    // In a real app, you would:
    // 1. Save to database
    // 2. Send welcome email
    // 3. Add to email marketing service

    return NextResponse.json({
      success: true,
      data: newSubscription,
      message: 'Successfully subscribed to newsletter'
    }, { status: 201 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

// DELETE /api/newsletter - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const subscriberIndex = subscribers.findIndex(sub => sub.email === email);
    
    if (subscriberIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Email not found in newsletter subscriptions' },
        { status: 404 }
      );
    }

    // Mark as unsubscribed
    subscribers[subscriberIndex].status = 'unsubscribed';

    // In a real app, you would:
    // 1. Update database
    // 2. Send confirmation email
    // 3. Remove from email marketing service

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    );
  }
}

// GET /api/newsletter - Get newsletter subscribers (admin only)
export async function GET(request: NextRequest) {
  try {
    // In a real app, you would check for admin authentication here
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status') || 'active';

    let filteredSubscribers = subscribers;
    
    if (status !== 'all') {
      filteredSubscribers = subscribers.filter(sub => sub.status === status);
    }

    const paginatedSubscribers = filteredSubscribers.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedSubscribers,
      pagination: {
        total: filteredSubscribers.length,
        limit,
        offset,
        hasMore: offset + limit < filteredSubscribers.length
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch newsletter subscribers' },
      { status: 500 }
    );
  }
}
