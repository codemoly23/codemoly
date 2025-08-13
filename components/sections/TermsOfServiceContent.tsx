"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  Users,
  CreditCard,
  Globe,
  Lock,
  Mail,
  Phone,
  AlertTriangle,
  UserCheck,
  Settings,
  Scale,
  Eye,
  Smartphone,
  Gavel,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

// Terms of service data based on the image content
const termsData = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: <FileText className="w-6 h-6" />,
    content: [
      "Welcome to CodeMoly. These terms and conditions outline the rules and regulations for the use of CodeMoly's Website, located at codemoly.com.",
      "By accessing this website, we assume you accept these terms and conditions. Do not continue to use CodeMoly if you do not agree to take all of the terms and conditions stated on this page.",
    ],
  },
  {
    id: "definitions",
    title: "2. Definitions",
    icon: <Settings className="w-6 h-6" />,
    content: [
      "The following terminology applies to these terms and conditions:",
      '• "Company" (or "we" or "us" or "our") refers to CodeMoly.',
      '• "You" refers to the user or viewer of our website.',
      '• "Party," "parties," or "us" refers to both the Company and yourself.',
      '• "Service" refers to the service provided by CodeMoly as described on the website.',
    ],
  },
  {
    id: "eligibility",
    title: "3. Eligibility",
    icon: <UserCheck className="w-6 h-6" />,
    content: [
      "To use our services, you must be:",
      "• At least 18 years old or have parental consent",
      "• Legally capable of entering into binding contracts",
      "• Not prohibited from using our services under applicable law",
      "• Able to provide accurate and complete information",
    ],
  },
  {
    id: "user-accounts",
    title: "4. User Accounts",
    icon: <Users className="w-6 h-6" />,
    content: [
      "When you create an account with us, you must provide information that is accurate, complete, and current at all times.",
      "You are responsible for safeguarding the password and for all activities that occur under your account.",
      "You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
      "We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.",
    ],
  },
  {
    id: "use-license",
    title: "5. Use License",
    icon: <Scale className="w-6 h-6" />,
    content: [
      "Permission is granted to temporarily download one copy of the materials on CodeMoly's website for personal, non-commercial transitory viewing only.",
      "This is the grant of a license, not a transfer of title, and under this license you may not:",
      "• Modify or copy the materials",
      "• Use the materials for any commercial purpose or for any public display",
      "• Attempt to reverse engineer any software contained on the website",
      "• Remove any copyright or other proprietary notations from the materials",
    ],
  },
];

const additionalSections = [
  {
    id: "services-offered",
    title: "6. Services Offered",
    icon: <Globe className="w-6 h-6" />,
    content:
      "CodeMoly provides software development services, web development, mobile app development, and technology consulting. All services are subject to availability and our current service offerings.",
  },
  {
    id: "pricing-payments",
    title: "7. Pricing, Payments, and Subscriptions",
    icon: <CreditCard className="w-6 h-6" />,
    content:
      "All prices are subject to change without notice. Payment terms are specified in individual service agreements. Subscriptions will automatically renew unless cancelled. Refunds are subject to our refund policy.",
  },
  {
    id: "user-responsibilities",
    title: "8. User Responsibilities",
    icon: <AlertTriangle className="w-6 h-6" />,
    content:
      "Users are responsible for maintaining the confidentiality of their account information, complying with all applicable laws, and ensuring that all information provided is accurate and up-to-date.",
  },
  {
    id: "intellectual-property",
    title: "9. Intellectual Property",
    icon: <Lock className="w-6 h-6" />,
    content:
      "All content, features, and functionality on our website are owned by CodeMoly and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
  },
  {
    id: "data-security",
    title: "10. Data Security and Privacy",
    icon: <Shield className="w-6 h-6" />,
    content:
      "We implement appropriate security measures to protect your personal information. Please refer to our Privacy Policy for detailed information about how we collect, use, and protect your data.",
  },
  {
    id: "limitation-liability",
    title: "11. Limitation of Liability",
    icon: <Eye className="w-6 h-6" />,
    content:
      "CodeMoly shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services, even if we have been advised of the possibility of such damages.",
  },
  {
    id: "service-availability",
    title: "12. Service Availability and Modifications",
    icon: <Smartphone className="w-6 h-6" />,
    content:
      "We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice. We do not guarantee that our services will be available at all times or free from interruptions.",
  },
  {
    id: "governing-law",
    title: "13. Governing Law and Dispute Resolution",
    icon: <Gavel className="w-6 h-6" />,
    content:
      "These terms shall be governed by and construed in accordance with the laws of the jurisdiction where CodeMoly operates. Any disputes shall be resolved through binding arbitration.",
  },
  {
    id: "updates-terms",
    title: "14. Updates to Terms",
    icon: <FileText className="w-6 h-6" />,
    content:
      "We reserve the right to update these terms at any time. Users will be notified of significant changes, and continued use of our services constitutes acceptance of the updated terms.",
  },
];

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

export default function TermsOfServiceContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
              <FileText className="w-10 h-10 text-blue-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Terms and Conditions
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              of CodeMoly
            </p>

            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Please read these terms and conditions carefully before using our
              services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {termsData.map((section) => (
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
                      {section.content.map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-gray-300 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {additionalSections.map((section) => (
              <motion.div key={section.id} variants={itemVariants}>
                <Card className="overflow-hidden bg-gray-900 border-gray-700">
                  <CardHeader className="bg-gray-900 border-b border-gray-700">
                    <CardTitle className="flex items-center gap-3 text-xl text-white">
                      <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg text-blue-400">
                        {section.icon}
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-gray-900">
                    <p className="text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Contact Information
            </h2>

            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              If you have any questions about these Terms and Conditions, please
              contact us at:
            </p>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    CodeMoly
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Your trusted partner for software development and technology
                    solutions
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
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

                <div className="text-center pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    Last updated: January 01, 2024
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
