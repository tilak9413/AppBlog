// // app/api/services/[id]/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // Mock implementation - replace with database query
//     const service = services.find(s => s.id === params.id);
    
//     if (!service) {
//       return NextResponse.json(
//         { error: 'Service not found' },
//         { status: 404 }
//       );
//     }
    
//     return NextResponse.json(service);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch service' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json();
    
//     // Mock implementation - replace with database update
//     const index = services.findIndex(s => s.id === params.id);
    
//     if (index === -1) {
//       return NextResponse.json(
//         { error: 'Service not found' },
//         { status: 404 }
//       );
//     }
    
//     services[index] = {
//       ...services[index],
//       ...body,
//       updatedAt: new Date(),
//     };
    
//     return NextResponse.json(services[index]);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to update service' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // Mock implementation - replace with database delete
//     const index = services.findIndex(s => s.id === params.id);
    
//     if (index === -1) {
//       return NextResponse.json(
//         { error: 'Service not found' },
//         { status: 404 }
//       );
//     }
    
//     services.splice(index, 1);
    
//     return NextResponse.json(
//       { message: 'Service deleted successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to delete service' },
//       { status: 500 }
//     );
//   }
// }