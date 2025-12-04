import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import Events from "@/components/sections/Events";
import Features from "@/components/sections/Features";
import ProductShowcase from "@/components/sections/ProductShowcase";
import GlobalPresence from "@/components/sections/GlobalPresence";
import AIAutomations from "@/components/sections/AIAutomations";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import TechStack from "@/components/sections/TechStack";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Fetch site settings, services, and products from database
  const [settings, services, products] = await Promise.all([
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

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero videoUrl={heroVideoUrl} />
      <AIAutomations title={servicesTitle} description={servicesDesc} services={transformedServices} />
      <ProductShowcase products={transformedProducts} />
      <Testimonials />
      <Features />
      <TechStack />
      <Events />
      {/* <About /> */}
      <GlobalPresence />
      {/* <Pricing /> */}
      <Contact />
      <Footer />
    </main>
  );
}
