"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Check, AlertCircle, Video, Type, FileText } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface SiteSettings {
  id: string;
  heroVideoUrl: string;
  heroTitle: string | null;
  heroSubtitle: string | null;
  servicesTitle: string;
  servicesDesc: string;
  updatedAt: Date;
}

interface SettingsFormProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  initialSettings: SiteSettings;
}

export default function SettingsForm({ user, initialSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
    setSaveStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save settings");
      }

      const updatedSettings = await response.json();
      setSettings(updatedSettings);
      setSaveStatus("success");

      // Reset success status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout user={user} title="Site Settings">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Site Settings
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Configure your website&apos;s global settings
            </p>
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
                Save Changes
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

        {/* Hero Section Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Hero Section
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Configure the main hero section video and text
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Hero Video URL */}
            <div>
              <label
                htmlFor="heroVideoUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                YouTube Video URL
              </label>
              <input
                type="text"
                id="heroVideoUrl"
                name="heroVideoUrl"
                value={settings.heroVideoUrl}
                onChange={handleChange}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Use the embed URL format (e.g., https://www.youtube.com/embed/VIDEO_ID)
              </p>
            </div>

            {/* Video Preview */}
            {settings.heroVideoUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Video Preview
                </label>
                <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <iframe
                    src={settings.heroVideoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Hero Title */}
            <div>
              <label
                htmlFor="heroTitle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Hero Title (Optional)
              </label>
              <input
                type="text"
                id="heroTitle"
                name="heroTitle"
                value={settings.heroTitle || ""}
                onChange={handleChange}
                placeholder="Override default hero title..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Hero Subtitle */}
            <div>
              <label
                htmlFor="heroSubtitle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Hero Subtitle (Optional)
              </label>
              <textarea
                id="heroSubtitle"
                name="heroSubtitle"
                value={settings.heroSubtitle || ""}
                onChange={handleChange}
                rows={2}
                placeholder="Override default hero subtitle..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Services Section Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <Type className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Automations Section
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Configure the services section header text
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Services Title */}
            <div>
              <label
                htmlFor="servicesTitle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Section Title
              </label>
              <input
                type="text"
                id="servicesTitle"
                name="servicesTitle"
                value={settings.servicesTitle}
                onChange={handleChange}
                placeholder="Intelligent Solutions for Every Business Need"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Services Description */}
            <div>
              <label
                htmlFor="servicesDesc"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Section Description
              </label>
              <textarea
                id="servicesDesc"
                name="servicesDesc"
                value={settings.servicesDesc}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your AI automation services..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-right">
          Last updated:{" "}
          {new Date(settings.updatedAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
      </form>
    </AdminLayout>
  );
}
