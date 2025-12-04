import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import * as LucideIcons from "lucide-react";
import { ArrowLeft, ExternalLink, Play, CheckCircle } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { detailsSlug: true },
  });

  return products.map((product) => ({
    slug: product.detailsSlug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { detailsSlug: slug },
    select: { title: true, description: true, image: true },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | CodeMoly`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { detailsSlug: slug },
  });

  if (!product || !product.isActive) {
    notFound();
  }

  // Get icon component
  const IconComponent = (
    LucideIcons as Record<
      string,
      React.ComponentType<{ className?: string }>
    >
  )[product.icon] || LucideIcons.Package;

  const features = product.features as string[];
  const stats = product.stats as Record<string, string>;

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
        {/* Hero Section */}
        <section
          className={`relative pt-24 pb-16 overflow-hidden bg-gradient-to-br ${product.gradient}`}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div className="text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-gray-700">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-bold tracking-wider text-white/80 uppercase">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {product.title}
                </h1>

                <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-xl">
                  {product.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {Object.entries(stats).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        {value}
                      </div>
                      <div className="text-sm text-white/70 uppercase tracking-wider">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {product.demoUrl && (
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 bg-white text-gray-900 hover:bg-white/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Play className="w-5 h-5" />
                      <span>View Demo</span>
                    </a>
                  )}
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 font-semibold border border-white/30"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Request Quote</span>
                  </Link>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 shadow-2xl">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover rounded-xl"
                        priority
                      />
                    ) : (
                      <div className="flex items-center justify-center text-white/50">
                        <IconComponent className="w-24 h-24" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {features.length > 0 && (
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${product.gradient} flex items-center justify-center text-white flex-shrink-0`}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {feature}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Details Content Section */}
        {product.detailsContent && (
          <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <article
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400"
                dangerouslySetInnerHTML={{ __html: product.detailsContent }}
              />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${product.gradient} p-8 lg:p-16 text-center text-white`}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16" />
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl lg:text-4xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Transform your business with {product.title}. Contact us today
                  for a personalized demo and pricing information.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {product.demoUrl && (
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 bg-white text-gray-900 hover:bg-white/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Play className="w-5 h-5" />
                      <span>View Demo</span>
                    </a>
                  )}
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 font-semibold border border-white/30"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
