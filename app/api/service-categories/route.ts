// app/api/service-categories/route.ts
import { ServiceCategory } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

// Mock database
let categories: ServiceCategory[] = [];

export async function GET() {
  try {
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newCategory: ServiceCategory = {
      ...body,
      id: Date.now().toString(),
      services: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    categories.push(newCategory);
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const index = categories.findIndex(c => c.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    categories[index] = {
      ...categories[index],
      ...body,
      updatedAt: new Date(),
    };
    
    return NextResponse.json(categories[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const index = categories.findIndex(c => c.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    categories.splice(index, 1);
    
    return NextResponse.json(
      { message: 'Category deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}