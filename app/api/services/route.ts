import { NextRequest, NextResponse } from 'next/server';

// Services data
const services = [
  {
    id: 1,
    name: "Accounting Outsourcing Services",
    description: "CPAs' Go-to firm for all accounting needs.",
    icon: "🏦",
    category: "Business Owners",
    features: [
      "Complete bookkeeping services",
      "Financial statement preparation",
      "Tax preparation and planning",
      "Payroll processing",
      "Accounts payable and receivable management"
    ],
    pricing: {
      starting: "$500/month",
      type: "monthly"
    },
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Outsourced Tax Preparation",
    description: "Keep Your Busy Tax Preparers on Support.",
    icon: "🧾",
    category: "Business Owners",
    features: [
      "Individual tax returns",
      "Business tax returns",
      "Tax planning and strategy",
      "IRS correspondence handling",
      "Audit support"
    ],
    pricing: {
      starting: "$200/return",
      type: "per_return"
    },
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Accounting Software Consulting",
    description: "Helping CPAs use their ideal accounting software.",
    icon: "💻",
    category: "Business Owners",
    features: [
      "Software selection and setup",
      "Data migration services",
      "Training and support",
      "Custom reporting setup",
      "Integration services"
    ],
    pricing: {
      starting: "$150/hour",
      type: "hourly"
    },
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Virtual CFO",
    description: "Reliable Virtual CFO Solutions.",
    icon: "🧑‍💼",
    category: "Business Owners",
    features: [
      "Financial strategy development",
      "Cash flow management",
      "Budget planning and forecasting",
      "Financial reporting and analysis",
      "Investor relations support"
    ],
    pricing: {
      starting: "$2,000/month",
      type: "monthly"
    },
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 5,
    name: "Bookkeeping Services",
    description: "Expert and Bookkeeping at Your Service.",
    icon: "📘",
    category: "Business Owners",
    features: [
      "Daily transaction recording",
      "Bank reconciliation",
      "Accounts payable management",
      "Accounts receivable tracking",
      "Monthly financial reports"
    ],
    pricing: {
      starting: "$300/month",
      type: "monthly"
    },
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 6,
    name: "AR & AP Management",
    description: "Comprehensive AR & AP Management Services.",
    icon: "📄",
    category: "Business Owners",
    features: [
      "Invoice generation and tracking",
      "Payment processing",
      "Vendor management",
      "Collection services",
      "Credit analysis"
    ],
    pricing: {
      starting: "$400/month",
      type: "monthly"
    },
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 7,
    name: "Payroll Management",
    description: "Streamline Your CPA's Payroll Processes.",
    icon: "💵",
    category: "Business Owners",
    features: [
      "Payroll processing",
      "Tax withholding and reporting",
      "Benefits administration",
      "Time tracking integration",
      "Compliance management"
    ],
    pricing: {
      starting: "$5/employee/month",
      type: "per_employee"
    },
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 8,
    name: "Xero & QuickBooks Accounting",
    description: "Specialized Xero & QuickBooks Services.",
    icon: "🪙",
    category: "Business Owners",
    features: [
      "Software setup and configuration",
      "Data entry and management",
      "Report generation",
      "Training and support",
      "Integration services"
    ],
    pricing: {
      starting: "$100/hour",
      type: "hourly"
    },
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  }
];

// GET /api/services - Get all services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredServices = services.filter(service => service.isActive);

    // Filter by category if provided
    if (category) {
      filteredServices = filteredServices.filter(service => 
        service.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply pagination
    const paginatedServices = filteredServices.slice(offset, offset + limit);
    const total = filteredServices.length;

    return NextResponse.json({
      success: true,
      data: paginatedServices,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new service
    const newService = {
      id: services.length + 1,
      name: body.name,
      description: body.description,
      icon: body.icon || "📋",
      category: body.category,
      features: body.features || [],
      pricing: body.pricing || { starting: "Contact for pricing", type: "custom" },
      isActive: body.isActive !== undefined ? body.isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real app, you would save to database here
    services.push(newService);

    return NextResponse.json({
      success: true,
      data: newService,
      message: 'Service created successfully'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
