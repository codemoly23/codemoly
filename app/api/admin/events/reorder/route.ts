import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PUT /api/admin/events/reorder - Reorder events
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
        { error: "orderedIds array is required" },
        { status: 400 }
      );
    }

    // Update all events with their new order
    await prisma.$transaction(
      orderedIds.map((id: string, index: number) =>
        prisma.event.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ message: "Events reordered successfully" });
  } catch (error) {
    console.error("Error reordering events:", error);
    return NextResponse.json(
      { error: "Failed to reorder events" },
      { status: 500 }
    );
  }
}
