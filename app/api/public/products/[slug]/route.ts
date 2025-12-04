import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET /api/public/products/[slug] - Get a single product by slug
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: {
        detailsSlug: slug,
        isActive: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
