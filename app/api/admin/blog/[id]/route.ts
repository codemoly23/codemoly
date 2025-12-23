import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/blog/[id] - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const blog = await prisma.blog.findUnique({
      where: { id },
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

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/blog/[id] - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      categoryId,
      isPublished,
    } = body;

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Check if new slug conflicts with another blog
    if (slug && slug !== existingBlog.slug) {
      const slugConflict = await prisma.blog.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: "A blog post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Check if category exists
    if (categoryId) {
      const category = await prisma.blogCategory.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 400 }
        );
      }
    }

    // Handle publish state change
    let publishedAt = existingBlog.publishedAt;
    if (isPublished !== undefined) {
      if (isPublished && !existingBlog.isPublished) {
        // First time publishing
        publishedAt = new Date();
      } else if (!isPublished) {
        // Unpublishing
        publishedAt = null;
      }
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: title ?? existingBlog.title,
        slug: slug ?? existingBlog.slug,
        excerpt: excerpt !== undefined ? excerpt : existingBlog.excerpt,
        content: content ?? existingBlog.content,
        coverImage:
          coverImage !== undefined ? coverImage : existingBlog.coverImage,
        categoryId: categoryId ?? existingBlog.categoryId,
        isPublished: isPublished ?? existingBlog.isPublished,
        publishedAt,
      },
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

    // Revalidate blog pages
    revalidatePath("/");
    revalidatePath("/blog");
    // Revalidate old slug if changed
    if (existingBlog.slug !== blog.slug) {
      revalidatePath(`/blog/${existingBlog.slug}`);
    }
    revalidatePath(`/blog/${blog.slug}`);

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog/[id] - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    await prisma.blog.delete({
      where: { id },
    });

    // Revalidate blog pages
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${existingBlog.slug}`);

    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
