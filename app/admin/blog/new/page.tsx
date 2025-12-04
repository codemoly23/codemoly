import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import BlogForm from "@/components/admin/BlogForm";

export default async function NewBlogPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch categories for the form
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <AdminLayout user={session.user} title="Create Blog Post">
      <BlogForm categories={categories} />
    </AdminLayout>
  );
}
