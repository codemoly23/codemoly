import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { Calendar, ArrowRight, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - CodeMoly",
  description: "Read the latest articles from CodeMoly on AI, automation, and software development.",
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

async function BlogContent({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const categorySlug = params.category;
  const page = parseInt(params.page || "1");
  const limit = 9;

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
      skip: (page - 1) * limit,
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

  const totalPages = Math.ceil(total / limit);
  const activeCategories = categories.filter((c) => c._count.blogs > 0);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and updates from the CodeMoly team
          </p>
        </div>

        {/* Categories Filter */}
        {activeCategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !categorySlug
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              All Posts
            </Link>
            {activeCategories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categorySlug === category.slug
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {category.name} ({category._count.blogs})
              </Link>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No blog posts found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-video bg-gradient-to-br from-purple-600/20 to-blue-600/20">
                    {blog.coverImage ? (
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized={blog.coverImage.startsWith('/uploads/')}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-white/20">
                          {blog.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {blog.category.name}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                      {blog.title}
                    </h2>
                    {blog.excerpt && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {blog.author.name}
                        </span>
                        {blog.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(blog.publishedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {page > 1 && (
                  <Link
                    href={`/blog?${
                      categorySlug ? `category=${categorySlug}&` : ""
                    }page=${page - 1}`}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Previous
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Link
                      key={pageNum}
                      href={`/blog?${
                        categorySlug ? `category=${categorySlug}&` : ""
                      }page=${pageNum}`}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        pageNum === page
                          ? "bg-purple-600 text-white"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  )
                )}
                {page < totalPages && (
                  <Link
                    href={`/blog?${
                      categorySlug ? `category=${categorySlug}&` : ""
                    }page=${page + 1}`}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <main className="min-h-screen bg-slate-900">
      <Navigation />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        }
      >
        <BlogContent searchParams={searchParams} />
      </Suspense>
      <Footer />
    </main>
  );
}
