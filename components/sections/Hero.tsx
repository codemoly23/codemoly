"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Bot,
  Workflow,
  TrendingUp,
  Shield,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import FormModal from "@/components/ui/FormModal";
import { useFormModal } from "@/hooks/useFormModal";

interface HeroProps {
  videoUrl?: string;
}

const Hero = ({ videoUrl = "https://www.youtube.com/embed/9s2ydfkRz2E" }: HeroProps) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const { isOpen, openModal, closeModal } = useFormModal();

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 sm:pt-28 pb-8 sm:pb-14 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
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

        {/* Floating Elements - Reduced on mobile */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
          animate={{
            x: [0, 25, -15, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-32 sm:w-80 h-32 sm:h-80 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 blur-3xl"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 25, -12, 0],
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

      <div className="relative z-10 max-w-7xl mx-auto mobile-px-reduced sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Company Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-blue-200">
              Transforming Business Through AI
            </span>
            <Bot className="w-4 sm:w-5 h-4 sm:h-5 text-purple-400" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-[1.1] sm:leading-[0.95] max-w-5xl mx-auto mobile-text-hero tablet-text-hero"
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
            className="text-base sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0"
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
            that drive business growth.
          </motion.p>

          {/* Animated Feature Showcase */}
          {/* <motion.div
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
                  <span className="text-white text-sm sm:text-base lg:text-lg font-semibold">
                    {features[currentFeature].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div> */}

          {/* CTA Button */}
          <motion.div
            className="flex justify-center mb-10 sm:mb-16 px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 mobile-btn-lg sm:px-8 sm:py-4 w-full sm:w-auto max-w-sm sm:max-w-none"
              onClick={openModal}
            >
              <Zap className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              <span className="text-sm sm:text-base">
                Book a Free Consultant
              </span>
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Featured Video */}
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 backdrop-blur-sm group">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl" />
              <div className="absolute inset-[2px] bg-gray-900/50 rounded-2xl" />

              {/* YouTube Video Embed */}
              <iframe
                className="absolute inset-[2px] w-full h-full rounded-2xl border-0"
                src={`${videoUrl}?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0&mute=0&loop=0`}
                title="CodeMoly - Transforming Business Through AI Innovation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60 animate-pulse" />
            </div>

            {/* Video Caption */}
            {/* <motion.p
              className="text-center text-gray-400 text-sm mt-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Watch how CodeMoly transforms businesses through AI innovation
            </motion.p> */}
          </motion.div>
        </div>
      </div>

      {/* Form Modal */}
      <FormModal isOpen={isOpen} onClose={closeModal} />
    </section>
  );
};

export default Hero;
