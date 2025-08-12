"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Brain,
  Shield,
  Zap,
  Bot,
  TestTube,
  GitBranch,
  Sparkles,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Target,
  Settings,
} from "lucide-react";

// Core AI Development Features with Real-World Metrics
const coreFeatures = [
  {
    id: 1,
    title: "Intelligent Coding",
    subtitle: "70% Faster Development",
    description:
      "AI-powered code synthesis and auto-completion reduce manual effort while maintaining enterprise-grade standards.",
    longDescription:
      "Our advanced AI models understand context, patterns, and best practices to generate high-quality code that integrates seamlessly with your existing codebase. Experience unprecedented development velocity without compromising on quality or security.",
    icon: <Code2 className="w-8 h-8" />,
    percentage: 70,
    metric: "Faster Development",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    features: [
      "Context-aware code generation",
      "Intelligent auto-completion",
      "Best practice enforcement",
    ],
    stats: { projects: "10K+", lines: "50M+", accuracy: "94%" },
  },
  {
    id: 2,
    title: "Bulletproof QA",
    subtitle: "99.9% Defect-Free Releases",
    description:
      "Self-learning test suites detect bugs early, with automated fixes for flawless deployments.",
    longDescription:
      "Advanced machine learning algorithms continuously analyze your codebase to predict potential issues, generate comprehensive test cases, and automatically fix common bugs before they reach production.",
    icon: <TestTube className="w-8 h-8" />,
    percentage: 99.9,
    metric: "Defect-Free Releases",
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    features: [
      "Predictive bug detection",
      "Automated test generation",
      "Self-healing code",
    ],
    stats: { bugs: "95% fewer", coverage: "98%", time: "80% saved" },
  },
  {
    id: 3,
    title: "Peak Performance",
    subtitle: "40% Higher Efficiency",
    description:
      "ML algorithms optimize resource allocation, predict scaling needs, and eliminate bottlenecks in real-time.",
    longDescription:
      "Intelligent performance monitoring and optimization systems that learn from your application's behavior patterns to proactively optimize resource usage, predict scaling requirements, and maintain peak performance.",
    icon: <Zap className="w-8 h-8" />,
    percentage: 40,
    metric: "Higher Efficiency",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    features: [
      "Real-time optimization",
      "Predictive scaling",
      "Resource intelligence",
    ],
    stats: { latency: "60% lower", uptime: "99.99%", costs: "35% reduced" },
  },
  {
    id: 4,
    title: "Zero-Downtime DevOps",
    subtitle: "90% Faster Deployments",
    description:
      "AI-driven CI/CD pipelines automate rollbacks and canary releases for seamless updates.",
    longDescription:
      "Sophisticated deployment orchestration that uses machine learning to predict deployment risks, automate rollback decisions, and ensure zero-downtime releases through intelligent traffic routing and canary deployments.",
    icon: <GitBranch className="w-8 h-8" />,
    percentage: 90,
    metric: "Faster Deployments",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    features: [
      "Intelligent rollbacks",
      "Automated canary releases",
      "Risk prediction",
    ],
    stats: { deployments: "500+/day", downtime: "0 minutes", success: "99.8%" },
  },
];

// Additional Development Tools
const developmentTools = [
  {
    title: "AI Documentation",
    icon: <Bot className="w-6 h-6" />,
    description: "Auto-generated docs & comments",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Smart Debugging",
    icon: <Brain className="w-6 h-6" />,
    description: "AI-powered error resolution",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Code Refactoring",
    icon: <Settings className="w-6 h-6" />,
    description: "Intelligent code optimization",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Security Scanning",
    icon: <Shield className="w-6 h-6" />,
    description: "Automated vulnerability detection",
    color: "from-red-500 to-orange-500",
  },
];

// Trust Metrics
const trustMetrics = [
  {
    icon: <Target className="w-6 h-6" />,
    value: "500+",
    label: "Projects",
    subtitle: "Successfully delivered",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    value: "100%",
    label: "IP Protection",
    subtitle: "Enterprise security",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: "Top 1%",
    label: "Talent",
    subtitle: "Global developers",
  },
];

const Features: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/10 dark:to-indigo-900/20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-600/5 rounded-full blur-3xl" />
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
            AI-Driven Development Excellence
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="block">AI-Powered Features for</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Accelerated Development
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We integrate cutting-edge AI across the development lifecycle -
            delivering solutions 10X faster with unmatched reliability. Our
            engineers augment human expertise with AI to automate, optimize, and
            future-proof your software.
          </p>
        </motion.div>

        {/* Main Features Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Side - Feature Description */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                AI-Driven Development Excellence
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We integrate cutting-edge AI across the development lifecycle -
                delivering solutions 10X faster with unmatched reliability. Our
                engineers augment human expertise with AI to automate, optimize,
                and future-proof your software.
              </p>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {trustMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center mb-2 text-blue-600 dark:text-blue-400">
                    {metric.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {metric.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {metric.subtitle}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl">
                10X Faster Delivery
                <motion.div
                  className="flex items-center"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Our world-class engineers leverage cutting-edge AI to deliver
                solutions 10X faster without compromising quality.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Feature Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                onHoverStart={() => setSelectedFeature(feature.id)}
                onHoverEnd={() => setSelectedFeature(null)}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div
                  className={`relative bg-gradient-to-r ${feature.gradient} rounded-3xl p-8 text-white overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl text-white"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <div>
                          <h4 className="text-2xl font-bold mb-1">
                            {feature.title}
                          </h4>
                          <div className="text-white/90 text-sm font-medium">
                            {feature.subtitle}
                          </div>
                        </div>
                      </div>

                      <p className="text-white/90 mb-4 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2">
                        {feature.features.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4 text-white/80 flex-shrink-0" />
                            <span className="text-sm text-white/90">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Percentage Display */}
                    <div className="text-right">
                      <div className="text-4xl font-bold text-white mb-1">
                        {feature.percentage}%
                      </div>
                      <div className="text-xs text-white/80 leading-tight">
                        {feature.metric}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <AnimatePresence>
                    {selectedFeature === feature.id && (
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
        </div>

        {/* Development Tools */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Development Toolkit
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive AI-powered tools that cover every aspect of modern
              software development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-600 h-full">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {tool.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                      {tool.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Call to Action */}
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
                Experience AI Development
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Ready to Accelerate Your Development?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join leading companies already building 10X faster with our
                AI-powered development platform
              </p>

              <motion.div
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Building Today
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Features;
