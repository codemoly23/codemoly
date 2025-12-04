import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import ServiceForm from "@/components/admin/ServiceForm";

export default async function NewServicePage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminLayout user={session.user} title="Create Service">
      <ServiceForm />
    </AdminLayout>
  );
}
