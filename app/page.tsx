import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import Video from "@/components/sections/Video";
import Features from "@/components/sections/Features";
import ProductShowcase from "@/components/sections/ProductShowcase";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Video />
      <Features />
      <ProductShowcase />
      <About />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
