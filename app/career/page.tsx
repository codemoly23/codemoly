import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import CareersContent from "@/components/sections/CareersContent";

export const metadata: Metadata = {
  title: "Careers - CodeMoly",
  description:
    "Join CodeMoly's team of talented developers and innovators. Explore career opportunities in software development, web development, and technology consulting.",
  keywords:
    "careers, jobs, software developer, web developer, CodeMoly careers, technology jobs, remote work",
  openGraph: {
    title: "Careers - CodeMoly",
    description:
      "Join CodeMoly's team of talented developers and innovators. Explore career opportunities in software development, web development, and technology consulting.",
    url: "https://codemoly.com/careers",
    siteName: "CodeMoly",
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <CareersContent />
      <Footer />
    </main>
  );
}
