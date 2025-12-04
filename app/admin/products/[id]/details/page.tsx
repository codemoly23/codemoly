import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductDetailsEditor from "@/components/admin/ProductDetailsEditor";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  // Fetch the product
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      detailsContent: true,
      detailsSlug: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <AdminLayout user={session.user} title={`Edit Details: ${product.title}`}>
      <ProductDetailsEditor
        productId={product.id}
        productTitle={product.title}
        productSlug={product.detailsSlug}
        initialContent={product.detailsContent || ""}
      />
    </AdminLayout>
  );
}
