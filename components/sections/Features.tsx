'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Smartphone, 
  Brain, 
  Shield, 
  Zap, 
  Globe,
  Database,
  Palette,
  Users,
  BarChart3,
  Rocket,
  Heart
} from 'lucide-react';
import { BentoFeatureGrid, BentoFeatureItem } from '@/components/ui/BentoGrid';

const features = [
  {
    title: "Web Development",
    description: "Build responsive, fast-loading websites with modern frameworks and best practices.",
    icon: <Code2 className="w-6 h-6" />,
    span: "md:col-span-3 lg:col-span-6",
    height: "md" as const,
    variant: "featured" as const,
    stats: "500+ Projects"
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    icon: <Smartphone className="w-6 h-6" />,
    span: "md:col-span-3 lg:col-span-6",
    height: "md" as const,
    variant: "default" as const,
    stats: "200+ Apps"
  },
  {
    title: "AI Integration",
    description: "Leverage artificial intelligence to enhance user experiences and automate processes.",
    icon: <Brain className="w-6 h-6" />,
    span: "md:col-span-2 lg:col-span-4",
    height: "sm" as const,
    variant: "default" as const
  },
  {
    title: "Security First",
    description: "Enterprise-grade security with encryption and compliance standards.",
    icon: <Shield className="w-6 h-6" />,
    span: "md:col-span-2 lg:col-span-4",
    height: "sm" as const,
    variant: "default" as const
  },
  {
    title: "Lightning Fast",
    description: "Optimized performance with CDN delivery and caching strategies.",
    icon: <Zap className="w-6 h-6" />,
    span: "md:col-span-2 lg:col-span-4",
    height: "sm" as const,
    variant: "default" as const
  },
  {
    title: "Global Reach",
    description: "Multi-language support and international deployment capabilities.",
    icon: <Globe className="w-6 h-6" />,
    span: "md:col-span-3 lg:col-span-6",
    height: "md" as const,
    variant: "minimal" as const
  },
  {
    title: "Database Solutions",
    description: "Scalable database architecture with real-time synchronization.",
    icon: <Database className="w-6 h-6" />,
    span: "md:col-span-3 lg:col-span-6",
    height: "md" as const,
    variant: "minimal" as const
  }
];

const additionalFeatures = [
  { title: "Custom Design", icon: <Palette className="w-5 h-5" />, description: "Tailored UI/UX design" },
  { title: "Team Collaboration", icon: <Users className="w-5 h-5" />, description: "Built-in team tools" },
  { title: "Analytics", icon: <BarChart3 className="w-5 h-5" />, description: "Detailed insights" },
  { title: "Quick Deploy", icon: <Rocket className="w-5 h-5" />, description: "One-click deployment" }
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
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Modern Development</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to build, deploy, and scale your applications with confidence.
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
            {features.map((feature, index) => (
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
          {additionalFeatures.map((feature, index) => (
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
            Explore All Features
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
