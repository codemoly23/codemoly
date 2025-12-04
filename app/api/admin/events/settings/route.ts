import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/events/settings - Get event section settings
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching event settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch event settings" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/events/settings - Update event section settings
export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { sectionTitle, sectionDesc, displayMode, autoSlideDelay } = body;

    const settings = await prisma.eventSectionSettings.upsert({
      where: { id: "main" },
      update: {
        ...(sectionTitle !== undefined && { sectionTitle }),
        ...(sectionDesc !== undefined && { sectionDesc }),
        ...(displayMode !== undefined && { displayMode }),
        ...(autoSlideDelay !== undefined && { autoSlideDelay }),
      },
      create: {
        id: "main",
        sectionTitle: sectionTitle || "Global Events",
        sectionDesc:
          sectionDesc ||
          "Experience CodeMoly on the world stage. From international tech conferences to exclusive product launches, we're making waves across the globe.",
        displayMode: displayMode || "GRID",
        autoSlideDelay: autoSlideDelay || 5000,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating event settings:", error);
    return NextResponse.json(
      { error: "Failed to update event settings" },
      { status: 500 }
    );
  }
}
