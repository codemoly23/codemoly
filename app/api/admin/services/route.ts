import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/services - List all services
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST /api/admin/services - Create a new service
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, icon, gradient, features, stats, isActive } = body;

    // Validate required fields
    if (!title || !description || !icon || !gradient) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, icon, gradient" },
        { status: 400 }
      );
    }

    // Get the highest order value to place new service at the end
    const lastService = await prisma.service.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = (lastService?.order ?? -1) + 1;

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon,
        gradient,
        features: features || [],
        stats: stats || {},
        order: newOrder,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
