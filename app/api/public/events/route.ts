import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/events - Get active events with section settings
export async function GET() {
  try {
    // Fetch active events
    const events = await prisma.event.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    // Fetch section settings
    let settings = await prisma.eventSectionSettings.findUnique({
      where: { id: "main" },
    });

    // Create default settings if not exists
    if (!settings) {
      settings = await prisma.eventSectionSettings.create({
        data: {
          id: "main",
          sectionTitle: "Global Events",
          sectionDesc:
            "Experience CodeMoly on the world stage. From international tech conferences to exclusive product launches, we're making waves across the globe.",
          displayMode: "GRID",
          autoSlideDelay: 5000,
        },
      });
    }

    return NextResponse.json({
      events,
      settings,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
