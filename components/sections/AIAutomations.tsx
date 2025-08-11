"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Zap,
  Shield,
  Workflow,
  Brain,
  Target,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
} from "lucide-react";

const automationStats = [
  {
    icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
    number: "85%",
    label: "ROI Expected",
    subtitle: "by 2027 for scaled AI investments",
    color: "emerald",
  },
  {
    icon: <Clock className="w-8 h-8 text-blue-500" />,
    number: "50%",
    label: "Time Reduction",
    subtitle: "in product development cycles",
    color: "blue",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-purple-500" />,
    number: "40%",
    label: "Cost Savings",
    subtitle: "through operational automation",
    color: "purple",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
    number: "0.6%",
    label: "Productivity Growth",
    subtitle: "annual increase through 2040",
    color: "orange",
  },
];

const automationFeatures = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Intelligent Process Automation",
    description:
      "Automate repetitive business processes with AI-powered workflows that learn and adapt to your operations, reducing manual effort by up to 70%.",
    benefits: [
      "Document Processing",
      "Data Entry Automation",
      "Workflow Optimization",
    ],
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Predictive Analytics Integration",
    description:
      "Leverage machine learning to predict market trends, customer behavior, and operational bottlenecks before they impact your business.",
    benefits: [
      "Demand Forecasting",
      "Risk Assessment",
      "Performance Prediction",
    ],
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Smart Business Intelligence",
    description:
      "Transform raw data into actionable insights with AI-driven analytics that identify growth opportunities and operational inefficiencies.",
    benefits: ["Real-time Dashboards", "Automated Reporting", "Trend Analysis"],
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Customer Experience Automation",
    description:
      "Enhance customer interactions with AI chatbots, personalized recommendations, and automated support systems that scale with your business.",
    benefits: [
      "24/7 Customer Support",
      "Personalization Engine",
      "Lead Qualification",
    ],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Security & Compliance Automation",
    description:
      "Protect your business with AI-powered security monitoring, automated compliance checks, and real-time threat detection systems.",
    benefits: ["Threat Detection", "Compliance Monitoring", "Risk Management"],
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Performance Optimization",
    description:
      "Continuously optimize system performance, resource allocation, and operational efficiency through intelligent automation and monitoring.",
    benefits: [
      "Resource Optimization",
      "Performance Monitoring",
      "Cost Reduction",
    ],
  },
];

const AIAutomations: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Bot className="w-4 h-4" />
            AI-Powered Business Transformation
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Automate & Integrate for
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}
              Exponential Growth
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transform your business operations with AI-driven automation that
            reduces costs by 40%, cuts development cycles in half, and delivers
            85% ROI by 2027.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {automationStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-2xl mb-6">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {stat.label}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.subtitle}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {automationFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <div className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join industry leaders who&apos;ve achieved 85% ROI through AI
              automation
            </p>
            <motion.button
              className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your AI Journey
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAutomations;
