import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EventsClient from "./EventsClient";

export default async function EventsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all events
  const events = await prisma.event.findMany({
    orderBy: { order: "asc" },
  });

  return <EventsClient user={session.user} initialEvents={events} />;
}
