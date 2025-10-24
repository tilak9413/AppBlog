import { connectDB } from "@/lib/mongodb";
import Service from "../model/service";
import { NextResponse } from "next/server";

// GET all services
export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit") ? parseInt(url.searchParams.get("limit")!) : 10;
  const page = url.searchParams.get("page") ? parseInt(url.searchParams.get("page")!) : 1;
  const slug = url.searchParams.get("slug");

  try {
    let query: any = { active: true };
    
    if (slug) {
      query.slug = slug;
      const service = await Service.findOne(query);
      if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });
      return NextResponse.json(service);
    }

    const skip = (page - 1) * limit;
    const services = await Service.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Service.countDocuments(query);
    
    return NextResponse.json({
      services,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// POST new service
export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { title, description, shortDescription, image, slug, features, active } = body;

    if (!title || !description || !shortDescription || !slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if slug already exists
    const existingService = await Service.findOne({ slug });
    if (existingService) {
      return NextResponse.json({ error: "Service with this slug already exists" }, { status: 409 });
    }

    const service = new Service({
      title,
      description,
      shortDescription,
      image: image || "",
      slug,
      features: features || [],
      active: active !== undefined ? active : true
    });

    await service.save();
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}