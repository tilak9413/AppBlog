import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { caseStudyschema } from "../model/casestudy";


// Get the case study blog 
export async function GET() {
  await connectDB();

  try {
const studies = await caseStudyschema.find().sort({ createdAt: -1 });
    if (!studies) return NextResponse.json({ error: "No hero found" }, { status: 404 });
    return NextResponse.json(studies);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch hero data" }, { status: 500 });
  }
}

// POST new blog
export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const { title, content } = body;
    if (!title ||!content ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const blog = new caseStudyschema({title,content});
    await blog.save();
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to case Study blog" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { id, title, content } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const blog = await caseStudyschema.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 });
    }

    const updatedBlog = await caseStudyschema.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    return NextResponse.json({
      message: "Case study updated successfully",
      data: updatedBlog,
    });
  } catch (error: any) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update case study", details: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 }
      );
    }

    const deletedBlog = await caseStudyschema.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog deleted successfully", deletedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}