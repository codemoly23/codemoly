"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  Zap,
  Globe,
  Coffee,
  Target,
  Award,
  Mail,
  Bell,
  CheckCircle,
  Star,
  Briefcase,
  Clock,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

// Company values and benefits
const companyValues = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Innovation First",
    description:
      "We embrace cutting-edge technologies and creative solutions to solve complex problems.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Team Collaboration",
    description:
      "We believe in the power of teamwork and open communication to achieve excellence.",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Quality Focus",
    description:
      "We are committed to delivering high-quality solutions that exceed expectations.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Impact",
    description:
      "We work with clients worldwide to create technology that makes a difference.",
  },
];

const benefits = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaborative Environment",
    description:
      "Work alongside talented professionals in a supportive team setting",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Professional Growth",
    description: "Continuous learning opportunities and career advancement",
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: "Work-Life Balance",
    description: "Flexible schedules and supportive work environment",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Competitive Salary",
    description: "Market-leading compensation and performance bonuses",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Modern Technology",
    description: "Access to modern development tools and technology stack",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function CareersContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Modern Background System */}
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
                linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
            animate={{
              x: [0, 25, -15, 0],
              y: [0, -20, 15, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 blur-3xl"
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 25, -12, 0],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-3xl mb-8 shadow-2xl">
              <Briefcase className="w-10 h-10 text-blue-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Join Our Team
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Build the future of technology with CodeMoly
            </p>

            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We&apos;re always looking for talented individuals who share our
              passion for innovation and excellence in software development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core values guide everything we do and shape our company
              culture.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {companyValues.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-2xl mb-6 text-blue-500 dark:text-blue-400">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Work With Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We offer competitive benefits and a supportive environment where
              you can grow your career.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-gray-900 border-gray-700 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg text-blue-400">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Current Openings
            </h2>

            <Card className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-gray-700 relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10" />
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ["0px 0px", "60px 60px"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                  }}
                />
              </div>

              <CardContent className="relative p-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-3xl mb-8">
                  <Clock className="w-10 h-10 text-blue-400" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  No Current Openings
                </h3>

                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  We don&apos;t have any open positions at the moment, but we&apos;re
                  always interested in connecting with talented developers and
                  innovators.
                </p>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 max-w-xl mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-6 h-6 text-blue-400" />
                    <h4 className="text-xl font-semibold text-white">
                      Stay Updated
                    </h4>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Send us your resume and we&apos;ll keep you in mind for future
                    opportunities that match your skills.
                  </p>

                  <motion.a
                    href="mailto:careers@codemoly.com?subject=Future Opportunities - Resume Submission"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-5 h-5" />
                    Send Your Resume
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Modern Background System */}
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
                linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
            animate={{
              x: [0, -25, 15, 0],
              y: [0, 20, -15, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Get In Touch
            </h2>

            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Have questions about working at CodeMoly? We&apos;d love to hear from
              you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href="mailto:careers@codemoly.com"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-base font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-5 h-5" />
                careers@codemoly.com
              </motion.a>
              <motion.a
                href="mailto:hello@codemoly.com"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-base font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-5 h-5" />
                hello@codemoly.com
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
