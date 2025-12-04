import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import EventSettingsClient from "./EventSettingsClient";

export default async function EventSettingsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch or create event section settings
  let settings = await prisma.eventSectionSettings.findUnique({
    where: { id: "main" },
  });

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

  return (
    <AdminLayout user={session.user} title="Event Section Settings">
      <EventSettingsClient initialSettings={settings} />
    </AdminLayout>
  );
}
