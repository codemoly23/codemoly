import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/settings - Fetch public site settings (no auth required)
export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "main" },
    });

    // If settings don't exist, return defaults
    if (!settings) {
      settings = {
        id: "main",
        heroVideoUrl: "https://www.youtube.com/embed/9s2ydfkRz2E",
        heroTitle: null,
        heroSubtitle: null,
        servicesTitle: "Intelligent Solutions for Every Business Need",
        servicesDesc:
          "Transform your operations with our comprehensive suite of AI-powered automation services, designed to optimize efficiency, reduce costs, and drive sustainable growth.",
        updatedAt: new Date(),
      };
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching public settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}
