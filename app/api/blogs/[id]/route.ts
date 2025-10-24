import { connectDB } from "@/lib/mongodb";
import Blog from "../../model/blog";
import { NextResponse } from "next/server";

// GET a single blog by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const id = params.id;

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

// UPDATE a blog
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const id = params.id;

  try {
    const body = await req.json();
    const { title, content, excerpt, author, image, tags, slug, published } = body;

    // Check if blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== blog.slug) {
      const existingBlog = await Blog.findOne({ slug });
      if (existingBlog && existingBlog._id.toString() !== id) {
        return NextResponse.json({ error: "Blog with this slug already exists" }, { status: 409 });
      }
    }

    // Update blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        excerpt,
        author,
        image,
        tags,
        slug,
        published
      },
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
  { params }: { params: { id: string } }
) {
  await connectDB();
  const id = params.id;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}