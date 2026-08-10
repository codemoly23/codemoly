"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Monitor,
  Code2,
  GraduationCap,
  Star,
  Briefcase,
} from "lucide-react";

// Training Program Categories
const trainingCategories = [
  {
    id: 1,
    title: "AI Training",
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-violet-600 to-purple-600",
    dot: "bg-violet-400",
    tint: "from-violet-950/60 via-[#0d0d1a] to-[#0d0d1a]",
    border: "border-violet-500/10",
    iconBg: "from-violet-500/25 to-purple-600/10",
    iconBorder: "border-violet-400/25",
    iconColor: "text-violet-300",
    iconGlow: "shadow-[0_0_24px_-4px_rgba(139,92,246,0.45)]",
    items: [
      "Generative AI (ChatGPT, Claude, Gemini & Copilot)",
      "AI for Business Excellence",
      "Prompt Engineering Level 1",
      "Prompt Engineering Level 2",
      "Prompt Engineering Level 3",
      "AI Agents & Intelligent Automation",
    ],
  },
  {
    id: 2,
    title: "Role-Based AI Training",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-teal-500 to-emerald-600",
    dot: "bg-teal-400",
    tint: "from-teal-950/60 via-[#0a1414] to-[#0a1414]",
    border: "border-teal-500/10",
    iconBg: "from-teal-500/25 to-emerald-600/10",
    iconBorder: "border-teal-400/25",
    iconColor: "text-teal-300",
    iconGlow: "shadow-[0_0_24px_-4px_rgba(45,212,191,0.45)]",
    items: [
      "AI + Sales Training",
      "AI + Marketing Training",
      "AI + HR Training",
      "AI + Supply Chain Training",
      "AI + Finance Training",
      "AI + Product Management",
      "AI + Customer Service",
      "AI + Foundation",
    ],
  },
  {
    id: 3,
    title: "Digital Training",
    icon: <Monitor className="w-6 h-6" />,
    gradient: "from-blue-600 to-sky-500",
    dot: "bg-blue-400",
    tint: "from-blue-950/60 via-[#0a0f1a] to-[#0a0f1a]",
    border: "border-blue-500/10",
    iconBg: "from-blue-500/25 to-sky-500/10",
    iconBorder: "border-blue-400/25",
    iconColor: "text-blue-300",
    iconGlow: "shadow-[0_0_24px_-4px_rgba(59,130,246,0.45)]",
    items: [
      "Digital Transformation Strategy",
      "Data Analytics & Business Intelligence",
      "Cloud Computing Fundamentals",
      "Cybersecurity Awareness",
      "Microsoft 365 & Google Workspace Productivity",
      "Digital Marketing & Social Media Strategy",
    ],
  },
  {
    id: 4,
    title: "Technology Training",
    icon: <Code2 className="w-6 h-6" />,
    gradient: "from-pink-600 to-fuchsia-600",
    dot: "bg-pink-400",
    tint: "from-pink-950/60 via-[#170a14] to-[#170a14]",
    border: "border-pink-500/10",
    iconBg: "from-pink-500/25 to-fuchsia-600/10",
    iconBorder: "border-pink-400/25",
    iconColor: "text-pink-300",
    iconGlow: "shadow-[0_0_24px_-4px_rgba(236,72,153,0.45)]",
    items: [
      "Full-Stack Web Development (MERN / MEAN)",
      "Mobile App Development (Flutter & React Native)",
      "Database Design & Administration (SQL Server, PostgreSQL, MySQL)",
      "Software Testing & QA Automation",
      "Internet of Things (IoT) Fundamentals",
      "UI/UX Design",
      "Cybersecurity Fundamentals",
    ],
  },
];

// Bottom Stats
const trainingStats = [
  {
    icon: <Users className="w-6 h-6" />,
    value: "50+",
    label: "Corporate Teams",
    subtitle: "Successfully Upskilled",
    iconBg: "from-violet-500/25 to-purple-600/10",
    iconBorder: "border-violet-400/25",
    iconColor: "text-violet-300",
    iconGlow: "shadow-[0_0_24px_-4px_rgba(139,92,246,0.45)]",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    value: "100%",
    label: "Hands-on Practical",
    subtitle: "Training",
    iconBg: "from-teal-500/25 to-emerald-600/10",
    iconBorder: "border-teal-400/25",
    iconColor: "text-teal-300",
    iconGlow: "shadow-[0_0_24px_-4px_rgba(45,212,191,0.45)]",
  },
  {
    icon: <Star className="w-6 h-6" />,
    value: "4.9 / 5",
    label: "Participant Satisfaction",
    subtitle: "Score",
    iconBg: "from-blue-500/25 to-sky-500/10",
    iconBorder: "border-blue-400/25",
    iconColor: "text-blue-300",
    iconGlow: "shadow-[0_0_24px_-4px_rgba(59,130,246,0.45)]",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    value: "Tailored",
    label: "Enterprise & Industry",
    subtitle: "Modules",
    iconBg: "from-pink-500/25 to-fuchsia-600/10",
    iconBorder: "border-pink-400/25",
    iconColor: "text-pink-300",
    iconGlow: "shadow-[0_0_24px_-4px_rgba(236,72,153,0.45)]",
  },
];

const TrainingPrograms: React.FC = () => {
  return (
    <section className="py-24 bg-[#07070f] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[32rem] h-[32rem] bg-gradient-to-br from-indigo-600/20 to-purple-700/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-gradient-to-br from-fuchsia-600/15 to-blue-700/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-xs sm:text-sm font-bold tracking-widest uppercase text-indigo-400 mb-3">
              Workforce Upskilling
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Professional Training Programs
            </h2>
            <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600" />
          </motion.div>

          <motion.p
            className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Comprehensive corporate upskilling programs designed to empower
            teams with practical AI mastery, digital capabilities, and core
            professional skills.
          </motion.p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {trainingCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <div
                className={`relative h-full flex flex-col bg-gradient-to-b ${category.tint} border ${category.border} rounded-2xl p-5 sm:p-6 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${category.iconBg} backdrop-blur-md border ${category.iconBorder} ${category.iconColor} ${category.iconGlow} mb-4`}
                >
                  {category.icon}
                </div>

                <h3 className="text-lg font-bold text-white mb-3">
                  {category.title}
                </h3>

                <div className="h-px bg-white/10 mb-4" />

                <ul className="space-y-2.5 flex-1">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2.5 text-sm text-gray-300 leading-snug"
                    >
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full ${category.dot} flex-shrink-0`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent bar */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${category.gradient}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row">
            {trainingStats.map((stat, index) => (
              <React.Fragment key={index}>
                <div className="flex-1 flex items-center justify-center gap-4 px-6 py-6 sm:px-8">
                  <div
                    className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.iconBg} backdrop-blur-md border ${stat.iconBorder} ${stat.iconColor} ${stat.iconGlow} flex-shrink-0`}
                  >
                    {stat.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl sm:text-2xl font-bold text-white leading-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-200">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-400">
                      {stat.subtitle}
                    </div>
                  </div>
                </div>
                {index < trainingStats.length - 1 && (
                  <>
                    <div className="lg:hidden h-px mx-6 bg-white/10" />
                    <div className="hidden lg:block w-px my-6 bg-white/10" />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingPrograms;
