import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/events - List all events
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const events = await prisma.event.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST /api/admin/events - Create a new event
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      subtitle,
      description,
      mediaType,
      mediaUrl,
      thumbnail,
      gradient,
      eventDate,
      location,
      externalUrl,
      isActive,
    } = body;

    // Validate required fields
    if (!title || !mediaUrl || !gradient) {
      return NextResponse.json(
        { error: "Missing required fields: title, mediaUrl, gradient" },
        { status: 400 }
      );
    }

    // Get the highest order value to place new event at the end
    const lastEvent = await prisma.event.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = (lastEvent?.order ?? -1) + 1;

    const event = await prisma.event.create({
      data: {
        title,
        subtitle: subtitle || null,
        description: description || null,
        mediaType: mediaType || "IMAGE",
        mediaUrl,
        thumbnail: thumbnail || null,
        gradient,
        eventDate: eventDate ? new Date(eventDate) : null,
        location: location || null,
        externalUrl: externalUrl || null,
        order: newOrder,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
