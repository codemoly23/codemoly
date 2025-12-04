import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch current settings
  let settings = await prisma.siteSettings.findUnique({
    where: { id: "main" },
  });

  // If no settings exist, create defaults
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

  return <SettingsForm user={session.user} initialSettings={settings} />;
}
