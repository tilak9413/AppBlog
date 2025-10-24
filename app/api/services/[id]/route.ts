import { connectDB } from "@/lib/mongodb";
import Service from "../../model/service";
import { NextResponse } from "next/server";

// GET a single service by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const id = params.id;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}

// UPDATE a service
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const id = params.id;

  try {
    const body = await req.json();
    const { title, description, shortDescription, image, slug, features, active } = body;

    // Check if service exists
    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== service.slug) {
      const existingService = await Service.findOne({ slug });
      if (existingService && existingService._id.toString() !== id) {
        return NextResponse.json({ error: "Service with this slug already exists" }, { status: 409 });
      }
    }

    // Update service
    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        title,
        description,
        shortDescription,
        image,
        slug,
        features,
        active
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE a service
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const id = params.id;

  try {
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}