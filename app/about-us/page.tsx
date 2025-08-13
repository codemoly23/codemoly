import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import AboutUsContent from "@/components/sections/AboutUsContent";

export const metadata: Metadata = {
  title: "About Us - CodeMoly",
  description:
    "Learn about CodeMoly's mission to transform businesses through AI innovation and cutting-edge software development. Discover our global presence, values, and expertise.",
  keywords:
    "about CodeMoly, software development company, AI automation, global presence, technology consulting, web development",
  openGraph: {
    title: "About Us - CodeMoly",
    description:
      "Learn about CodeMoly's mission to transform businesses through AI innovation and cutting-edge software development. Discover our global presence, values, and expertise.",
    url: "https://codemoly.com/about-us",
    siteName: "CodeMoly",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <AboutUsContent />
      <Footer />
    </main>
  );
}
