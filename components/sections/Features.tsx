"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  Shield,
  Zap,
  Bot,
  TestTube,
  GitBranch,
  Cpu,
  Heart,
} from "lucide-react";
import { BentoFeatureGrid, BentoFeatureItem } from "@/components/ui/BentoGrid";

const features = [
  {
    title: "AI Code Generation",
    description:
      "Generate high-quality code 55% faster with AI-powered development tools. Complete coding tasks in half the time with intelligent suggestions and automated boilerplate generation.",
    icon: <Code2 className="w-6 h-6" />,
    span: "md:col-span-3 lg:col-span-6",
    height: "md" as const,
    variant: "featured" as const,
    stats: "55% Faster Development",
  },
  {
    title: "Intelligent Testing",
    description:
      "AI-powered automated testing reduces bugs by 30-40% and identifies vulnerabilities 80% faster than manual testing, ensuring robust application quality.",
    icon: <TestTube className="w-6 h-6" />,
    span: "md:col-span-3 lg:col-span-6",
    height: "md" as const,
    variant: "default" as const,
    stats: "80% Faster Bug Detection",
  },
  {
    title: "Smart Code Review",
    description:
      "AI analyzes code patterns, suggests optimizations, and ensures best practices with real-time feedback and automated quality checks.",
    icon: <Brain className="w-6 h-6" />,
    span: "md:col-span-2 lg:col-span-4",
    height: "sm" as const,
    variant: "default" as const,
  },
  {
    title: "Automated Security",
    description:
      "AI-driven security scanning detects vulnerabilities early in development, ensuring enterprise-grade protection with continuous monitoring.",
    icon: <Shield className="w-6 h-6" />,
    span: "md:col-span-2 lg:col-span-4",
    height: "sm" as const,
    variant: "default" as const,
  },
  {
    title: "Performance Optimization",
    description:
      "AI optimizes application performance automatically, reducing load times and improving user experience through intelligent caching and resource management.",
    icon: <Zap className="w-6 h-6" />,
    span: "md:col-span-2 lg:col-span-4",
    height: "sm" as const,
    variant: "default" as const,
  },
  {
    title: "Continuous Integration",
    description:
      "AI-enhanced CI/CD pipelines automate deployment processes, reducing deployment time by 60% while maintaining zero-downtime releases.",
    icon: <GitBranch className="w-6 h-6" />,
    span: "md:col-span-3 lg:col-span-6",
    height: "md" as const,
    variant: "minimal" as const,
  },
  {
    title: "Predictive Analytics",
    description:
      "Machine learning algorithms predict system behavior, optimize resource allocation, and prevent issues before they impact users.",
    icon: <Cpu className="w-6 h-6" />,
    span: "md:col-span-3 lg:col-span-6",
    height: "md" as const,
    variant: "minimal" as const,
  },
];

const additionalFeatures = [
  {
    title: "AI Documentation",
    icon: <Bot className="w-5 h-5" />,
    description: "Auto-generated docs & comments",
  },
  {
    title: "Smart Debugging",
    icon: <Brain className="w-5 h-5" />,
    description: "AI-powered error resolution",
  },
  {
    title: "Code Refactoring",
    icon: <Code2 className="w-5 h-5" />,
    description: "Intelligent code optimization",
  },
  {
    title: "Deployment Intelligence",
    icon: <Zap className="w-5 h-5" />,
    description: "AI-optimized release cycles",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            AI-Powered Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Accelerated Development
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Leverage cutting-edge AI technology to build, test, and deploy
            applications 55% faster with enterprise-grade quality and security.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <BentoFeatureGrid>
            {features.map((feature) => (
              <BentoFeatureItem
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                span={feature.span}
                height={feature.height}
                variant={feature.variant}
                className="group cursor-pointer"
              >
                {feature.stats && (
                  <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium">
                    {feature.stats}
                  </div>
                )}

                {/* Interactive Element */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-red-500" />
                  </div>
                </div>
              </BentoFeatureItem>
            ))}
          </BentoFeatureGrid>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {additionalFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mr-3">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 cursor-pointer group">
            Experience AI Development
            <motion.div
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
