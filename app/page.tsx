import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import Events from "@/components/sections/Events";
import Features from "@/components/sections/Features";
import ProductShowcase from "@/components/sections/ProductShowcase";
import GlobalPresence from "@/components/sections/GlobalPresence";
import AIAutomations from "@/components/sections/AIAutomations";
import Testimonials from "@/components/sections/Testimonials";
import BlogSection from "@/components/sections/BlogSection";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import TechStack from "@/components/sections/TechStack";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Fetch site settings, services, products, events, event settings, and blogs from database
  const [settings, services, products, events, eventSettings, blogs] = await Promise.all([
    prisma.siteSettings.findUnique({
      where: { id: "main" },
    }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.event.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.eventSectionSettings.findUnique({
      where: { id: "main" },
    }),
    prisma.blog.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: {
        category: {
          select: { name: true, slug: true },
        },
        author: {
          select: { name: true },
        },
      },
    }),
  ]);

  const heroVideoUrl = settings?.heroVideoUrl || "https://www.youtube.com/embed/9s2ydfkRz2E";
  const servicesTitle = settings?.servicesTitle || "Intelligent Solutions for Every Business Need";
  const servicesDesc = settings?.servicesDesc || "Transform your operations with our comprehensive suite of AI-powered automation services, designed to optimize efficiency, reduce costs, and drive sustainable growth.";

  // Transform services for the AIAutomations component
  const transformedServices = services.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    icon: service.icon,
    gradient: service.gradient,
    features: service.features as string[],
    stats: service.stats as Record<string, string>,
    order: service.order,
    isActive: service.isActive,
  }));

  // Transform products for the ProductShowcase component
  const transformedProducts = products.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    image: product.image,
    icon: product.icon,
    gradient: product.gradient,
    stats: product.stats as Record<string, string>,
    features: product.features as string[],
    demoUrl: product.demoUrl,
    detailsSlug: product.detailsSlug,
  }));

  // Transform events for the Events component
  const transformedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    subtitle: event.subtitle,
    description: event.description,
    mediaType: event.mediaType as "IMAGE" | "VIDEO" | "YOUTUBE",
    mediaUrl: event.mediaUrl,
    thumbnail: event.thumbnail,
    gradient: event.gradient,
    eventDate: event.eventDate?.toISOString() || null,
    location: event.location,
    externalUrl: event.externalUrl,
  }));

  // Event section settings
  const eventSectionConfig = eventSettings
    ? {
        sectionTitle: eventSettings.sectionTitle,
        sectionDesc: eventSettings.sectionDesc,
        displayMode: eventSettings.displayMode as "GRID" | "SLIDER",
        autoSlideDelay: eventSettings.autoSlideDelay,
      }
    : undefined;

  // Transform blogs for the BlogSection component
  const transformedBlogs = blogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    coverImage: blog.coverImage,
    publishedAt: blog.publishedAt?.toISOString() || null,
    category: blog.category,
    author: blog.author,
  }));

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero videoUrl={heroVideoUrl} />
      <AIAutomations title={servicesTitle} description={servicesDesc} services={transformedServices} />
      <ProductShowcase products={transformedProducts} />
      <Testimonials />
      <Features />
      <TechStack />
      <Events events={transformedEvents} settings={eventSectionConfig} />
      {/* <About /> */}
      <GlobalPresence />
      {/* <Pricing /> */}
      <BlogSection blogs={transformedBlogs} />
      <Contact />
      <Footer />
    </main>
  );
}
