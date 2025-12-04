"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Save,
  Loader2,
  Check,
  AlertCircle,
  Plus,
  X,
  ArrowLeft,
} from "lucide-react";
import IconPicker from "./IconPicker";
import GradientPicker from "./GradientPicker";
import * as LucideIcons from "lucide-react";

interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
  stats: Record<string, string>;
  isActive: boolean;
}

interface ServiceFormProps {
  initialData?: ServiceFormData & { id?: string };
  isEditing?: boolean;
}

const defaultFormData: ServiceFormData = {
  title: "",
  description: "",
  icon: "Workflow",
  gradient: "from-blue-600 via-purple-600 to-indigo-700",
  features: [""],
  stats: { key1: "" },
  isActive: true,
};

export default function ServiceForm({
  initialData,
  isEditing = false,
}: ServiceFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ServiceFormData>(
    initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          icon: initialData.icon,
          gradient: initialData.gradient,
          features: (initialData.features as string[]) || [""],
          stats: (initialData.stats as Record<string, string>) || { key1: "" },
          isActive: initialData.isActive,
        }
      : defaultFormData
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  // Convert stats object to array for editing
  const [statsArray, setStatsArray] = useState<{ key: string; value: string }[]>(
    Object.entries(formData.stats).map(([key, value]) => ({ key, value }))
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    setSaveStatus("idle");
  };

  // Features handlers
  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? value : f)),
    }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Stats handlers
  const addStat = () => {
    setStatsArray((prev) => [...prev, { key: "", value: "" }]);
  };

  const updateStat = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    setStatsArray((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const removeStat = (index: number) => {
    if (statsArray.length <= 1) return;
    setStatsArray((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus("idle");
    setErrorMessage("");

    // Convert stats array to object
    const statsObject: Record<string, string> = {};
    statsArray.forEach(({ key, value }) => {
      if (key.trim()) {
        statsObject[key.trim()] = value;
      }
    });

    // Filter out empty features
    const cleanFeatures = formData.features.filter((f) => f.trim());

    const payload = {
      ...formData,
      features: cleanFeatures.length > 0 ? cleanFeatures : ["Feature 1"],
      stats: Object.keys(statsObject).length > 0 ? statsObject : { stat: "0" },
    };

    try {
      const url = isEditing
        ? `/api/admin/services/${initialData?.id}`
        : "/api/admin/services";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save service");
      }

      setSaveStatus("success");

      // Redirect to services list after success
      setTimeout(() => {
        router.push("/admin/services");
        router.refresh();
      }, 1000);
    } catch (error) {
      setSaveStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to save"
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Get icon for preview
  const IconComponent = formData.icon
    ? (
        LucideIcons as Record<
          string,
          React.ComponentType<{ className?: string }>
        >
      )[formData.icon]
    : null;

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/services")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEditing ? "Edit Service" : "Create Service"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isEditing
                ? "Update service details"
                : "Add a new AI automation service"}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white transition-all ${
            saveStatus === "success"
              ? "bg-green-600 hover:bg-green-700"
              : saveStatus === "error"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : saveStatus === "success" ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : saveStatus === "error" ? (
            <>
              <AlertCircle className="w-4 h-4" />
              Error
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {isEditing ? "Update Service" : "Create Service"}
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {saveStatus === "error" && errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-red-700 dark:text-red-300">{errorMessage}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Basic Information
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Service Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., n8n Workflow Automation"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe the service and its benefits..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Icon & Gradient Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <IconPicker
                  value={formData.icon}
                  onChange={(icon) =>
                    setFormData((prev) => ({ ...prev, icon }))
                  }
                  label="Service Icon"
                />
                <GradientPicker
                  value={formData.gradient}
                  onChange={(gradient) =>
                    setFormData((prev) => ({ ...prev, gradient }))
                  }
                  label="Card Gradient"
                />
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Features
              </h3>
              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>
            <div className="p-6 space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    disabled={formData.features.length <= 1}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Statistics
              </h3>
              <button
                type="button"
                onClick={addStat}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Stat
              </button>
            </div>
            <div className="p-6 space-y-3">
              {statsArray.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={stat.key}
                    onChange={(e) => updateStat(index, "key", e.target.value)}
                    placeholder="Label (e.g., integrations)"
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(index, "value", e.target.value)}
                    placeholder="Value (e.g., 400+)"
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeStat(index)}
                    disabled={statsArray.length <= 1}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Stats appear at the bottom of the service card (e.g.,
                &ldquo;400+ Integrations&rdquo;)
              </p>
            </div>
          </motion.div>
        </div>

        {/* Preview & Settings */}
        <div className="space-y-6">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Preview
              </h3>
            </div>
            <div className="p-4">
              {/* Card Preview */}
              <div
                className={`relative bg-gradient-to-br ${formData.gradient} rounded-2xl p-6 text-white overflow-hidden`}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-12 translate-x-12" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full translate-y-10 -translate-x-10" />
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold mb-2">
                    {formData.title || "Service Title"}
                  </h4>

                  {/* Description */}
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {formData.description || "Service description goes here..."}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {formData.features
                      .filter((f) => f.trim())
                      .slice(0, 3)
                      .map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm"
                        >
                          <LucideIcons.CheckCircle className="w-3 h-3 text-white/70" />
                          <span className="text-white/90">{feature}</span>
                        </div>
                      ))}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 pt-3 border-t border-white/20">
                    {statsArray
                      .filter((s) => s.key && s.value)
                      .slice(0, 3)
                      .map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="text-sm font-bold">{stat.value}</div>
                          <div className="text-xs text-white/70 capitalize">
                            {stat.key}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Settings
              </h3>
            </div>
            <div className="p-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Active
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Service will be visible on the website
                  </div>
                </div>
              </label>
            </div>
          </motion.div>
        </div>
      </div>
    </form>
  );
}
