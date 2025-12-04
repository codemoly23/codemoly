"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Settings,
  Package,
  FileText,
  Calendar,
  Image as ImageIcon,
  Layers,
  Plus,
  TrendingUp,
} from "lucide-react";
import AdminLayout from "./AdminLayout";

interface AdminDashboardProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  stats: {
    services: number;
    products: number;
    events: number;
    blogs: number;
  };
}

const quickActions = [
  {
    name: "Site Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "Hero, sections config",
  },
  {
    name: "Services",
    href: "/admin/services",
    icon: Layers,
    description: "AI Automation cards",
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
    description: "Product showcase",
  },
  {
    name: "Events",
    href: "/admin/events",
    icon: Calendar,
    description: "Global events section",
  },
  {
    name: "Blog",
    href: "/admin/blog",
    icon: FileText,
    description: "Blog posts & categories",
  },
  {
    name: "Media",
    href: "/admin/media",
    icon: ImageIcon,
    description: "Upload & manage files",
  },
];

export default function AdminDashboard({ user, stats }: AdminDashboardProps) {
  const statCards = [
    {
      label: "Services",
      value: stats.services.toString(),
      change: "Active automation cards",
      color: "blue",
      href: "/admin/services",
      icon: Layers,
    },
    {
      label: "Products",
      value: stats.products.toString(),
      change: "In showcase",
      color: "purple",
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "Events",
      value: stats.events.toString(),
      change: "Published events",
      color: "green",
      href: "/admin/events",
      icon: Calendar,
    },
    {
      label: "Blog Posts",
      value: stats.blogs.toString(),
      change: stats.blogs > 0 ? "Published" : "No posts yet",
      color: "orange",
      href: "/admin/blog",
      icon: FileText,
    },
  ];

  return (
    <AdminLayout user={user} title="Dashboard">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user.name || "Admin"}!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your website content from here.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={stat.href}
              className="block bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
                <stat.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center group"
            >
              <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Create New Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Link
          href="/admin/services/new"
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-200 dark:border-blue-800 hover:from-blue-500/20 hover:to-blue-600/20 transition-all group"
        >
          <div className="p-2 bg-blue-500 rounded-lg">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              New Service
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Add automation card
            </div>
          </div>
        </Link>

        <Link
          href="/admin/products/new"
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-200 dark:border-purple-800 hover:from-purple-500/20 hover:to-purple-600/20 transition-all group"
        >
          <div className="p-2 bg-purple-500 rounded-lg">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              New Product
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Add to showcase
            </div>
          </div>
        </Link>

        <Link
          href="/admin/events/new"
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl border border-green-200 dark:border-green-800 hover:from-green-500/20 hover:to-green-600/20 transition-all group"
        >
          <div className="p-2 bg-green-500 rounded-lg">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              New Event
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Add global event
            </div>
          </div>
        </Link>

        <Link
          href="/admin/blog/new"
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl border border-orange-200 dark:border-orange-800 hover:from-orange-500/20 hover:to-orange-600/20 transition-all group"
        >
          <div className="p-2 bg-orange-500 rounded-lg">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              New Blog Post
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Write new article
            </div>
          </div>
        </Link>
      </motion.div>
    </AdminLayout>
  );
}
