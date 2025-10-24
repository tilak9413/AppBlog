import { NextRequest, NextResponse } from 'next/server';

// Blog data (in a real app, this would come from a database)
const blogs = [
  {
    id: 1,
    title: "Agriculture Accounting: How Can Farmers Manage Finances Better?",
    category: "Industry Insights",
    date: "Oct 15, 2025",
    readingTime: "5 min read",
    imageUrl: "/blog1.png",
    author: "Dr. Sarah Johnson",
    authorRole: "Agricultural Finance Specialist",
    excerpt: "Learn how modern accounting practices can revolutionize farm financial management and boost profitability.",
    content: "Full article content here...",
    tags: ["Agriculture", "Accounting", "Farm Management", "Financial Planning"],
    published: true,
    createdAt: "2025-10-15T00:00:00Z",
    updatedAt: "2025-10-15T00:00:00Z"
  },
  {
    id: 2,
    title: "What Is Financial Reconciliation? A Complete Guide For CPA Firms",
    category: "CPA Strategy",
    date: "Sep 28, 2025",
    readingTime: "8 min read",
    imageUrl: "/blog2.png",
    author: "Michael Chen",
    authorRole: "CPA & Financial Consultant",
    excerpt: "A comprehensive guide to financial reconciliation processes that every CPA firm should master.",
    content: "Full article content here...",
    tags: ["CPA", "Reconciliation", "Financial Management", "Accounting"],
    published: true,
    createdAt: "2025-09-28T00:00:00Z",
    updatedAt: "2025-09-28T00:00:00Z"
  },
  {
    id: 3,
    title: "How Much Does A Bookkeeper Cost? Pricing Breakdown 2025",
    category: "Cost & Pricing",
    date: "Aug 10, 2025",
    readingTime: "4 min read",
    imageUrl: "/blog3.png",
    author: "Jennifer Martinez",
    authorRole: "Small Business Finance Expert",
    excerpt: "Complete breakdown of bookkeeping costs to help businesses budget for professional accounting services.",
    content: "Full article content here...",
    tags: ["Bookkeeping", "Pricing", "Small Business", "Cost Analysis"],
    published: true,
    createdAt: "2025-08-10T00:00:00Z",
    updatedAt: "2025-08-10T00:00:00Z"
  },
  {
    id: 4,
    title: "Top 5 Technologies Revolutionizing Modern Accounting Practice",
    category: "Technology",
    date: "Jul 20, 2025",
    readingTime: "7 min read",
    imageUrl: "/blog4.png",
    author: "David Kim",
    authorRole: "Technology Integration Specialist",
    excerpt: "Explore the cutting-edge technologies that are transforming the accounting profession.",
    content: "Full article content here...",
    tags: ["Technology", "AI", "Cloud Computing", "Automation"],
    published: true,
    createdAt: "2025-07-20T00:00:00Z",
    updatedAt: "2025-07-20T00:00:00Z"
  },
  {
    id: 5,
    title: "Understanding GAAP vs. IFRS: Which Standard Applies to You?",
    category: "Global Standards",
    date: "Jun 5, 2025",
    readingTime: "6 min read",
    imageUrl: "/blog5.png",
    author: "Dr. Robert Wilson",
    authorRole: "International Accounting Standards Expert",
    excerpt: "A comprehensive comparison of GAAP and IFRS accounting standards to help businesses choose the right framework.",
    content: "Full article content here...",
    tags: ["GAAP", "IFRS", "Accounting Standards", "International"],
    published: true,
    createdAt: "2025-06-05T00:00:00Z",
    updatedAt: "2025-06-05T00:00:00Z"
  },
  {
    id: 6,
    title: "The Essential Guide to Payroll Processing for Small Businesses",
    category: "Business Tips",
    date: "May 1, 2025",
    readingTime: "10 min read",
    imageUrl: "/blog6.png",
    author: "Lisa Thompson",
    authorRole: "Payroll and HR Specialist",
    excerpt: "Complete guide to payroll processing for small businesses, including compliance requirements and best practices.",
    content: "Full article content here...",
    tags: ["Payroll", "Small Business", "Compliance", "HR"],
    published: true,
    createdAt: "2025-05-01T00:00:00Z",
    updatedAt: "2025-05-01T00:00:00Z"
  }
];

// GET /api/blogs - Get all published blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredBlogs = blogs.filter(blog => blog.published);

    // Filter by category if provided
    if (category) {
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply pagination
    const paginatedBlogs = filteredBlogs.slice(offset, offset + limit);
    const total = filteredBlogs.length;

    return NextResponse.json({
      success: true,
      data: paginatedBlogs,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'category', 'author', 'excerpt', 'content'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new blog post
    const newBlog = {
      id: blogs.length + 1,
      title: body.title,
      category: body.category,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      readingTime: body.readingTime || "5 min read",
      imageUrl: body.imageUrl || "/blog-default.png",
      author: body.author,
      authorRole: body.authorRole || "Author",
      excerpt: body.excerpt,
      content: body.content,
      tags: body.tags || [],
      published: body.published || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real app, you would save to database here
    blogs.push(newBlog);

    return NextResponse.json({
      success: true,
      data: newBlog,
      message: 'Blog post created successfully'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
