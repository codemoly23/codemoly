import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET /api/admin/products - List all products
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      orderBy: { order: "asc" },
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

// POST /api/admin/products - Create a new product
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      category,
      image,
      icon,
      gradient,
      features,
      stats,
      demoUrl,
      detailsSlug,
      isActive,
    } = body;

    // Validate required fields
    if (!title || !description || !category || !icon || !gradient) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, category, icon, gradient" },
        { status: 400 }
      );
    }

    // Generate or use provided slug
    let slug = detailsSlug || generateSlug(title);

    // Ensure slug is unique
    const existingProduct = await prisma.product.findUnique({
      where: { detailsSlug: slug },
    });

    if (existingProduct) {
      // Append random suffix to make unique
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    // Get the highest order value to place new product at the end
    const lastProduct = await prisma.product.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = (lastProduct?.order ?? -1) + 1;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        category,
        image: image || "/placeholder-product.jpg",
        icon,
        gradient,
        features: features || [],
        stats: stats || {},
        demoUrl: demoUrl || null,
        detailsSlug: slug,
        order: newOrder,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
