"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Workflow,
  Target,
  CheckCircle,
  ArrowRight,
  Clock,
  MessageSquare,
  Settings,
  Eye,
  Sparkles,
  Store,
} from "lucide-react";
import FormModal from "@/components/ui/FormModal";
import { useFormModal } from "@/hooks/useFormModal";

// Core Services Data - Real CodeMoly Services
const coreServices = [
  {
    id: 1,
    icon: <Workflow className="w-8 h-8" />,
    title: "n8n Workflow Automation",
    description:
      "Build powerful automation workflows with n8n's visual interface. Connect 400+ apps and services to streamline your business processes without coding.",
    gradient: "from-blue-600 via-purple-600 to-indigo-700",
    features: [
      "400+ App Integrations",
      "Visual Workflow Builder",
      "Custom API Connections",
    ],
    stats: { integrations: "400+", workflows: "Unlimited", setup: "No-Code" },
    hoverColor: "hover:shadow-blue-500/25",
  },
  {
    id: 2,
    icon: <Store className="w-8 h-8" />,
    title: "E-commerce AI Automation",
    description:
      "Supercharge your online store with AI-powered inventory management, dynamic pricing, personalized recommendations, and automated customer service.",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    features: [
      "Smart Inventory Management",
      "Dynamic Pricing AI",
      "Personalized Recommendations",
    ],
    stats: { sales: "+35%", efficiency: "80%", automation: "24/7" },
    hoverColor: "hover:shadow-emerald-500/25",
  },
  {
    id: 3,
    icon: <Bot className="w-8 h-8" />,
    title: "Custom AI Agents",
    description:
      "Deploy intelligent AI agents tailored to your business needs. From customer service to data analysis, our custom agents work around the clock.",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    features: [
      "Custom Training",
      "Multi-Platform Deploy",
      "Continuous Learning",
    ],
    stats: { accuracy: "95%", response: "<2s", availability: "24/7" },
    hoverColor: "hover:shadow-orange-500/25",
  },
  {
    id: 4,
    icon: <Settings className="w-8 h-8" />,
    title: "Business Operations Automation",
    description:
      "Streamline your entire business operations with intelligent automation. From HR processes to financial workflows, eliminate manual tasks.",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-700",
    features: [
      "HR Process Automation",
      "Financial Workflows",
      "Document Management",
    ],
    stats: { efficiency: "75%", time_saved: "30hrs/week", errors: "-90%" },
    hoverColor: "hover:shadow-violet-500/25",
  },
  {
    id: 5,
    icon: <Target className="w-8 h-8" />,
    title: "Marketing Automation with AI",
    description:
      "Transform your marketing with AI-driven campaigns, automated lead nurturing, social media management, and intelligent customer segmentation.",
    gradient: "from-pink-500 via-rose-600 to-red-700",
    features: [
      "AI Campaign Optimization",
      "Lead Scoring",
      "Social Media Automation",
    ],
    stats: { conversion: "+45%", leads: "3x more", roi: "+120%" },
    hoverColor: "hover:shadow-pink-500/25",
  },
  {
    id: 6,
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Support Assistant Automation",
    description:
      "Deploy intelligent support assistants that handle customer inquiries, provide instant solutions, and escalate complex issues to human agents.",
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    features: [
      "Intelligent Ticket Routing",
      "24/7 Customer Support",
      "Multi-language Support",
    ],
    stats: { resolution: "85%", response: "Instant", satisfaction: "96%" },
    hoverColor: "hover:shadow-cyan-500/25",
  },
];

const automationStats = [
  {
    icon: <Workflow className="w-8 h-8 text-emerald-500" />,
    number: "400+",
    label: "App Integrations",
    subtitle: "with n8n workflow automation",
    color: "emerald",
  },
  {
    icon: <Clock className="w-8 h-8 text-blue-500" />,
    number: "75%",
    label: "Time Saved",
    subtitle: "on repetitive business tasks",
    color: "blue",
  },
  {
    icon: <Bot className="w-8 h-8 text-purple-500" />,
    number: "24/7",
    label: "AI Agent Support",
    subtitle: "automated customer service",
    color: "purple",
  },
  {
    icon: <Settings className="w-8 h-8 text-orange-500" />,
    number: "Zero",
    label: "Code Required",
    subtitle: "for most automation workflows",
    color: "orange",
  },
];

const AIAutomations: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const { isOpen, openModal, closeModal } = useFormModal();

  return (
    <section
      id="services"
      className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-200/50 dark:border-blue-700/50"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4" />
            Core AI Automation Services
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Intelligent Solutions for
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}
              Every Business Need
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transform your operations with our comprehensive suite of AI-powered
            automation services, designed to optimize efficiency, reduce costs,
            and drive sustainable growth.
          </p>
        </motion.div>

        {/* Core Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {coreServices.map((service, index) => (
            <motion.div
              key={service.id}
              className={`relative group cursor-pointer ${service.hoverColor}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredService(service.id)}
              onHoverEnd={() => setHoveredService(null)}
              whileHover={{ scale: 1.02, y: -8 }}
            >
              {/* Card Background with Gradient */}
              <div
                className={`relative h-full bg-gradient-to-br ${service.gradient} rounded-3xl p-8 text-white overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl`}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 text-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/90 mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1 * featureIndex,
                        }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="w-4 h-4 text-white/80 flex-shrink-0" />
                        <span className="text-sm text-white/90">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-white">
                          {value}
                        </div>
                        <div className="text-xs text-white/70 capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <AnimatePresence>
                  {hoveredService === service.id && (
                    <motion.div
                      className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {automationStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-600">
                <div className="flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.subtitle}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        {/* <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-3xl p-12 text-white overflow-hidden">
  
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full" />
            </div>

            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Sparkles className="w-4 h-4" />
                Start Your Automation Journey
              </motion.div>

              <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Transform Your Business?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of businesses already saving 70% of their time
                with our intelligent automation solutions
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openModal}
                >
                  Start Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm opacity-80">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-80">Support</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Form Modal */}
      <FormModal isOpen={isOpen} onClose={closeModal} />
    </section>
  );
};

export default AIAutomations;
