"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle,
  RefreshCw,
  Package,
  HeadphonesIcon,
  AlertTriangle,
  Phone,
  Mail,
  Calendar,
  FileText,
  Users,
  Settings,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormModal from "@/components/ui/FormModal";
import { useFormModal } from "@/hooks/useFormModal";

const policyData = [
  {
    id: "delivery-policy",
    title: "Delivery Policy",
    icon: <Package className="w-6 h-6" />,
    content: [
      "At CodeMoly, we are dedicated to delivering reliable, on-time delivery of our software solutions, whether it's a mobile app, custom CRM, website or other digital products. We ensure a smooth delivery process from start to your expectations.",
    ],
  },
  {
    id: "project-timelines",
    title: "Project Timelines",
    icon: <Calendar className="w-6 h-6" />,
    content: [
      "Delivery timelines are agreed based on our projects scope and complexity.",
      "A detailed project schedule including development milestones and delivery dates is shared at the start of the project.",
      "Any potential delays delivery without compromising quality.",
    ],
  },
  {
    id: "delivery-process",
    title: "Delivery Process",
    icon: <Settings className="w-6 h-6" />,
    content: [
      "Our delivery process includes the following key steps:",
      "• Pre-development (req. analysis, design, project finalized)",
      "• Development (coding, testing, quality assurance)",
      "• Client review (client feedback and approval requested)",
    ],
    subSections: [
      "Development Includes:",
      "• Source files",
      "• Project documentation",
      "• User guides or manual if requested",
    ],
  },
  {
    id: "review-approval",
    title: "Review & Approval",
    icon: <CheckCircle className="w-6 h-6" />,
    content: [
      "Post project launch, feedback is the crucial for review.",
      "We provide a detailed walkthrough of the project for testing and feedback.",
      "Revisions or adjustments based on your feedback will be handled promptly.",
    ],
  },
  {
    id: "revisions-changes",
    title: "Revisions & Changes",
    icon: <RefreshCw className="w-6 h-6" />,
    content: [
      "Minor changes within the agreed scope are included.",
      "Major changes or additional features beyond the original scope will be discussed and may incur additional costs and timeline adjustments.",
    ],
  },
  {
    id: "final-handover",
    title: "Final Handover",
    icon: <Package className="w-6 h-6" />,
    content: [
      "Upon project completion, we will deliver:",
      "• Full source code",
      "• Documentation and credentials",
      "• Deployment instructions (if applicable)",
    ],
    subSections: [
      "How your final approval and settlement of dues, ownership is transferred as per our agreement.",
    ],
  },
  {
    id: "post-delivery-support",
    title: "Post-Delivery Support",
    icon: <HeadphonesIcon className="w-6 h-6" />,
    content: [
      "We offer free bug support for a specific period as outlined in the project agreement.",
      "Ongoing maintenance and additional support services are available under separate support plans.",
    ],
  },
  {
    id: "delivery-delays",
    title: "Delivery Delays",
    icon: <AlertTriangle className="w-6 h-6" />,
    content: [
      "While we strive to meet delivery timelines, delays may occur due to unforeseen circumstances.",
      "For any anticipated delays, we will communicate proactively and work to minimize the impact on your project timeline.",
      "We are committed to delivering quality work, and we will not compromise on quality for the sake of speed.",
    ],
  },
  {
    id: "need-help",
    title: "Need Help?",
    icon: <HeadphonesIcon className="w-6 h-6" />,
    content: [
      "If you have questions or need clarification about our delivery process, please don't hesitate to contact us:",
      "Email: hello@codemoly.com",
      "Phone: +01894 955 494",
      "Website: www.codemoly.com",
    ],
  },
];

const DeliveryPolicyContent: React.FC = () => {
  const { isOpen, openModal, closeModal } = useFormModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      {/* Header Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Modern Background System */}
        <div className="absolute inset-0">
          {/* Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10" />

          {/* Animated Grid */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0px 0px", "60px 60px"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
            animate={{
              x: [0, 25, -15, 0],
              y: [0, -20, 15, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 blur-3xl"
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 25, -12, 0],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-3xl mb-8 shadow-2xl">
              <Package className="w-10 h-10 text-blue-400" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Delivery Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive delivery process and commitment to exceptional
              results
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {policyData.map((section) => (
              <motion.div key={section.id} variants={itemVariants}>
                <Card className="overflow-hidden bg-gray-800 border-gray-700">
                  <CardHeader className="bg-gray-800 border-b border-gray-700">
                    <CardTitle className="flex items-center gap-3 text-xl text-white">
                      <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg text-blue-400">
                        {section.icon}
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-gray-800">
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-gray-300 leading-relaxed text-sm"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.subSections && (
                        <div className="mt-6 space-y-2">
                          {section.subSections.map((subSection, sIndex) => (
                            <p
                              key={sIndex}
                              className="text-gray-300 leading-relaxed text-sm"
                            >
                              {subSection}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Modern Background System */}
        <div className="absolute inset-0">
          {/* Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10" />

          {/* Animated Grid */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0px 0px", "60px 60px"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
            animate={{
              x: [0, -25, 15, 0],
              y: [0, 20, -15, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Have Questions About Our Delivery Process?
            </h2>

            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our team is here to help clarify any aspect of our delivery policy
              and discuss your project requirements.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
              <motion.a
                href="mailto:hello@codemoly.com"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-base font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-5 h-5" />
                hello@codemoly.com
              </motion.a>
              <motion.a
                href="tel:+01894955494"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-base font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-5 h-5" />
                +01894 955 494
              </motion.a>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                size="lg"
                onClick={openModal}
                className="bg-white text-blue-900 hover:bg-gray-100 shadow-2xl px-8 py-4 text-lg font-semibold rounded-xl"
              >
                Get Started Today
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Form Modal */}
      <FormModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default DeliveryPolicyContent;
