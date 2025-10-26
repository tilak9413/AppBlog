import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Blog from "../../model/blog";

// GET a single blog
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  // Unwrap params
  const { id } = await params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PATCH a blog
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  try {
    const body = await req.json();
    const { title, content, excerpt, author, image, tags, slug, published } = body;

    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    if (slug && slug !== blog.slug) {
      const existingBlog = await Blog.findOne({ slug });
      if (existingBlog && existingBlog._id.toString() !== id) {
        return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, excerpt, author, image, tags, slug, published },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE a blog
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
