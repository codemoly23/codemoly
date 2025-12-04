import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PUT /api/admin/products/reorder - Reorder products
export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json(
        { error: "orderedIds must be an array" },
        { status: 400 }
      );
    }

    // Update order for each product in a transaction
    await prisma.$transaction(
      orderedIds.map((id: string, index: number) =>
        prisma.product.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ message: "Products reordered successfully" });
  } catch (error) {
    console.error("Error reordering products:", error);
    return NextResponse.json(
      { error: "Failed to reorder products" },
      { status: 500 }
    );
  }
}
