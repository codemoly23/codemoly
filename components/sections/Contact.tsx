"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import FormModal from "@/components/ui/FormModal";
import { useFormModal } from "@/hooks/useFormModal";

const Contact: React.FC = () => {
  const { isOpen, openModal, closeModal } = useFormModal();

  return (
    <>
      <section
        id="contact"
        className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10" />

          {/* Animated Grid */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0px 0px", "60px 60px"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl"
            animate={{
              x: [0, -40, 30, 0],
              y: [0, 40, -20, 0],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Simple CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              <span className="text-xs sm:text-sm font-medium text-white">
                Experience AI Development
              </span>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Ready to Accelerate Your Development?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12">
              Join leading companies already building 10X faster with our
              AI-powered development platform
            </p>

            {/* Single CTA Button */}
            <motion.button
              onClick={openModal}
              className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-white text-gray-900 font-bold text-sm sm:text-base lg:text-lg rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Start Building Today
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Form Modal */}
      <FormModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default Contact;
