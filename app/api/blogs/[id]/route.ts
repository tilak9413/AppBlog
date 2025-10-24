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
    content: `
      <h2>Introduction to Agricultural Accounting</h2>
      <p>Agricultural accounting is a specialized branch of accounting that focuses on the unique financial needs of farming operations. Unlike traditional businesses, farms face seasonal variations, weather dependencies, and commodity price fluctuations that require specialized accounting approaches.</p>
      
      <h3>Key Challenges in Farm Financial Management</h3>
      <p>Farmers often struggle with:</p>
      <ul>
        <li>Seasonal cash flow management</li>
        <li>Inventory valuation of crops and livestock</li>
        <li>Tax planning for agricultural income</li>
        <li>Risk management and insurance planning</li>
      </ul>
      
      <h3>Modern Solutions for Farm Accounting</h3>
      <p>Today's farmers have access to advanced accounting software and financial management tools that can help:</p>
      <ul>
        <li>Track crop yields and profitability by field</li>
        <li>Monitor livestock production costs</li>
        <li>Plan for equipment purchases and maintenance</li>
        <li>Optimize tax strategies</li>
      </ul>
      
      <h3>Best Practices for Farm Financial Management</h3>
      <p>Successful farm financial management requires:</p>
      <ol>
        <li>Regular financial record keeping</li>
        <li>Monthly profit and loss statements</li>
        <li>Annual balance sheet preparation</li>
        <li>Cash flow projections</li>
        <li>Regular consultation with agricultural accountants</li>
      </ol>
      
      <h3>Conclusion</h3>
      <p>Proper accounting practices are essential for farm success. By implementing modern accounting methods, farmers can make better financial decisions, improve profitability, and ensure long-term sustainability of their operations.</p>
    `,
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

// GET /api/blogs/[id] - Get a specific blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = parseInt(params.id);
    
    if (isNaN(blogId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const blog = blogs.find(b => b.id === blogId && b.published);
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = parseInt(params.id);
    
    if (isNaN(blogId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const blogIndex = blogs.findIndex(b => b.id === blogId);
    
    if (blogIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Update blog post
    const updatedBlog = {
      ...blogs[blogIndex],
      ...body,
      id: blogId, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    blogs[blogIndex] = updatedBlog;

    return NextResponse.json({
      success: true,
      data: updatedBlog,
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = parseInt(params.id);
    
    if (isNaN(blogId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const blogIndex = blogs.findIndex(b => b.id === blogId);
    
    if (blogIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Remove blog post
    blogs.splice(blogIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
