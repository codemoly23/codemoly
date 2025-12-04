"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Package,
  FileText,
  Calendar,
  Image as ImageIcon,
  ChevronRight,
  LogOut,
  Menu,
  X,
  User,
  Layers,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  title?: string;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Overview & stats",
  },
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

export default function AdminLayout({ children, user, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="CodeMoly"
              width={120}
              height={32}
              className="h-8 w-auto dark:hidden"
            />
            <Image
              src="/logo-white.png"
              alt="CodeMoly"
              width={120}
              height={32}
              className="h-8 w-auto hidden dark:block"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-16rem)]">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  active
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    active
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  }`}
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div
                    className={`text-xs ${
                      active
                        ? "text-blue-600/70 dark:text-blue-400/70"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-opacity ${
                    active
                      ? "text-blue-600 dark:text-blue-400 opacity-100"
                      : "text-gray-400 opacity-0 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900 dark:text-white truncate">
                {user.name || "Admin"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.email}
              </div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title || "Dashboard"}
            </h1>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Site →
          </Link>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
