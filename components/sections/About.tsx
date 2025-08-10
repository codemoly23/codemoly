'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Lightbulb, Heart, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';

const values = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Innovation First",
    description: "We constantly push the boundaries of what's possible in web development."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Driven",
    description: "Our platform is built by developers, for developers, with community feedback at its core."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Quality Focus",
    description: "Every feature is crafted with attention to detail and rigorous testing."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Impact",
    description: "Empowering developers worldwide to create amazing digital experiences."
  }
];

const stats = [
  { number: "50K+", label: "Active Developers", color: "from-blue-500 to-cyan-500" },
  { number: "100K+", label: "Projects Built", color: "from-purple-500 to-pink-500" },
  { number: "99.9%", label: "Uptime", color: "from-green-500 to-emerald-500" },
  { number: "24/7", label: "Support", color: "from-orange-500 to-red-500" }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> CodeMoly</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're on a mission to democratize web development and empower creators worldwide with powerful, intuitive tools.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Founded in 2020 by a team of passionate developers, CodeMoly started as a simple idea: 
                what if building web applications could be as intuitive as sketching on paper?
              </p>
              <p>
                Today, we've grown into a comprehensive platform that serves thousands of developers 
                worldwide, from solo freelancers to enterprise teams. Our tools have powered over 
                100,000 projects and counting.
              </p>
              <p>
                We believe that great software should be accessible to everyone, regardless of their 
                technical background or budget. That's why we're committed to building tools that are 
                both powerful and easy to use.
              </p>
            </div>
          </div>

          <div className="relative">
            <motion.div
              className="aspect-square rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Built with passion
                </p>
              </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg flex items-center justify-center"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Award className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full shadow-lg flex items-center justify-center"
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Globe className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Our Values
          </h3>
          
          <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <BentoGridItem
                key={value.title}
                title={value.title}
                description={value.description}
                icon={value.icon}
                variant="default"
                className="group cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      ✨
                    </motion.div>
                  </div>
                </div>
              </BentoGridItem>
            ))}
          </BentoGrid>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Card variant="elevated" className="max-w-2xl mx-auto p-8">
            <CardContent className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Join Our Journey
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Be part of a community that's shaping the future of web development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Building Today
                </motion.button>
                <motion.button
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
