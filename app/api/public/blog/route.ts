import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/blog - Get published blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      isPublished: true,
    };

    if (categorySlug) {
      const category = await prisma.blogCategory.findUnique({
        where: { slug: categorySlug },
      });
      if (category) {
        where.categoryId = category.id;
      }
    }

    const [blogs, total, categories] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
        include: {
          category: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.blog.count({ where }),
      prisma.blogCategory.findMany({
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: {
              blogs: {
                where: { isPublished: true },
              },
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      blogs: blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        coverImage: blog.coverImage,
        publishedAt: blog.publishedAt,
        category: blog.category,
        author: blog.author,
      })),
      categories: categories.filter((c) => c._count.blogs > 0),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
