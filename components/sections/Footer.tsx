"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Facebook,
  Youtube,
} from "lucide-react";
import Image from "next/image";

const footerLinks = {
  services: [
    { name: "Web Development", href: "/#services" },
    { name: "Mobile Apps", href: "/#services" },
    { name: "AI Solutions", href: "/#services" },
    { name: "Ecommerce Automation", href: "/#services" },
  ],
  company: [
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/#contact" },
    { name: "Career", href: "/career" },
    // { name: "Blog", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Delivery Policy", href: "/delivery-policy" },
    // { name: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/company/codemoly/",
  },
  {
    name: "Facebook",
    icon: <Facebook className="w-5 h-5" />,
    href: "https://www.facebook.com/CodeMoly",
  },
  {
    name: "Youtube",
    icon: <Youtube className="w-5 h-5" />,
    href: "https://www.youtube.com/@codemoly",
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Modern Background System */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10" />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-30"
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
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 blur-3xl"
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -25, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Neural Network Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1000 600"
        >
          <defs>
            <linearGradient
              id="footerNetworkGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.circle
              key={`footer-node-${i}`}
              cx={150 + i * 140}
              cy={200 + Math.sin(i) * 100}
              r="4"
              fill="url(#footerNetworkGrad)"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.line
              key={`footer-connection-${i}`}
              x1={150 + i * 140}
              y1={200 + Math.sin(i) * 100}
              x2={150 + (i + 1) * 140}
              y2={200 + Math.sin(i + 1) * 100}
              stroke="url(#footerNetworkGrad)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
            />
          ))}
        </svg>
      </div>

      {/* Newsletter Section */}
      {/* <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Stay Updated
              </span>
              <span className="text-white"> with CodeMoly</span>
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Get the latest updates, tutorials, and exclusive content delivered
              to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300"
              />
              <Button
                variant="primary"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25"
              >
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              No spam, unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <Image
                src="/logo-white.png"
                alt="CodeMoly Logo"
                width={100}
                height={100}
                className="h-8 w-auto"
              />
              <p className="text-gray-300 leading-relaxed text-sm">
                Empowering developers to build amazing applications with
                cutting-edge tools and technologies.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <motion.a
                href="mailto:hello@codemoly.com"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-all duration-300 group cursor-pointer text-sm"
                whileHover={{ x: 3 }}
              >
                <Mail className="w-4 h-4 mr-3" />
                <span>hello@codemoly.com</span>
              </motion.a>
              <motion.a
                href="tel:+15551234567"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-all duration-300 group cursor-pointer text-sm"
                whileHover={{ x: 3 }}
              >
                <Phone className="w-4 h-4 mr-3" />
                <span>+01894 955 494</span>
              </motion.a>
              <motion.div
                className="flex items-center text-gray-300 text-sm"
                whileHover={{ x: 3 }}
              >
                <MapPin className="w-6 h-6 mr-3" />
                <span>
                  A-5, 14/1, The Emporium Tower, Mirpur Road, Shyamoli, Dhaka
                </span>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:border-blue-400/50 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  title={social.name}
                >
                  {React.cloneElement(social.icon, { className: "w-4 h-4" })}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold capitalize bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent relative">
                {category}
                <div className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
              </h4>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 + linkIndex * 0.05 }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 group text-sm py-1 px-2 rounded-md hover:bg-white/5 flex items-center relative overflow-hidden"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 group-hover:font-medium transition-all duration-300">
                        {link.name}
                      </span>
                      <motion.div
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        <ArrowRight className="w-3 h-3 text-blue-400" />
                      </motion.div>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-center px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-gray-300 text-sm order-2 md:order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              © {currentYear}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                CodeMoly
              </span>
              . All rights reserved.
            </motion.div>

            {/* <motion.div
              className="flex items-center text-gray-300 text-sm order-1 md:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span>Made with</span>
              <motion.div
                className="mx-2"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current drop-shadow-sm" />
              </motion.div>
              <span>by</span>
              <motion.span
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold ml-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                CodeMoly
              </motion.span>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
