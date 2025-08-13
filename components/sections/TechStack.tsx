"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

// Split technologies into two rows for alternating slide directions
const firstRowTechnologies = [
  { name: "Frontend", logo: "/api/placeholder/60/60" },
  { name: "Backend", logo: "/api/placeholder/60/60" },
  { name: "App", logo: "/api/placeholder/60/60" },
  { name: "Database", logo: "/api/placeholder/60/60" },
  { name: "AWS", logo: "/api/placeholder/60/60" },
  { name: "Docker", logo: "/api/placeholder/60/60" },
  { name: "Kubernetes", logo: "/api/placeholder/60/60" },
  { name: "Vercel", logo: "/api/placeholder/60/60" },
];

const secondRowTechnologies = [
  { name: "n8n", logo: "/api/placeholder/60/60" },
  { name: "LangChain", logo: "/api/placeholder/60/60" },
  { name: "Shopify", logo: "/api/placeholder/60/60" },
  { name: "WordPress", logo: "/api/placeholder/60/60" },
  { name: "Wix", logo: "/api/placeholder/60/60" },
  { name: "Magento Shop", logo: "/api/placeholder/60/60" },
  { name: "GTM", logo: "/api/placeholder/60/60" },
];

// Duplicate arrays for seamless infinite scroll
const duplicatedFirstRow = [...firstRowTechnologies, ...firstRowTechnologies];
// Reverse the second row for right-to-left visual effect
const duplicatedSecondRow = [
  ...secondRowTechnologies.reverse(),
  ...secondRowTechnologies,
];

const TechStack: React.FC = () => {
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstRowContainer = firstRowRef.current;
    const secondRowContainer = secondRowRef.current;

    if (!firstRowContainer || !secondRowContainer) return;

    let firstRowScrollAmount = 0;
    let secondRowScrollAmount = 0;
    const scrollSpeed = 1;

    const scroll = () => {
      // First row scrolls left to right (normal direction)
      firstRowScrollAmount += scrollSpeed;
      if (firstRowScrollAmount >= firstRowContainer.scrollWidth / 2) {
        firstRowScrollAmount = 0;
      }
      firstRowContainer.scrollLeft = firstRowScrollAmount;

      // Second row scrolls right to left (reverse direction)
      // Start from the right side and move left
      secondRowScrollAmount += scrollSpeed;
      if (secondRowScrollAmount >= secondRowContainer.scrollWidth / 2) {
        secondRowScrollAmount = 0;
      }
      // For right-to-left effect, we scroll from the end backwards
      secondRowContainer.scrollLeft =
        secondRowContainer.scrollWidth / 2 - secondRowScrollAmount;
    };

    const intervalId = setInterval(scroll, 20);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-600/5 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Code2 className="w-4 h-4" />
            TECHNOLOGY EXPERTISE
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Modern Tech Stack &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We leverage cutting-edge technologies and proven frameworks to build
            scalable, high-performance solutions that drive your business
            forward.
          </p>
        </motion.div>

        {/* Two-Row Sliding Technology Carousel */}
        <motion.div
          className="relative space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* First Row - Slides Left to Right */}
          <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent z-10" />

            <div
              ref={firstRowRef}
              className="flex gap-6 py-6 overflow-hidden"
              style={{ scrollBehavior: "auto" }}
            >
              {duplicatedFirstRow.map((tech, index) => (
                <motion.div
                  key={`first-${tech.name}-${index}`}
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-center px-6 py-3 bg-white dark:bg-white/10 backdrop-blur-md rounded-xl border border-gray-200 dark:border-white/20 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-white/20 transition-all duration-300 min-w-[140px]">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 whitespace-nowrap">
                      {tech.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Second Row - Slides Right to Left */}
          <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent z-10" />

            <div
              ref={secondRowRef}
              className="flex gap-6 py-6 overflow-hidden"
              style={{ scrollBehavior: "auto" }}
            >
              {duplicatedSecondRow.map((tech, index) => (
                <motion.div
                  key={`second-${tech.name}-${index}`}
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-center px-6 py-3 bg-white dark:bg-white/10 backdrop-blur-md rounded-xl border border-gray-200 dark:border-white/20 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-white/20 transition-all duration-300 min-w-[140px]">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 whitespace-nowrap">
                      {tech.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
