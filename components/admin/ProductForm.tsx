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
  FileEdit,
  ExternalLink,
} from "lucide-react";
import IconPicker from "./IconPicker";
import GradientPicker from "./GradientPicker";
import ImageUploader from "./ImageUploader";
import * as LucideIcons from "lucide-react";
import Image from "next/image";

interface ProductFormData {
  title: string;
  description: string;
  category: string;
  image: string;
  icon: string;
  gradient: string;
  features: string[];
  stats: Record<string, string>;
  demoUrl: string | null;
  detailsSlug: string;
  isActive: boolean;
}

interface ProductFormProps {
  initialData?: ProductFormData & { id?: string };
  isEditing?: boolean;
}

const defaultFormData: ProductFormData = {
  title: "",
  description: "",
  category: "",
  image: "",
  icon: "Package",
  gradient: "from-blue-600 via-purple-600 to-indigo-700",
  features: [""],
  stats: { key1: "" },
  demoUrl: "",
  detailsSlug: "",
  isActive: true,
};

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Common product categories
const categoryOptions = [
  "E-COMMERCE PLATFORM",
  "LEARNING MANAGEMENT",
  "CRM AUTOMATION",
  "POS & INVENTORY",
  "AI TOOLS",
  "SAAS PLATFORM",
  "MARKETING AUTOMATION",
  "OTHER",
];

export default function ProductForm({
  initialData,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>(
    initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          category: initialData.category,
          image: initialData.image,
          icon: initialData.icon,
          gradient: initialData.gradient,
          features: (initialData.features as string[]) || [""],
          stats: (initialData.stats as Record<string, string>) || { key1: "" },
          demoUrl: initialData.demoUrl || "",
          detailsSlug: initialData.detailsSlug,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    setSaveStatus("idle");

    // Auto-generate slug when title changes (only if slug is empty or matches old auto-generated)
    if (name === "title" && !isEditing) {
      const newSlug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        detailsSlug: newSlug,
      }));
    }
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
      demoUrl: formData.demoUrl || null,
    };

    try {
      const url = isEditing
        ? `/api/admin/products/${initialData?.id}`
        : "/api/admin/products";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save product");
      }

      setSaveStatus("success");

      // Redirect to products list after success
      setTimeout(() => {
        router.push("/admin/products");
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
            onClick={() => router.push("/admin/products")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEditing ? "Edit Product" : "Create Product"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isEditing
                ? "Update product details"
                : "Add a new product to showcase"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEditing && initialData?.id && (
            <button
              type="button"
              onClick={() =>
                router.push(`/admin/products/${initialData.id}/details`)
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FileEdit className="w-4 h-4" />
              Edit Details Page
            </button>
          )}
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
                {isEditing ? "Update Product" : "Create Product"}
              </>
            )}
          </button>
        </div>
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
                  Product Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., MolyEcom - AI-Powered E-commerce Platform"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
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
                  placeholder="Describe the product and its key benefits..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Demo URL */}
              <div>
                <label
                  htmlFor="demoUrl"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Demo URL (optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    id="demoUrl"
                    name="demoUrl"
                    value={formData.demoUrl || ""}
                    onChange={handleChange}
                    placeholder="https://demo.example.com"
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {formData.demoUrl && (
                    <a
                      href={formData.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* URL Slug */}
              <div>
                <label
                  htmlFor="detailsSlug"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  URL Slug *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400">/products/</span>
                  <input
                    type="text"
                    id="detailsSlug"
                    name="detailsSlug"
                    value={formData.detailsSlug}
                    onChange={handleChange}
                    required
                    placeholder="product-slug"
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This will be the URL for the product details page
                </p>
              </div>

              {/* Image Upload */}
              <ImageUploader
                value={formData.image}
                onChange={(url) =>
                  setFormData((prev) => ({ ...prev, image: url }))
                }
                label="Product Image"
                folder="products"
              />

              {/* Icon & Gradient Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <IconPicker
                  value={formData.icon}
                  onChange={(icon) =>
                    setFormData((prev) => ({ ...prev, icon }))
                  }
                  label="Product Icon"
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
                    placeholder="Label (e.g., stores)"
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(index, "value", e.target.value)}
                    placeholder="Value (e.g., 500+)"
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
                Stats appear on the product card (e.g., &ldquo;500+ Stores&rdquo;)
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
                  {/* Category & Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-gray-700">
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </div>
                    <span className="text-xs font-bold tracking-wider text-white/80 uppercase">
                      {formData.category || "CATEGORY"}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold mb-2">
                    {formData.title || "Product Title"}
                  </h4>

                  {/* Description */}
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {formData.description || "Product description goes here..."}
                  </p>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-white/10">
                      <Image
                        src={formData.image}
                        alt="Product preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {statsArray
                      .filter((s) => s.key && s.value)
                      .slice(0, 3)
                      .map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="text-lg font-bold">{stat.value}</div>
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
                    Product will be visible on the website
                  </div>
                </div>
              </label>
            </div>
          </motion.div>

          {/* Quick Links */}
          {isEditing && initialData?.id && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Links
                </h3>
              </div>
              <div className="p-4 space-y-2">
                <a
                  href={`/products/${formData.detailsSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Product Page
                </a>
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/admin/products/${initialData.id}/details`)
                  }
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors w-full"
                >
                  <FileEdit className="w-4 h-4" />
                  Edit Details Content
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </form>
  );
}
