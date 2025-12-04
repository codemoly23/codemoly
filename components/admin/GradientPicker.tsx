"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface GradientPickerProps {
  value?: string;
  onChange?: (gradient: string) => void;
  label?: string;
}

// Predefined gradient options matching the existing design
const gradients = [
  {
    name: "Blue Purple",
    value: "from-blue-600 via-purple-600 to-indigo-700",
    preview: "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700",
  },
  {
    name: "Emerald Cyan",
    value: "from-emerald-500 via-teal-600 to-cyan-700",
    preview: "bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-700",
  },
  {
    name: "Orange Pink",
    value: "from-orange-500 via-red-500 to-pink-600",
    preview: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-600",
  },
  {
    name: "Violet Fuchsia",
    value: "from-violet-600 via-purple-600 to-fuchsia-700",
    preview: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
  },
  {
    name: "Pink Rose",
    value: "from-pink-500 via-rose-600 to-red-700",
    preview: "bg-gradient-to-r from-pink-500 via-rose-600 to-red-700",
  },
  {
    name: "Cyan Blue",
    value: "from-cyan-500 via-blue-600 to-indigo-700",
    preview: "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700",
  },
  {
    name: "Purple Blue Cyan",
    value: "from-purple-600 via-blue-600 to-cyan-500",
    preview: "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500",
  },
  {
    name: "Emerald Blue",
    value: "from-emerald-500 via-teal-600 to-blue-600",
    preview: "bg-gradient-to-r from-emerald-500 via-teal-600 to-blue-600",
  },
  {
    name: "Orange Purple",
    value: "from-orange-500 via-pink-500 to-purple-600",
    preview: "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600",
  },
  {
    name: "Indigo Purple Pink",
    value: "from-indigo-600 via-purple-600 to-pink-500",
    preview: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500",
  },
  {
    name: "Blue Cyan",
    value: "from-blue-600 to-cyan-500",
    preview: "bg-gradient-to-r from-blue-600 to-cyan-500",
  },
  {
    name: "Orange Yellow",
    value: "from-orange-500 to-yellow-400",
    preview: "bg-gradient-to-r from-orange-500 to-yellow-400",
  },
  {
    name: "Green Emerald",
    value: "from-green-500 to-emerald-400",
    preview: "bg-gradient-to-r from-green-500 to-emerald-400",
  },
  {
    name: "Purple Pink",
    value: "from-purple-500 to-pink-400",
    preview: "bg-gradient-to-r from-purple-500 to-pink-400",
  },
  {
    name: "Red Orange",
    value: "from-red-500 to-orange-400",
    preview: "bg-gradient-to-r from-red-500 to-orange-400",
  },
  {
    name: "Slate Gray",
    value: "from-slate-600 to-slate-800",
    preview: "bg-gradient-to-r from-slate-600 to-slate-800",
  },
];

export default function GradientPicker({
  value = "",
  onChange,
  label = "Select Gradient",
}: GradientPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedGradient = gradients.find((g) => g.value === value);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>

      {/* Selected Gradient Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
      >
        <div
          className={`w-10 h-10 rounded-lg ${
            selectedGradient ? selectedGradient.preview : "bg-gray-200 dark:bg-gray-700"
          }`}
        />
        <div className="flex-1 text-left">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {selectedGradient?.name || "Select a gradient"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">
            {value || "No gradient selected"}
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
          <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl">
            <div className="p-3">
              <div className="grid grid-cols-4 gap-2">
                {gradients.map((gradient) => (
                  <button
                    key={gradient.value}
                    type="button"
                    onClick={() => {
                      onChange?.(gradient.value);
                      setIsOpen(false);
                    }}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                      value === gradient.value
                        ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800"
                        : "hover:scale-105"
                    }`}
                    title={gradient.name}
                  >
                    <div className={`absolute inset-0 ${gradient.preview}`} />
                    {value === gradient.value && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-700 pt-3">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Or enter custom gradient classes:
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder="from-blue-500 to-purple-600"
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
