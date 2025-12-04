import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CategoriesClient from "./CategoriesClient";

export default async function BlogCategoriesPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all categories with blog count and parent/children relations
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { blogs: true },
      },
      parent: {
        select: { id: true, name: true, slug: true },
      },
      children: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  return (
    <CategoriesClient
      user={session.user}
      initialCategories={categories}
    />
  );
}
