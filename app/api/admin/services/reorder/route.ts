import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PUT /api/admin/services/reorder - Reorder services
export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { orderedIds } = body;

    if (!orderedIds || !Array.isArray(orderedIds)) {
      return NextResponse.json(
        { error: "Invalid request: orderedIds array is required" },
        { status: 400 }
      );
    }

    // Update each service's order in a transaction
    await prisma.$transaction(
      orderedIds.map((id: string, index: number) =>
        prisma.service.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    // Fetch and return updated services
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error reordering services:", error);
    return NextResponse.json(
      { error: "Failed to reorder services" },
      { status: 500 }
    );
  }
}
