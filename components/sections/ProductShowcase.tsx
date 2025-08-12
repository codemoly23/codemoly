"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Workflow,
  Brain,
  Settings,
  Target,
  ExternalLink,
  Play,
} from "lucide-react";

const products = [
  {
    id: 1,
    title: "AI Workflow Studio",
    description:
      "Intelligent automation platform that creates, optimizes, and manages complex business workflows with zero-code AI integration.",
    image: "/api/placeholder/600/400",
    category: "AI AUTOMATION PLATFORM",
    gradient: "from-purple-600 via-blue-600 to-cyan-500",
    icon: <Workflow className="w-8 h-8" />,
    stats: { workflows: "10K+", efficiency: "85%", integrations: "400+" },
    features: [
      "Zero-Code AI Workflows",
      "Smart Process Mining",
      "Predictive Optimization",
      "Enterprise Integrations",
    ],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "Neural Process Engine",
    description:
      "Advanced AI engine that learns from your business patterns and automatically optimizes processes for maximum efficiency and cost reduction.",
    image: "/api/placeholder/600/400",
    category: "INTELLIGENT OPTIMIZATION",
    gradient: "from-emerald-500 via-teal-600 to-blue-600",
    icon: <Brain className="w-8 h-8" />,
    stats: { processes: "5K+", savings: "60%", accuracy: "94%" },
    features: [
      "Pattern Recognition AI",
      "Auto-Optimization",
      "Cost Reduction Analytics",
      "Real-time Monitoring",
    ],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Smart Integration Hub",
    description:
      "Seamlessly connect any application or service with AI-powered mapping, transformation, and intelligent data synchronization.",
    image: "/api/placeholder/600/400",
    category: "INTEGRATION PLATFORM",
    gradient: "from-orange-500 via-pink-500 to-purple-600",
    icon: <Settings className="w-8 h-8" />,
    stats: { connections: "2K+", uptime: "99.9%", speed: "3x faster" },
    features: [
      "AI Data Mapping",
      "Real-time Sync",
      "Error Auto-Recovery",
      "Universal Connectors",
    ],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 4,
    title: "Predictive Analytics Suite",
    description:
      "Harness the power of machine learning to predict trends, optimize resources, and make data-driven decisions with unprecedented accuracy.",
    image: "/api/placeholder/600/400",
    category: "PREDICTIVE INTELLIGENCE",
    gradient: "from-indigo-600 via-purple-600 to-pink-500",
    icon: <Target className="w-8 h-8" />,
    stats: { predictions: "1M+", accuracy: "92%", insights: "24/7" },
    features: [
      "ML-Powered Forecasting",
      "Trend Analysis",
      "Resource Optimization",
      "Automated Insights",
    ],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#",
  },
];

const ProductShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
  };

  const next = () => {
    setCurrentIndex((i) => (i + 1) % products.length);
    setIsAutoPlaying(false);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentProduct = products[currentIndex];

  return (
    <section
      id="products"
      className="py-24 relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 flex items-start justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-xs tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3 font-semibold">
              OUR PRODUCTS —
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.1]">
              Explore our
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                flagship products
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={prev}
              aria-label="Previous"
              className="w-12 h-12 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={next}
              aria-label="Next"
              className="w-12 h-12 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Featured Product - Modern Gradient Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`grid lg:grid-cols-2 gap-8 items-center rounded-3xl border border-white/20 dark:border-white/10 p-8 bg-gradient-to-br ${currentProduct.gradient} relative overflow-hidden`}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

              {/* Left: Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    {currentProduct.icon}
                  </div>
                  <div className="text-sm font-bold tracking-wider text-white/90 uppercase">
                    {currentProduct.category}
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight"
                >
                  {currentProduct.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white/90 mb-8 max-w-xl text-lg leading-relaxed"
                >
                  {currentProduct.description}
                </motion.p>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="grid grid-cols-3 gap-6 mb-8"
                >
                  {Object.entries(currentProduct.stats).map(
                    ([key, value], index) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-white/70 uppercase tracking-wider font-medium">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      </div>
                    )
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="inline-flex items-center justify-center gap-3 rounded-2xl px-6 py-3 bg-white text-gray-900 hover:bg-white/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105">
                    <Play className="w-4 h-4" />
                    <span>View Demo</span>
                  </button>
                  <button className="inline-flex items-center justify-center gap-3 rounded-2xl px-6 py-3 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 font-semibold border border-white/30">
                    <ExternalLink className="w-4 h-4" />
                    <span>Learn More</span>
                  </button>
                </motion.div>
              </div>

              {/* Right: Visual Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                <div className="relative h-full flex items-center justify-center">
                  {/* Main Product Visual */}
                  <div className="w-full max-w-md aspect-[4/3] rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 shadow-2xl">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                      <div className="text-6xl text-white/50">
                        {currentProduct.icon}
                      </div>
                    </div>
                  </div>

                  {/* Floating Feature Cards */}
                  <div className="absolute -top-4 -left-4 w-32 h-20 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 p-3 shadow-lg">
                    <div className="text-xs text-white/80 font-medium mb-1">
                      Active Now
                    </div>
                    <div className="text-lg font-bold text-white">
                      {Object.values(currentProduct.stats)[0]}
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 w-36 h-24 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 p-3 shadow-lg">
                    <div className="text-xs text-white/80 font-medium mb-1">
                      Performance
                    </div>
                    <div className="text-lg font-bold text-white">
                      {Object.values(currentProduct.stats)[1]}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Product Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <div className="flex items-center gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {currentIndex + 1} / {products.length}
          </div>
        </motion.div>

        {/* Auto-play Control */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-6"
        >
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isAutoPlaying
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            }`}
          >
            {isAutoPlaying ? "Pause Auto-slide" : "Resume Auto-slide"}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
