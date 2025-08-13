"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Database,
  Users,
  Lock,
  RefreshCw,
  Mail,
  Phone,
  Eye,
  UserCheck,
} from "lucide-react";
import  { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

// Privacy policy data based on the image content
const privacyPolicyData = [
  {
    id: "personal-data",
    title: "Personal Data (Information) Voluntarily",
    icon: <UserCheck className="w-6 h-6" />,
    content: [
      "CodeMoly collects and uses personal information while using our website or request about the types of services information only when you voluntarily provide it to us. This may include your name, email address, phone number, company name, and other contact information. To the time, this is very useful for us and our trusted sources to deliver or better interaction experience with our website.",
      "If you provide personal information to us, we collect different reasons, such as to reply to your request a quote or some form, we gather your details, including the contact, address, fax & toll name, state of birth, gender, phone number, and email address, so that we can identify the customers or visitors and send you the information you have requested.",
      "This policy states that, if required, we can also use the IP address of the users who visit our website. This is done to provide better assistance in the event of any issues like access to our website might be experiencing and accounting our user service.",
      "To provide electronic and detailed information related to our company, we can also ask website users to share their contact information and personal information.",
    ],
  },
  {
    id: "information-technology",
    title: "Information Gathered via Technology",
    icon: <Database className="w-6 h-6" />,
    content: [
      "The domain name or IP address is associated when the website device our website; the devices & for intellectual and analytical purposes to gain insight into the visiting public. Regularity of the visits on our web pages, also, impact by the visitors of the websites and many more. This kind of partners is designed to enhance the experience of the customers. The information is collected with the help of engagement data, such as clicks that related to find out the frequency's time of the visit, browser, and operating system.",
    ],
  },
  {
    id: "customer-experience",
    title: "Profiled Customer Experience",
    icon: <Users className="w-6 h-6" />,
    content: [
      "The information submitted by the website as well as our expertise is an employed to optimize our service so as to offer a personalized experience to the customers, which results in a better response and aesthetic function for purpose, we can also share the collected information with our trusted business partners.",
      'Moreover, the policy captured information can also be used to keep you updated with the latest offers, promotional emails, and leads, and other key information that can benefit you. We use the data only to meet consent or "sufficient" and we can offer solutions that is on the user request.',
    ],
  },
];

const additionalSections = [
  {
    id: "privileges",
    title: "Your Privileges",
    icon: <Eye className="w-6 h-6" />,
    content:
      'All our visitors and customers have the right to stop receiving our newsletters, tech feeds, emails, and any other electronic communication related to marketing. And, so this, they just have to click on "Unsubscribe".',
  },
  {
    id: "updating-privacy",
    title: "Updating Privacy",
    icon: <RefreshCw className="w-6 h-6" />,
    content:
      "Statement CodeMoly.com has all the rights to amend or update the privacy policy without notifying you. Therefore, we recommend all our customers review our privacy statements regularly to remain updated with the modified policies, so accordingly our website, you are supposed to check by the policies of CodeMoly that are stated in these privacy statements.",
  },
  {
    id: "information-security",
    title: "Information Security",
    icon: <Lock className="w-6 h-6" />,
    content:
      "We are using latest, or the up to information to keep your personal information highly confidential so that it cannot be released.",
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

export default function PrivacyPolicyContent() {
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
              <Shield className="w-10 h-10 text-blue-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Privacy Policy
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Last modified: January 01, 2024
            </p>

            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Learn how CodeMoly protects your privacy and handles your personal
              information with transparency and care.
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
            {privacyPolicyData.map((section) => (
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Contact Us
            </h2>

            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              If any information that you think needs to be corrected or
              completed, please inform us by sending an email. You are free to
              clear all your doubts related to our privacy policy by reaching us
              at{" "}
              <a
                href="mailto:hello@codemoly.com"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                hello@codemoly.com
              </a>
            </p>

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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
