"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, Award, Calendar, Phone } from "lucide-react";
import FormModal from "@/components/ui/FormModal";
import { useFormModal } from "@/hooks/useFormModal";

const stats = [
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    number: "1– 4",
    label: "Weeks",
    subtitle: "Onboard Time",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
    number: "24/7",
    label: "Support",
    subtitle: "Available for clients",
  },
  {
    icon: <Award className="w-8 h-8 text-blue-500" />,
    number: "85%+",
    label: "Retention",
    subtitle: "Employee Success Rate",
  },
  {
    icon: <Calendar className="w-8 h-8 text-blue-500" />,
    number: "Fortune 500",
    label: "Trusted Partner",
    subtitle: "",
  },
];

const Testimonials: React.FC = () => {
  const { isOpen, openModal, closeModal } = useFormModal();

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="lg:col-span-5">
            {/* Clutch Rating Badge */}
            {/* <motion.div
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-sm font-semibold text-white">
                REVIEWED ON
              </div>
              <div className="text-orange-400 font-bold">Clutch</div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-orange-400 rounded-sm"
                  ></div>
                ))}
              </div>
              <div className="text-white text-sm font-semibold">5.0 RATING</div>
            </motion.div> */}

            {/* Orange Accent Text */}
            <motion.div
              className="text-orange-400 font-semibold text-lg mb-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Connect with Top 1% Bangladesh Talent
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Scale Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Development Team
              </span>
              <br />
              in Just <span className="text-orange-400">4 Weeks</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-gray-300 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              From startups to enterprises—build scalable, secure software with
              our expertise team.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
            >
              <Phone className="w-5 h-5" />
              Free 3 Day Developers Trial
            </motion.button>
          </div>

          {/* Right Side - Stats Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold text-white mb-1">
                    {stat.label}
                  </div>
                  {stat.subtitle && (
                    <div className="text-gray-400 text-sm">{stat.subtitle}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <FormModal isOpen={isOpen} onClose={closeModal} />
    </section>
  );
};

export default Testimonials;
