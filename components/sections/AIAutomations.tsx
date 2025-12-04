"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import {
  Bot,
  Workflow,
  CheckCircle,
  Clock,
  Settings,
  Sparkles,
} from "lucide-react";
import FormModal from "@/components/ui/FormModal";
import { useFormModal } from "@/hooks/useFormModal";

// Database service type
interface DbService {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
  stats: Record<string, string>;
  order: number;
  isActive: boolean;
}

// Static automation stats (can be made dynamic later)
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

interface AIAutomationsProps {
  title?: string;
  description?: string;
  services?: DbService[];
}

const AIAutomations: React.FC<AIAutomationsProps> = ({
  title = "Intelligent Solutions for Every Business Need",
  description = "Transform your operations with our comprehensive suite of AI-powered automation services, designed to optimize efficiency, reduce costs, and drive sustainable growth.",
  services = [],
}) => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const { isOpen, openModal, closeModal } = useFormModal();

  // Helper function to get Lucide icon component by name
  const getIconComponent = (iconName: string) => {
    const Icon = (
      LucideIcons as Record<
        string,
        React.ComponentType<{ className?: string }>
      >
    )[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : <Workflow className="w-8 h-8" />;
  };

  // Generate hover color from gradient
  const getHoverColor = (gradient: string) => {
    if (gradient.includes("blue")) return "hover:shadow-blue-500/25";
    if (gradient.includes("emerald") || gradient.includes("green")) return "hover:shadow-emerald-500/25";
    if (gradient.includes("orange")) return "hover:shadow-orange-500/25";
    if (gradient.includes("violet") || gradient.includes("purple")) return "hover:shadow-violet-500/25";
    if (gradient.includes("pink") || gradient.includes("rose")) return "hover:shadow-pink-500/25";
    if (gradient.includes("cyan")) return "hover:shadow-cyan-500/25";
    return "hover:shadow-blue-500/25";
  };

  return (
    <section
      id="services"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 relative overflow-hidden"
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
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 border border-blue-200/50 dark:border-blue-700/50"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-3 sm:w-4 h-3 sm:h-4" />
            Core AI Automation Services
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Core Services Grid */}
        {services.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {services.map((service, index) => {
              const features = (service.features as string[]) || [];
              const stats = (service.stats as Record<string, string>) || {};

              return (
                <motion.div
                  key={service.id}
                  className={`relative group cursor-pointer ${getHoverColor(service.gradient)}`}
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
                        {getIconComponent(service.icon)}
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
                        {features.map((feature, featureIndex) => (
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
                        {Object.entries(stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-white">
                              {value}
                            </div>
                            <div className="text-xs text-white/70 capitalize">
                              {key.replace(/_/g, " ")}
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
              );
            })}
          </motion.div>
        )}

        {/* Performance Stats */}
        <motion.div
          className="grid mobile-grid-2 sm:grid-cols-2 lg:grid-cols-4 mobile-gap-reduced sm:gap-6"
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
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
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

              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Ready to Transform Your Business?
              </h3>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
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
