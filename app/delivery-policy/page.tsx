import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import DeliveryPolicyContent from "@/components/sections/DeliveryPolicyContent";

export const metadata: Metadata = {
  title: "Delivery Policy - CodeMoly",
  description:
    "Learn about CodeMoly's delivery policy, project timelines, delivery process, and post-delivery support for all our development services.",
  keywords:
    "delivery policy, project timelines, development process, CodeMoly policy",
  openGraph: {
    title: "Delivery Policy - CodeMoly",
    description:
      "Learn about CodeMoly's delivery policy, project timelines, delivery process, and post-delivery support for all our development services.",
    url: "https://codemoly.com/delivery-policy",
    siteName: "CodeMoly",
    type: "website",
  },
};

export default function DeliveryPolicyPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <DeliveryPolicyContent />
      <Footer />
    </main>
  );
}
