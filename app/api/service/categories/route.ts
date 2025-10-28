import { NextResponse } from 'next/server';
import { CategoryModel, ServiceModel } from '../../model/service';
import { connectDB } from '@/lib/mongodb';

function serializeCategory(doc: any, services?: any[]) {
    return {
        id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        ...(services
            ? {
                services: services.map((s) => ({
                    id: s._id.toString(),
                    categoryId: s.categoryId.toString(),
                    heroSection: s.heroSection,
                    cardSections: s.cardSections?.map((cs: any) => ({
                        id: cs._id.toString(),
                        sectionTitle: cs.sectionTitle,
                        sectionDescription: cs.sectionDescription,
                        cards: cs.cards?.map((c: any) => ({
                            id: c._id.toString(),
                            title: c.title,
                            description: c.description,
                        })),
                    })),
                    content: s.content,
                    createdAt: s.createdAt,
                    updatedAt: s.updatedAt,
                })),
            }
            : {}),
    };
}

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const withServices = searchParams.get('withServices') === 'true';


        const categories = await CategoryModel.find().lean();

        if (!withServices) {
            return NextResponse.json({
                data: categories.map((c) => serializeCategory(c)),
            });
        }

        // Fetch services for each category
        const serviceMap: Record<string, any[]> = {};
        const categoryIds = categories.map((c) => c._id);
        const services = await ServiceModel.find({ categoryId: { $in: categoryIds } })
            .sort({ createdAt: -1 })
            .lean();

        services.forEach((s) => {
            const key = s.categoryId.toString();
            serviceMap[key] = serviceMap[key] || [];
            serviceMap[key].push(s);
        });

        return NextResponse.json({
            data: categories.map((c) => serializeCategory(c, serviceMap[c._id.toString()] || [])),
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const payload = await req.json();
        const { name, description } = payload || {};
        if (!name || !description) {
            return NextResponse.json({ error: 'name and description are required' }, { status: 400 });
        }


        const created = await CategoryModel.create({ name, description });
        return NextResponse.json({ data: { id: created._id.toString(), name, description } }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Failed to create category' }, { status: 500 });
    }
}