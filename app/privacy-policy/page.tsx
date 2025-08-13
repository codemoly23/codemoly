import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import PrivacyPolicyContent from "@/components/sections/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy - CodeMoly",
  description:
    "Learn about CodeMoly's privacy policy, data protection practices, information security, and how we handle your personal information.",
  keywords:
    "privacy policy, data protection, information security, CodeMoly privacy",
  openGraph: {
    title: "Privacy Policy - CodeMoly",
    description:
      "Learn about CodeMoly's privacy policy, data protection practices, information security, and how we handle your personal information.",
    url: "https://codemoly.com/privacy-policy",
    siteName: "CodeMoly",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PrivacyPolicyContent />
      <Footer />
    </main>
  );
}
