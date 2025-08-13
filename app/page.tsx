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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <AIAutomations />
      <ProductShowcase />
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
