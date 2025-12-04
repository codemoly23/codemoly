import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BlogListClient from "./BlogListClient";

export default async function BlogListPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all blog posts
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  // Fetch categories for filter
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <BlogListClient
      user={session.user}
      initialBlogs={blogs}
      categories={categories}
    />
  );
}
