"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import Button from "@/components/ui/Button";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/10 rounded-full blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We Build. You Thrive.
              <br />
              <span className="text-white">Your Agile Tech Partner.</span>
            </motion.h1>

            {/* Features List */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center text-white text-lg">
                <div className="w-5 h-5 bg-green-500 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                Tailor software solutions
              </div>
              <div className="flex items-center text-white text-lg">
                <div className="w-5 h-5 bg-green-500 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                Website that converts
              </div>
              <div className="flex items-center text-white text-lg">
                <div className="w-5 h-5 bg-green-500 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                AI-powered SaaS solutions
              </div>
              <div className="flex items-center text-white text-lg">
                <div className="w-5 h-5 bg-green-500 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                Intuitive app development
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                variant="primary"
                size="lg"
                className="group bg-red-600 hover:bg-red-700 text-white"
              >
                Hire Developer
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="primary"
                size="lg"
                className="group bg-red-600 hover:bg-red-700 text-white"
              >
                Contact us!
              </Button>
            </motion.div>
          </div>

          <div className="relative">
            {/* Video/Image placeholder */}
            <motion.div
              className="relative bg-gray-800 rounded-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold mb-2">CODEMOLY</div>
                  <div className="text-4xl font-bold mb-2">OFFICE</div>
                  <div className="text-4xl font-bold">TOUR</div>
                  <div className="mt-4">
                    <Play className="w-16 h-16 mx-auto bg-red-600 rounded-full p-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Company Logos and Rating */}
        <motion.div
          className="mt-16 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Company Logos */}
          <div className="flex items-center space-x-8 mb-8 md:mb-0">
            <div className="text-white text-2xl font-bold">AMGEN</div>
            <div className="text-white text-2xl font-bold">BROCADE</div>
            <div className="text-white text-2xl font-bold">Beiersdorf</div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-white text-lg font-bold ml-2">4.9</span>
            </div>
            <div className="text-white text-sm">from 50+ Reviews</div>
            <div className="text-white text-sm font-bold">Trustpilot</div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-green-400 fill-current" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 right-20 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full shadow-lg"
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg shadow-lg"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </section>
  );
};

export default Hero;
