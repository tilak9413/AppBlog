// app/api/services/route.ts
import { Service } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

// This is a mock database. In production, use a real database
let services: Service[] = [];

export async function GET() {
  try {
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newService: Service = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    services.push(newService);
    
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}