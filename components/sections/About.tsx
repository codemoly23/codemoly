"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Bot,
  Zap,
  Brain,
  Workflow,
  Target,
  Settings,
} from "lucide-react";

const stats = [
  {
    number: "95%",
    label: "Automation Success",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "10K+",
    label: "AI Workflows Built",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "75%",
    label: "Time Saved",
    color: "from-green-500 to-emerald-500",
  },
  { number: "24/7", label: "AI Support", color: "from-orange-500 to-red-500" },
];

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Side - Feature Cards */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Row - Two Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* AI Automation Excellence Card */}
              <motion.div
                className="relative p-6 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-600 text-white overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Bot className="w-8 h-8 text-white" />
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    AI Automation Excellence
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Intelligent workflows that adapt and optimize automatically
                    for maximum efficiency.
                  </p>
                  <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                    AVG. EFFICIENCY GAIN - 75%
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              </motion.div>

              {/* Smart Process Optimization Card */}
              <motion.div
                className="relative p-6 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Brain className="w-8 h-8 text-white" />
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Smart Process Optimization
                  </h3>
                  <p className="text-white/90 text-sm">
                    AI-driven insights that continuously improve business
                    processes and eliminate inefficiencies
                  </p>
                </div>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/10 rounded-full"></div>
              </motion.div>
            </div>

            {/* Bottom Row - Main Platform Card */}
            <motion.div
              className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 text-white overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01, y: -3 }}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">
                      Advanced AI Workflow Platform
                    </h3>
                    <p className="text-white/90 mb-4">
                      Deploy intelligent automation across n8n, Zapier, Make &
                      custom integrations
                    </p>
                    <p className="text-white/80 text-sm">
                      Our advanced AI technology ensures seamless workflow
                      orchestration, predictive optimization and
                      enterprise-grade reliability.
                    </p>
                  </div>
                </div>

                {/* Platform Icons */}
                <div className="flex items-center space-x-4 mt-6">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Workflow className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full"></div>
            </motion.div>
          </div>

          {/* Right Side - Laptop Showcase */}
          <div className="lg:col-span-5">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Laptop Container */}
              <div className="relative transform rotate-12 hover:rotate-6 transition-transform duration-500">
                {/* Laptop Base */}
                <div className="relative bg-gray-800 rounded-2xl p-4 shadow-2xl">
                  {/* Screen */}
                  <div className="bg-black rounded-xl overflow-hidden aspect-[16/10]">
                    {/* Screen Content - Trading Dashboard */}
                    <div className="relative h-full bg-gradient-to-br from-slate-900 to-slate-800 p-4">
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-white text-xs font-mono">
                          CodeMoly Platform
                        </div>
                      </div>

                      {/* Chart Area */}
                      <div className="bg-slate-800 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-400 text-xs font-semibold">
                            EUR/USD
                          </span>
                          <span className="text-green-400 text-xs">
                            +0.0023
                          </span>
                        </div>
                        {/* Simplified Chart */}
                        <div className="h-16 flex items-end space-x-1">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="bg-gradient-to-t from-green-500 to-green-300 rounded-sm flex-1"
                              style={{ height: `${Math.random() * 60 + 20}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-800 rounded-lg p-2">
                          <div className="text-blue-400 text-xs">Balance</div>
                          <div className="text-white text-sm font-bold">
                            $12,450
                          </div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2">
                          <div className="text-purple-400 text-xs">Profit</div>
                          <div className="text-green-400 text-sm font-bold">
                            +$2,340
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Keyboard */}
                  <div className="mt-2 bg-gray-700 rounded-lg h-8 flex items-center justify-center">
                    <div className="grid grid-cols-12 gap-1 w-full px-2">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="bg-gray-600 rounded h-2"></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Laptop Shadow */}
                <div className="absolute -bottom-8 left-4 right-4 h-8 bg-black/20 rounded-full blur-xl"></div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Code2 className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg flex items-center justify-center"
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Database className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
              >
                {stat.number}
              </div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
