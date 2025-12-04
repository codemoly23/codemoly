import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import EventForm from "@/components/admin/EventForm";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  // Fetch the event
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    notFound();
  }

  // Convert dates to string format for form
  const formData = {
    id: event.id,
    title: event.title,
    subtitle: event.subtitle || "",
    description: event.description || "",
    mediaType: event.mediaType as "IMAGE" | "VIDEO" | "YOUTUBE",
    mediaUrl: event.mediaUrl,
    thumbnail: event.thumbnail || "",
    gradient: event.gradient,
    eventDate: event.eventDate?.toISOString() || "",
    location: event.location || "",
    externalUrl: event.externalUrl || "",
    isActive: event.isActive,
  };

  return (
    <AdminLayout user={session.user} title={`Edit: ${event.title}`}>
      <EventForm initialData={formData} isEditing />
    </AdminLayout>
  );
}
