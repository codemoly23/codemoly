"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Helper function to get solid color from gradient class
const getGradientColor = (gradientClass: string) => {
  const colorMap: { [key: string]: string } = {
    "from-blue-600": "#2563eb",
    "from-orange-600": "#ea580c",
    "from-green-600": "#16a34a",
    "from-purple-600": "#9333ea",
    "from-pink-600": "#db2777",
    "from-red-600": "#dc2626",
    "from-yellow-600": "#ca8a04",
    "from-indigo-600": "#4f46e5",
  };

  // Extract the from-color from gradient class
  const fromColorMatch = gradientClass.match(/from-(\w+-\d+)/);
  if (fromColorMatch) {
    return colorMap[`from-${fromColorMatch[1]}`] || "#2563eb";
  }
  return "#2563eb"; // default blue
};

const Events: React.FC = () => {
  const events = [
    {
      id: 1,
      title: "VivaTech 2025",
      subtitle: "In Paris",
      image: "/event-1.jpg",
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      id: 2,
      title: "VivaTech 2025",
      subtitle: "In Paris",
      image: "/event-2.jpg",
      gradient: "from-orange-500 to-yellow-400",
    },
    {
      id: 3,
      title: "VivaTech 2025",
      subtitle: "In Paris",
      image: "/event-3.jpg",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      id: 4,
      title: "VivaTech 2025",
      subtitle: "In Paris",
      image: "/event-4.jpg",
      gradient: "from-purple-500 to-pink-400",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-500 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Global Events
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Experience CodeMoly on the world stage at VivaTech 2025 and other
              premier global tech events. We connect with innovators, startups,
              and industry leaders to share ideas, build partnerships, and
              showcase our cutting-edge solutions. At CodeMoly, we’re more than
              just a top-tier development firm — we’re a global community of
              passionate developers and tech professionals dedicated to
              learning, growing, and creating impactful success stories.
            </p>

            {/* <button className="text-white hover:text-gray-300 transition-colors duration-300 underline underline-offset-4 text-lg font-medium">
              Learn more
            </button> */}
          </motion.div>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Card Background Image */}
              <div className="absolute inset-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Bottom Gradient Overlay - starts from bottom and fades up */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500 to-transparent opacity-90`}
                  style={{
                    background: `linear-gradient(to top, ${getGradientColor(
                      event.gradient
                    )}, transparent)`,
                  }}
                ></div>
              </div>

              {/* Card Content */}
              <div className="relative h-64 sm:h-72 lg:h-80 p-4 sm:p-6 flex flex-col justify-between text-white">
                {/* Top Content */}
                <div>
                  <div className="text-xs sm:text-sm font-medium opacity-90 mb-2">
                    {/* {event.location} - {event.date} */}
                  </div>
                </div>

                {/* Bottom Content */}
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg font-semibold opacity-90">
                    {event.subtitle}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
