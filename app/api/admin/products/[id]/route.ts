import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/admin/products/[id] - Get a single product
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
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

// PUT /api/admin/products/[id] - Update a product
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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
      detailsContent,
      isActive,
    } = body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if slug is being changed and is unique
    if (detailsSlug && detailsSlug !== existingProduct.detailsSlug) {
      const slugExists = await prisma.product.findFirst({
        where: {
          detailsSlug,
          id: { not: id },
        },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "Slug already exists. Please choose a different one." },
          { status: 400 }
        );
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(image !== undefined && { image }),
        ...(icon !== undefined && { icon }),
        ...(gradient !== undefined && { gradient }),
        ...(features !== undefined && { features }),
        ...(stats !== undefined && { stats }),
        ...(demoUrl !== undefined && { demoUrl }),
        ...(detailsSlug !== undefined && { detailsSlug }),
        ...(detailsContent !== undefined && { detailsContent }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/[id] - Delete a product
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
