"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  Zap,
  Bot,
  Workflow,
  TrendingUp,
  Shield,
  Sparkles,
  Users,
  Award,
} from "lucide-react";
import Button from "@/components/ui/Button";

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: Bot,
      text: "AI-Powered Automation",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Workflow,
      text: "Seamless Integrations",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      text: "Business Intelligence",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      text: "Enterprise Security",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { value: "500+", label: "Businesses Automated" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "50+", label: "AI Integrations" },
    { value: "24/7", label: "Expert Support" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-30 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Modern Background System */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10" />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-30"
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
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 blur-3xl"
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -25, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Neural Network Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1000 600"
        >
          <defs>
            <linearGradient
              id="networkGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={150 + i * 140}
              cy={200 + Math.sin(i) * 100}
              r="4"
              fill="url(#networkGrad)"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.line
              key={`connection-${i}`}
              x1={150 + i * 140}
              y1={200 + Math.sin(i) * 100}
              x2={150 + (i + 1) * 140}
              y2={200 + Math.sin(i + 1) * 100}
              stroke="url(#networkGrad)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Company Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-200">
              Transforming Business Through AI
            </span>
            <Bot className="w-5 h-5 text-purple-400" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[0.95] max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Transforming businesses</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              through vision &
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI innovation
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A leading software company reshaping industries across the globe
            through
            <span className="text-blue-400 font-semibold">
              {" "}
              AI automation, seamless integrations,
            </span>{" "}
            and
            <span className="text-purple-400 font-semibold">
              {" "}
              intelligent solutions
            </span>{" "}
            that drive meaningful change.
          </motion.p>

          {/* Animated Feature Showcase */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {(() => {
                    const IconComponent = features[currentFeature].icon;
                    return (
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${features[currentFeature].color} flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    );
                  })()}
                  <span className="text-white text-lg font-semibold">
                    {features[currentFeature].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 px-8 py-4"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Your AI Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="group bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-sm px-8 py-4"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Our Story
            </Button>
          </motion.div>

          {/* Awards Section */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <Award className="w-8 h-8 text-yellow-400" />
              <div>
                <div className="text-white font-semibold">
                  Best AI Innovation
                </div>
                <div className="text-gray-400 text-sm">
                  TechCrunch Awards 2024
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-white font-semibold">
                  Enterprise Excellence
                </div>
                <div className="text-gray-400 text-sm">Fortune 500 Partner</div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
