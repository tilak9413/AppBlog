// src/app/api/service/route.ts

import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { CategoryModel, ServiceModel } from '../model/service';
// Assuming 'service' is the correct path for your models

// --- Helper Functions ---

function slugify(text: string): string {
    // Basic slugification: converts "My New Service Title" to "my-new-service-title"
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
        .replace(/\-\-+/g, '-');    // Replace multiple - with single -
}

function serializeService(doc: any) {
    return {
        id: doc._id.toString(),
        categoryId: doc.categoryId.toString(),
        slug: doc.slug, // Include slug in the serialized response
        heroSection: doc.heroSection,
        cardSections: (doc.cardSections || []).map((cs: any) => ({
            id: cs._id.toString(),
            sectionTitle: cs.sectionTitle,
            sectionDescription: cs.sectionDescription,
            cards: (cs.cards || []).map((c: any) => ({
                id: c._id.toString(),
                title: c.title,
                description: c.description,
            })),
        })),
        content: doc.content,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}

// --- GET (Fetch All Services) ---
export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId');

        const query: any = {};
        if (categoryId) query.categoryId = categoryId;

        const services = await ServiceModel.find(query).sort({ createdAt: -1 }).lean();
        return NextResponse.json({ data: services.map(serializeService) });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Failed to fetch services' }, { status: 500 });
    }
}

// --- POST (Create Service) ---
export async function POST(req: Request) {
    try {
        await connectDB();
        const payload = await req.json();

        const { categoryId, heroSection, cardSections = [], content = '' } = payload || {};

        // Basic payload validation
        if (!categoryId || !heroSection?.title || !heroSection?.description) {
            return NextResponse.json({ error: 'categoryId, heroSection.title, heroSection.description are required' }, { status: 400 });
        }

        // Category existence check
        const categoryExists = await CategoryModel.exists({ _id: categoryId });
        if (!categoryExists) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        // 💡 FIX: Generate the required slug from the heroSection title
        const serviceSlug = slugify(heroSection.title);

        // Replace client-side ids with server subdocs; Mongoose will create _id
        const payloadDoc = {
            categoryId,
            slug: serviceSlug, // <-- SLUG ADDED HERE to pass validation
            heroSection,
            cardSections: (cardSections || []).map((cs: any) => ({
                sectionTitle: cs.sectionTitle,
                sectionDescription: cs.sectionDescription || '',
                cards: (cs.cards || []).map((c: any) => ({
                    title: c.title,
                    description: c.description,
                })),
            })),
            content,
        };

        const created = await ServiceModel.create(payloadDoc);
        return NextResponse.json({ data: serializeService(created) }, { status: 201 });
    } catch (err: any) {
        console.error('POST Service Error:', err.message);
        // Mongoose validation errors are helpful, so we return the message
        return NextResponse.json({ error: err.message || 'Failed to create service' }, { status: 500 });
    }
}