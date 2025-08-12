"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Events: React.FC = () => {
  const events = [
    {
      id: 1,
      title: "Rise Up",
      subtitle: "Live The Dream",
      location: "Australia",
      date: "30 December 2024",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      id: 2,
      title: "Painting Hopes",
      subtitle: "In Argentina",
      location: "Argentina",
      date: "15 December 2024",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-orange-500 to-yellow-400",
    },
    {
      id: 3,
      title: "Dreams In",
      subtitle: "The Making",
      location: "Nigeria",
      date: "10 December 2024",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      id: 4,
      title: "Lifting Spirits",
      subtitle: "Beyond Limits",
      location: "Chile",
      date: "05 December 2024",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
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
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Dive into CodeMoly&apos;s global events, where coding enthusiasts
              connect, engage, and grow. We&apos;re more than the best
              development firm, we&apos;re a community of new and experienced
              developers committed to learning, growing, and finding success.
            </p>

            {/* <button className="text-white hover:text-gray-300 transition-colors duration-300 underline underline-offset-4 text-lg font-medium">
              Learn more
            </button> */}
          </motion.div>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-500`}
                ></div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Card Content */}
              <div className="relative h-80 p-6 flex flex-col justify-between text-white">
                {/* Top Content */}
                <div>
                  <div className="text-sm font-medium opacity-90 mb-2">
                    {event.location} - {event.date}
                  </div>
                </div>

                {/* Bottom Content */}
                <div>
                  <h3 className="text-2xl font-bold mb-1 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-lg font-semibold opacity-90">
                    {event.subtitle}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-6 h-6 text-white" />
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
