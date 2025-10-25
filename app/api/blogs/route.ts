import { connectDB } from "@/lib/mongodb";
import Blog from "../model/blog";
import { NextResponse } from "next/server";

// GET all blogs or a single blog by slug
export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit") ? parseInt(url.searchParams.get("limit")!) : 10;
  const page = url.searchParams.get("page") ? parseInt(url.searchParams.get("page")!) : 1;
  const tag = url.searchParams.get("tag");
  const slug = url.searchParams.get("slug");

  try {
    let query: any = { published: true };

    if (tag) query.tags = { $in: [tag] };
    
    if (slug) {
      const blog = await Blog.findOne({ slug });
      if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      return NextResponse.json(blog);
    }

    const skip = (page - 1) * limit;
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      blogs,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST new blog
export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const { title, content, excerpt, author, image, tags, slug, published } = body;

    if (!title || !content || !excerpt || !author || !slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json({ error: "Blog with this slug already exists" }, { status: 409 });
    }

    const blog = new Blog({
      title,
      content,
      excerpt,
      author,
      image: image || "",
      tags: tags || [],
      slug,
      published: published !== undefined ? published : true,
    });

    await blog.save();
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

// PUT update blog by slug
export async function PUT(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const { slug, ...updateData } = body;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required to update blog" }, { status: 400 });
    }

    const updatedBlog = await Blog.findOneAndUpdate({ slug }, updateData, {
      new: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE blog by slug
export async function DELETE(req: Request) {
  await connectDB();
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required to delete blog" }, { status: 400 });
    }

    const deletedBlog = await Blog.findOneAndDelete({ slug });

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
