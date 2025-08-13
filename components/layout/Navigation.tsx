"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import FormModal from "@/components/ui/FormModal";
import { useFormModal } from "@/hooks/useFormModal";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  {
    label: "Products",
    href: "#products",
  },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isOpen: isModalOpen, openModal, closeModal } = useFormModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveDropdown(null);

    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Dynamic text color based on background
  const getTextColorClasses = (isScrolled: boolean) => {
    if (isScrolled) {
      // Light background when scrolled - use dark text
      return "text-gray-900 dark:text-gray-100";
    } else {
      // Transparent/dark background when not scrolled - use light text
      return "text-white";
    }
  };

  const getHoverTextColorClasses = (isScrolled: boolean) => {
    if (isScrolled) {
      return "hover:text-blue-600 dark:hover:text-blue-400";
    } else {
      return "hover:text-blue-300";
    }
  };

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }}>
            <Image
              src="/logo-1.png"
              alt="CodeMoly Logo"
              width={100}
              height={100}
              className="h-8 w-auto"
            />
            {/* <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeMoly
            </a> */}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-medium transition-colors",
                          getTextColorClasses(scrolled),
                          getHoverTextColorClasses(scrolled)
                        )}
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.children.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                onClick={() => handleNavClick(child.href)}
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                              >
                                {child.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "px-3 py-2 text-sm font-medium transition-colors",
                        getTextColorClasses(scrolled),
                        getHoverTextColorClasses(scrolled)
                      )}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="primary" size="sm" onClick={openModal}>
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 transition-colors",
                getTextColorClasses(scrolled),
                getHoverTextColorClasses(scrolled)
              )}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => handleNavClick(child.href)}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={openModal}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Modal */}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />
    </motion.nav>
  );
};

export default Navigation;
