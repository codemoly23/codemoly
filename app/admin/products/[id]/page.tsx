import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  // Fetch the product
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  // Convert Prisma data to form-compatible format
  const initialData = {
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    image: product.image,
    icon: product.icon,
    gradient: product.gradient,
    features: product.features as string[],
    stats: product.stats as Record<string, string>,
    demoUrl: product.demoUrl,
    detailsSlug: product.detailsSlug,
    isActive: product.isActive,
  };

  return (
    <AdminLayout user={session.user} title="Edit Product">
      <ProductForm initialData={initialData} isEditing />
    </AdminLayout>
  );
}
