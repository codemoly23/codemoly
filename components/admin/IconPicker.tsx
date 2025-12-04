"use client";

import { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Search, X } from "lucide-react";

interface IconPickerProps {
  value?: string;
  onChange?: (iconName: string) => void;
  label?: string;
}

// Common icons for quick access
const popularIcons = [
  "Workflow",
  "Store",
  "Bot",
  "Settings",
  "Target",
  "MessageSquare",
  "ShoppingCart",
  "GraduationCap",
  "Users",
  "BarChart3",
  "Zap",
  "Sparkles",
  "Rocket",
  "Globe",
  "Shield",
  "Code",
  "Database",
  "Cloud",
  "Lock",
  "Mail",
  "Phone",
  "Calendar",
  "Clock",
  "Star",
  "Heart",
  "Check",
  "Play",
  "Pause",
  "ArrowRight",
  "ChevronRight",
];

export default function IconPicker({
  value = "",
  onChange,
  label = "Select Icon",
}: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Get all available icon names
  const allIconNames = useMemo(() => {
    return Object.keys(LucideIcons).filter(
      (key) =>
        key !== "default" &&
        key !== "createLucideIcon" &&
        key !== "icons" &&
        typeof (LucideIcons as Record<string, unknown>)[key] === "function"
    );
  }, []);

  // Filter icons based on search
  const filteredIcons = useMemo(() => {
    if (!search) return popularIcons;
    const searchLower = search.toLowerCase();
    return allIconNames.filter((name) =>
      name.toLowerCase().includes(searchLower)
    );
  }, [search, allIconNames]);

  // Get the icon component
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  const SelectedIcon = value
    ? (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[value]
    : null;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>

      {/* Selected Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
      >
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
          {SelectedIcon ? (
            <SelectedIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          ) : (
            <span className="text-gray-400 text-xs">None</span>
          )}
        </div>
        <div className="flex-1 text-left">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {value || "Select an icon"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Click to change
          </div>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="absolute z-50 mt-2 w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl">
            {/* Search */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search icons..."
                  className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Icons Grid */}
            <div className="p-3 max-h-64 overflow-y-auto">
              {filteredIcons.length > 0 ? (
                <div className="grid grid-cols-6 gap-2">
                  {filteredIcons.slice(0, 60).map((iconName) => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => {
                        onChange?.(iconName);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                        value === iconName
                          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                      title={iconName}
                    >
                      {getIcon(iconName)}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No icons found
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              {filteredIcons.length} icons available
              {search ? " (filtered)" : " (popular icons shown)"}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
