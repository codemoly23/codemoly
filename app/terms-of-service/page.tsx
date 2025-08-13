import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import TermsOfServiceContent from "@/components/sections/TermsOfServiceContent";

export const metadata: Metadata = {
  title: "Terms of Service - CodeMoly",
  description:
    "Read CodeMoly's terms of service, conditions, user agreements, and service policies for our software development and technology services.",
  keywords:
    "terms of service, conditions, user agreement, CodeMoly terms, service policy",
  openGraph: {
    title: "Terms of Service - CodeMoly",
    description:
      "Read CodeMoly's terms of service, conditions, user agreements, and service policies for our software development and technology services.",
    url: "https://codemoly.com/terms-of-service",
    siteName: "CodeMoly",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <TermsOfServiceContent />
      <Footer />
    </main>
  );
}
