import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch real stats from database
  const [servicesCount, productsCount, eventsCount, blogsCount] =
    await Promise.all([
      prisma.service.count({ where: { isActive: true } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.event.count({ where: { isActive: true } }),
      prisma.blog.count({ where: { isPublished: true } }),
    ]);

  const stats = {
    services: servicesCount,
    products: productsCount,
    events: eventsCount,
    blogs: blogsCount,
  };

  return <AdminDashboard user={session.user} stats={stats} />;
}
