"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  GraduationCap,
  Users,
  BarChart3,
  ExternalLink,
  Play,
} from "lucide-react";

const products = [
  {
    id: 1,
    title: "MolyEcom - AI-Powered E-commerce Platform",
    description:
      "Complete e-commerce solution with AI-driven product recommendations, automated inventory management, and intelligent customer analytics for maximum sales conversion.",
    image: "/molyecom.jpg",
    category: "E-COMMERCE PLATFORM",
    gradient: "from-purple-600 via-blue-600 to-cyan-500",
    icon: <ShoppingCart className="w-8 h-8" />,
    stats: { stores: "500+", conversion: "35%", revenue: "+180%" },
    features: [
      "AI Product Recommendations",
      "Smart Inventory Management",
      "Customer Analytics",
      "Multi-Channel Integration",
    ],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "MolyLearn - Smart LMS Platform",
    description:
      "Intelligent learning management system with AI-powered course creation, personalized learning paths, and advanced analytics for enhanced educational outcomes.",
    image: "/molylearn.jpg",
    category: "LEARNING MANAGEMENT",
    gradient: "from-emerald-500 via-teal-600 to-blue-600",
    icon: <GraduationCap className="w-8 h-8" />,
    stats: { students: "50K+", completion: "89%", satisfaction: "4.8/5" },
    features: [
      "AI Course Generation",
      "Personalized Learning Paths",
      "Progress Analytics",
      "Interactive Assessments",
    ],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "MolyFlow - CRM Automation System",
    description:
      "Comprehensive CRM solution with intelligent lead management, automated sales workflows, and AI-powered customer insights for enhanced relationship management.",
    image: "/molyflow.jpg",
    category: "CRM AUTOMATION",
    gradient: "from-orange-500 via-pink-500 to-purple-600",
    icon: <Users className="w-8 h-8" />,
    stats: { leads: "25K+", conversion: "42%", automation: "90%" },
    features: [
      "Smart Lead Scoring",
      "Automated Workflows",
      "Customer Journey Mapping",
      "Sales Pipeline Analytics",
    ],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 4,
    title: "Bebsadar - POS and Inventory Management System",
    description:
      "Advanced point-of-sale and inventory management solution with real-time stock tracking, automated reordering, and comprehensive sales analytics for retail businesses.",
    image: "/bebsadar.jpg",
    category: "POS & INVENTORY",
    gradient: "from-indigo-600 via-purple-600 to-pink-500",
    icon: <BarChart3 className="w-8 h-8" />,
    stats: { transactions: "1M+", accuracy: "99.8%", uptime: "24/7" },
    features: [
      "Real-time Inventory Tracking",
      "Automated Reordering",
      "Sales Analytics Dashboard",
      "Multi-location Support",
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
      className="mobile-py-reduced sm:py-24 relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30"
    >
      <div className="max-w-7xl mx-auto mobile-px-reduced sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12 sm:mb-16 flex flex-col sm:flex-row items-start justify-between mobile-gap-reduced sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-xs tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3 font-semibold">
              OUR PRODUCTS —
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mobile-text-section">
              Explore our
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                flagship products
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <motion.button
              onClick={prev}
              aria-label="Previous"
              className="group relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 p-[2px] shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.08, rotate: -2 }}
              whileTap={{ scale: 0.92 }}
            >
              <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-gray-800 dark:group-hover:to-gray-700 transition-all duration-300">
                <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </motion.button>
            <motion.button
              onClick={next}
              aria-label="Next"
              className="group relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-600 to-orange-500 p-[2px] shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.92 }}
            >
              <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-50 group-hover:to-pink-50 dark:group-hover:from-gray-800 dark:group-hover:to-gray-700 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-600 to-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
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
                  className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
                >
                  <motion.div
                    className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl sm:rounded-3xl bg-white shadow-xl flex items-center justify-center group overflow-hidden"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Gradient background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 opacity-60"></div>
                    {/* Icon with enhanced styling */}
                    <div className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-700 group-hover:text-blue-600 transition-all duration-300 transform group-hover:scale-110">
                      {currentProduct.icon}
                    </div>
                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Enhanced shadow */}
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl shadow-inner opacity-10"></div>
                  </motion.div>
                  <div className="text-xs sm:text-sm font-bold tracking-wider text-white/90 uppercase">
                    {currentProduct.category}
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight"
                >
                  {currentProduct.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white/90 mb-6 sm:mb-8 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed"
                >
                  {currentProduct.description}
                </motion.p>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
                >
                  {Object.entries(currentProduct.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                        {value}
                      </div>
                      <div className="text-xs text-white/70 uppercase tracking-wider font-medium">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <button className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 hover:bg-white/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>View Demo</span>
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 font-semibold border border-white/30 text-sm sm:text-base">
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
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
                  <div className="w-full max-w-xs sm:max-w-md aspect-[4/3] rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 sm:p-6 shadow-2xl">
                    <div className="w-full h-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                      <Image
                        src={currentProduct.image}
                        alt={currentProduct.title}
                        className="w-full h-auto max-h-full"
                        width={600}
                        height={400}
                      />
                    </div>
                  </div>

                  {/* Floating Stats Cards */}
                  <div className="absolute top-4 left-4 w-24 sm:w-28 lg:w-32 h-16 sm:h-18 lg:h-20 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/50 p-2 sm:p-3 shadow-2xl">
                    <div className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">
                      {Object.keys(currentProduct.stats)[0]
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 flex items-center gap-1">
                      {Object.values(currentProduct.stats)[0]}
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 w-28 sm:w-32 lg:w-36 h-18 sm:h-20 lg:h-24 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/50 p-2 sm:p-3 shadow-2xl">
                    <div className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">
                      {Object.keys(currentProduct.stats)[1]
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 flex items-center gap-1">
                      {Object.values(currentProduct.stats)[1]}
                      <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Third floating stat */}
                  <div className="absolute top-4 right-4 w-24 sm:w-28 lg:w-32 h-16 sm:h-18 lg:h-20 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/50 p-2 sm:p-3 shadow-2xl">
                    <div className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">
                      {Object.keys(currentProduct.stats)[2]
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 flex items-center gap-1">
                      {Object.values(currentProduct.stats)[2]}
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
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
          <div className="flex items-center gap-3">
            {products.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`relative transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 shadow-lg"
                    : "w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-500 dark:hover:from-gray-500 dark:hover:to-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to product ${index + 1}`}
              >
                {/* Active indicator glow */}
                {index === currentIndex && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-30 blur-sm" />
                )}
              </motion.button>
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
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              isAutoPlaying
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700"
                : "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-500 shadow-md hover:shadow-lg"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect for active state */}
            {isAutoPlaying && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-lg" />
            )}
            <span className="relative z-10">
              {isAutoPlaying ? "Pause Auto-slide" : "Resume Auto-slide"}
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
