import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminLayout user={session.user} title="Create Product">
      <ProductForm />
    </AdminLayout>
  );
}
