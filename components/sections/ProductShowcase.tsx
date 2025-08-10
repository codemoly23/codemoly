'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Github, Star, Users, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const products = [
  {
    id: 1,
    title: "CodeMoly Studio",
    description: "Professional development environment with AI-powered code completion and real-time collaboration.",
    image: "/api/placeholder/600/400",
    category: "Development Tools",
    stats: { users: "50K+", rating: 4.9, downloads: "100K+" },
    features: ["AI Code Completion", "Real-time Collaboration", "Git Integration", "Plugin Ecosystem"],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 2,
    title: "WebFlow Designer",
    description: "Visual website builder with drag-and-drop interface and responsive design capabilities.",
    image: "/api/placeholder/600/400",
    category: "Design Tools",
    stats: { users: "25K+", rating: 4.8, downloads: "75K+" },
    features: ["Drag & Drop Builder", "Responsive Design", "Custom Components", "Export Code"],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 3,
    title: "API Gateway Pro",
    description: "Enterprise-grade API management platform with monitoring, security, and analytics.",
    image: "/api/placeholder/600/400",
    category: "Backend Services",
    stats: { users: "15K+", rating: 4.7, downloads: "50K+" },
    features: ["API Monitoring", "Security Layer", "Analytics Dashboard", "Rate Limiting"],
    demoUrl: "#",
    githubUrl: "#",
    liveUrl: "#"
  }
];

const ProductShowcase: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <section id="products" className="py-24 bg-white dark:bg-gray-900">
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
            Our
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Product Suite</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our range of powerful tools designed to streamline your development workflow.
          </p>
        </motion.div>

        {/* Main Product Display */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Product Demo</p>
                  </div>
                </div>
                
                {/* Play Button Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-8 h-8 text-gray-900 ml-1" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {products[activeProduct].stats.users}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                      {products[activeProduct].stats.rating}
                      <Star className="w-4 h-4 text-yellow-400 ml-1 fill-current" />
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Product Info */}
            <div>
              <motion.div
                key={activeProduct}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium mb-4">
                  {products[activeProduct].category}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {products[activeProduct].title}
                </h3>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {products[activeProduct].description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {products[activeProduct].features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" size="lg" className="group">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Try Demo
                  </Button>
                  <Button variant="outline" size="lg">
                    <Github className="w-5 h-5 mr-2" />
                    View Code
                  </Button>
                  <Button variant="ghost" size="lg">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Site
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Product Selector */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className={`cursor-pointer transition-all duration-300 ${
                activeProduct === index ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setActiveProduct(index)}
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
              whileHover={{ y: -4 }}
            >
              <Card 
                variant={activeProduct === index ? 'elevated' : 'default'}
                className={`transition-all duration-300 ${
                  activeProduct === index 
                    ? 'ring-2 ring-blue-500 shadow-xl' 
                    : 'hover:shadow-lg'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {product.stats.users}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {product.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Download className="w-4 h-4 mr-1" />
                      {product.stats.downloads}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
