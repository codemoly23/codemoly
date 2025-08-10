"use client";

import React, { useState } from "react";
// no animation needed right now
import { ArrowLeft, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    title: "CodeMoly Studio",
    description:
      "Professional development environment with AI-powered code completion and real-time collaboration.",
    image: "/api/placeholder/600/400",
    category: "Development Tools",
    stats: { users: "50K+", rating: 4.9, downloads: "100K+" },
    features: [
      "AI Code Completion",
      "Real-time Collaboration",
      "Git Integration",
      "Plugin Ecosystem",
    ],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "WebFlow Designer",
    description:
      "Visual website builder with drag-and-drop interface and responsive design capabilities.",
    image: "/api/placeholder/600/400",
    category: "Design Tools",
    stats: { users: "25K+", rating: 4.8, downloads: "75K+" },
    features: [
      "Drag & Drop Builder",
      "Responsive Design",
      "Custom Components",
      "Export Code",
    ],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "API Gateway Pro",
    description:
      "Enterprise-grade API management platform with monitoring, security, and analytics.",
    image: "/api/placeholder/600/400",
    category: "Backend Services",
    stats: { users: "15K+", rating: 4.7, downloads: "50K+" },
    features: [
      "API Monitoring",
      "Security Layer",
      "Analytics Dashboard",
      "Rate Limiting",
    ],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#",
  },
];

const ProductShowcase: React.FC = () => {
  const [, setIndex] = useState(0);
  const prev = () =>
    setIndex((i) => (i - 1 + products.length) % products.length);
  const next = () => setIndex((i) => (i + 1) % products.length);

  return (
    <section id="products" className="py-24 relative bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex items-start justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.2em] text-gray-500 mb-3">
              OUR PRODUCTS —
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.1]">
              Explore our
              <br /> flagship products
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Product - redesigned */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center rounded-3xl border border-indigo-200/60 dark:border-white/10 p-8 bg-[#E9E9FF] dark:bg-indigo-950/30">
            {/* Left: text */}
            <div>
              <div className="text-sm font-semibold tracking-wider text-indigo-700 dark:text-indigo-300 mb-3">
                PROP TRADING SOLUTION
              </div>
              <h3 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
                FundedNext
              </h3>
              <p className="text-gray-700/90 dark:text-gray-300 mb-6 max-w-xl">
                A leading prop trading firm committed to empowering promising
                traders worldwide to achieve maximum trading success.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-500">Pages in Projects</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    40+
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Retention Growth</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    36%
                  </div>
                </div>
              </div>

              <button className="w-full sm:w-auto inline-flex items-center justify-between gap-4 rounded-2xl px-5 py-3 bg-black text-white hover:opacity-90 transition shadow-sm">
                <span className="font-mono text-sm">Enter our PropVerse</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: visual panel */}
            <div className="relative">
              <div className="absolute inset-0 -m-6 sm:-m-8 rounded-3xl opacity-60 pointer-events-none bg-[radial-gradient(600px_200px_at_20%_0%,_rgba(99,102,241,0.25),_transparent),radial-gradient(400px_200px_at_80%_100%,_rgba(244,114,182,0.25),_transparent),radial-gradient(500px_240px_at_50%_40%,_rgba(52,211,153,0.25),_transparent)]" />

              <div className="relative h-full flex items-center justify-center">
                <div className="w-full max-w-md aspect-[4/3] rounded-2xl bg-white shadow-sm border border-indigo-100 p-4 sm:p-6" />

                {/* Stacked 3D mock */}
                <img
                  src="/api/placeholder/460/340"
                  alt="FundedNext 3D"
                  className="absolute w-[60%] max-w-[420px] rotate-[-12deg] translate-x-6 sm:translate-x-10 drop-shadow-xl rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
