import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import ServiceForm from "@/components/admin/ServiceForm";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  // Fetch the service
  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    notFound();
  }

  // Convert Prisma data to form-compatible format
  const initialData = {
    id: service.id,
    title: service.title,
    description: service.description,
    icon: service.icon,
    gradient: service.gradient,
    features: service.features as string[],
    stats: service.stats as Record<string, string>,
    isActive: service.isActive,
  };

  return (
    <AdminLayout user={session.user} title="Edit Service">
      <ServiceForm initialData={initialData} isEditing />
    </AdminLayout>
  );
}
