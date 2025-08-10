'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechFlow Inc.",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    content: "CodeMoly transformed our development process. The AI-powered features saved us countless hours and improved our code quality significantly.",
    metrics: { projects: 15, timesSaved: "40%" }
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Developer",
    company: "StartupXYZ",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    content: "The collaboration features are game-changing. Our remote team works seamlessly together, and the real-time sync is flawless.",
    metrics: { projects: 8, timesSaved: "35%" }
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "InnovateCorp",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    content: "From concept to deployment, CodeMoly streamlined our entire workflow. The analytics and insights help us make better decisions.",
    metrics: { projects: 22, timesSaved: "50%" }
  },
  {
    id: 4,
    name: "David Kim",
    role: "Freelance Developer",
    company: "Independent",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    content: "As a freelancer, CodeMoly gives me enterprise-level tools at an affordable price. My clients are impressed with the results.",
    metrics: { projects: 30, timesSaved: "45%" }
  }
];

const companies = [
  { name: "TechFlow", logo: "/api/placeholder/120/40" },
  { name: "StartupXYZ", logo: "/api/placeholder/120/40" },
  { name: "InnovateCorp", logo: "/api/placeholder/120/40" },
  { name: "DevStudio", logo: "/api/placeholder/120/40" },
  { name: "CodeCraft", logo: "/api/placeholder/120/40" },
  { name: "WebWorks", logo: "/api/placeholder/120/40" }
];

const stats = [
  { label: "Happy Customers", value: "10,000+", icon: <Users className="w-6 h-6" /> },
  { label: "Projects Completed", value: "50,000+", icon: <Award className="w-6 h-6" /> },
  { label: "Average Time Saved", value: "40%", icon: <TrendingUp className="w-6 h-6" /> }
];

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
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
            Loved by
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Developers Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of developers who trust CodeMoly to build amazing applications.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4 shadow-lg">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card variant="elevated" className="p-8 md:p-12 text-center relative overflow-hidden">
                  {/* Quote Icon */}
                  <div className="absolute top-6 left-6 text-blue-200 dark:text-blue-800">
                    <Quote className="w-12 h-12" />
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex justify-center space-x-8 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {testimonials[currentTestimonial].metrics.projects}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {testimonials[currentTestimonial].metrics.timesSaved}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Time Saved</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonial(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-8">Trusted by leading companies</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                className="flex items-center justify-center h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
