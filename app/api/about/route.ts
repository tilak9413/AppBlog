import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import About from '../model/about';

// GET handler to retrieve about us data
export async function GET() {
  try {
    await connectDB();
    
    // Find the about us data (typically there's only one document)
    const aboutData = await About.findOne({}).sort({ updatedAt: -1 });
    
    if (!aboutData) {
      return NextResponse.json({ message: 'About us data not found' }, { status: 404 });
    }
    
    return NextResponse.json(aboutData);
  } catch (error) {
    console.error('Error fetching about us data:', error);
    return NextResponse.json({ message: 'Failed to fetch about us data' }, { status: 500 });
  }
}

// POST handler to create about us data
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    // Create new about us data
    const newAbout = new About(data);
    await newAbout.save();
    
    return NextResponse.json(newAbout, { status: 201 });
  } catch (error) {
    console.error('Error creating about us data:', error);
    return NextResponse.json({ message: 'Failed to create about us data' }, { status: 500 });
  }
}

// PUT handler to update about us data
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    // Find and update the about us data
    const aboutData = await About.findOneAndUpdate({}, data, { 
      new: true,
      runValidators: true
    });
    
    if (!aboutData) {
      // If no document exists, create one
      const newAbout = new About(data);
      await newAbout.save();
      return NextResponse.json(newAbout, { status: 201 });
    }
    
    return NextResponse.json(aboutData);
  } catch (error) {
    console.error('Error updating about us data:', error);
    return NextResponse.json({ message: 'Failed to update about us data' }, { status: 500 });
  }
}

// DELETE handler to delete about us data
export async function DELETE() {
  try {
    await connectToDatabase();
    
    // Find and delete the about us data
    const deletedAbout = await About.findOneAndDelete({});
    
    if (!deletedAbout) {
      return NextResponse.json({ message: 'About us data not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'About us data deleted successfully' });
  } catch (error) {
    console.error('Error deleting about us data:', error);
    return NextResponse.json({ message: 'Failed to delete about us data' }, { status: 500 });
  }
}

function connectToDatabase() {
  throw new Error('Function not implemented.');
}
