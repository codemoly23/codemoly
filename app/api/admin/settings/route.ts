import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/settings - Fetch site settings
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let settings = await prisma.siteSettings.findUnique({
      where: { id: "main" },
    });

    // If settings don't exist, create default
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "main",
          heroVideoUrl: "https://www.youtube.com/embed/9s2ydfkRz2E",
          servicesTitle: "Intelligent Solutions for Every Business Need",
          servicesDesc:
            "Transform your operations with our comprehensive suite of AI-powered automation services, designed to optimize efficiency, reduce costs, and drive sustainable growth.",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/settings - Update site settings
export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { heroVideoUrl, heroTitle, heroSubtitle, servicesTitle, servicesDesc } =
      body;

    const settings = await prisma.siteSettings.upsert({
      where: { id: "main" },
      update: {
        heroVideoUrl,
        heroTitle,
        heroSubtitle,
        servicesTitle,
        servicesDesc,
      },
      create: {
        id: "main",
        heroVideoUrl:
          heroVideoUrl || "https://www.youtube.com/embed/9s2ydfkRz2E",
        heroTitle,
        heroSubtitle,
        servicesTitle:
          servicesTitle || "Intelligent Solutions for Every Business Need",
        servicesDesc:
          servicesDesc ||
          "Transform your operations with our comprehensive suite of AI-powered automation services.",
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
