"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  Users,
  Zap,
  Target,
  Heart,
  Code2,
  Bot,
  Workflow,
  MapPin,
  Mail,
  Phone,
  Award,
  TrendingUp,
  Shield,
  Lightbulb,
} from "lucide-react";
import  { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

// Company mission and vision
const missionVision = {
  mission: {
    title: "Our Mission",
    description:
      "To transform businesses worldwide through innovative AI automation and cutting-edge software development, making technology accessible and powerful for every organization.",
    icon: <Target className="w-8 h-8" />,
  },
  vision: {
    title: "Our Vision",
    description:
      "To be the global leader in AI-powered business automation, creating a world where technology seamlessly enhances human potential and drives sustainable growth.",
    icon: <Lightbulb className="w-8 h-8" />,
  },
};

// Core values
const coreValues = [
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

// Key services
const keyServices = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Automation",
    description:
      "Intelligent workflow automation with n8n, custom AI agents, and business process optimization.",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Software Development",
    description:
      "Custom web applications, mobile apps, and enterprise software solutions.",
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "System Integration",
    description:
      "Seamless integration of existing systems with modern automation platforms.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Technology Consulting",
    description:
      "Strategic guidance on digital transformation and technology adoption.",
  },
];

// Company stats
const companyStats = [
  {
    number: "3",
    label: "Global Offices",
    subtitle: "Bangladesh, France, Austria",
  },
  {
    number: "400+",
    label: "App Integrations",
    subtitle: "with n8n automation",
  },
  {
    number: "75%",
    label: "Time Saved",
    subtitle: "for our clients",
  },
  {
    number: "24/7",
    label: "AI Support",
    subtitle: "automated assistance",
  },
];

// Global presence
const globalOffices = [
  {
    country: "Bangladesh",
    city: "Dhaka",
    role: "HQ for APAC",
    address: "14/1, BTI Emporium Tower, Mirpur Road, Shamoli, Dhaka",
    phone: "+01894 955 494",
    email: "hello@codemoly.com",
  },
  {
    country: "France",
    city: "Paris",
    role: "EU Product Hub",
    address: "78 avenue des champs élysées 75008 paris",
    phone: "+33743579692",
    email: "hello@codemoly.com",
  },
  {
    country: "Austria",
    city: "Vienna",
    role: "Engineering",
    address: "Sonnwendgasse 30/2/11, 1100, Wien",
    phone: "+43 664 875 8864",
    email: "hello@codemoly.com",
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

export default function AboutUsContent() {
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
              <Building2 className="w-10 h-10 text-blue-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              About CodeMoly
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transforming businesses through vision & AI innovation
            </p>

            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A leading software company reshaping industries across the globe
              through AI automation, seamless integrations, and intelligent
              solutions that drive business growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
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
              Our Purpose
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Driven by innovation and guided by our commitment to excellence.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[missionVision.mission, missionVision.vision].map(
              (item, index) => (
                <motion.div key={item.title} variants={itemVariants}>
                  <Card className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-gray-700 relative overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10" />
                    </div>

                    <CardContent className="relative p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-2xl mb-6 text-blue-400">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These fundamental principles guide everything we do and shape our
              company culture.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {coreValues.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full text-center bg-gray-900 border-gray-700 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-2xl mb-6 text-blue-400">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Services Section */}
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
              What We Do
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide comprehensive technology solutions that transform how
              businesses operate.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {keyServices.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg text-blue-500 dark:text-blue-400">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {service.description}
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

      {/* Company Stats Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Modern Background System */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10" />
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
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Our Impact
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and global
              reach.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-white font-semibold text-lg mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-300 text-sm">{stat.subtitle}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Presence Section */}
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
              Global Presence
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              With offices across three continents, we serve clients worldwide
              with local expertise and global standards.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {globalOffices.map((office, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-gray-900 border-gray-700 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl mb-4 text-blue-400">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {office.country}
                      </h3>
                      <p className="text-blue-400 font-semibold mb-1">
                        {office.city}
                      </p>
                      <p className="text-gray-400 text-sm">{office.role}</p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-300">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a
                          href={`tel:${office.phone}`}
                          className="text-gray-300 hover:text-blue-400 transition-colors"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a
                          href={`mailto:${office.email}`}
                          className="text-gray-300 hover:text-blue-400 transition-colors"
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
