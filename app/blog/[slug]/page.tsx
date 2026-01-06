import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { ArrowLeft, Calendar, User, Tag, ArrowRight } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findFirst({
    where: { slug, isPublished: true },
    select: { title: true, excerpt: true, coverImage: true },
  });

  if (!blog) {
    return {
      title: "Post Not Found - CodeMoly",
    };
  }

  return {
    title: `${blog.title} - CodeMoly Blog`,
    description: blog.excerpt || `Read ${blog.title} on CodeMoly Blog`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || undefined,
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const blog = await prisma.blog.findFirst({
    where: { slug, isPublished: true },
    include: {
      category: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!blog) {
    notFound();
  }

  // Get related posts
  const relatedPosts = await prisma.blog.findMany({
    where: {
      isPublished: true,
      categoryId: blog.categoryId,
      NOT: { id: blog.id },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      category: true,
    },
  });

  return (
    <main className="min-h-screen bg-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="flex justify-end mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              Back to Blog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category */}
          <Link
            href={`/blog?category=${blog.category.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-400 rounded-full text-sm font-medium mb-6 hover:bg-purple-600/30 transition-colors"
          >
            <Tag className="w-4 h-4" />
            {blog.category.name}
          </Link>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {blog.author.name}
            </span>
            {blog.publishedAt && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              unoptimized={blog.coverImage.startsWith('/uploads/')}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article
            className="prose prose-lg prose-invert prose-purple max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:text-purple-400 prose-code:bg-purple-900/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-700
              prose-blockquote:border-purple-500 prose-blockquote:bg-purple-900/10 prose-blockquote:text-gray-300
              prose-img:rounded-xl prose-img:shadow-lg
              prose-li:text-gray-300
              prose-ul:text-gray-300
              prose-ol:text-gray-300"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                >
                  {post.coverImage ? (
                    <div className="relative aspect-video">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized={post.coverImage.startsWith('/uploads/')}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white/20">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-white line-clamp-2 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">
                        {post.category.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
