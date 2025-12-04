import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/products - Get all active products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        image: true,
        icon: true,
        gradient: true,
        stats: true,
        features: true,
        demoUrl: true,
        detailsSlug: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
