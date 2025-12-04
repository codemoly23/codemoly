"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Save,
  Loader2,
  Check,
  AlertCircle,
  ArrowLeft,
  Grid3X3,
  SlidersHorizontal,
} from "lucide-react";

interface EventSectionSettings {
  id: string;
  sectionTitle: string;
  sectionDesc: string;
  displayMode: "GRID" | "SLIDER";
  autoSlideDelay: number;
  updatedAt: Date;
}

interface EventSettingsClientProps {
  initialSettings: EventSectionSettings;
}

export default function EventSettingsClient({
  initialSettings,
}: EventSettingsClientProps) {
  const router = useRouter();
  const [settings, setSettings] = useState({
    sectionTitle: initialSettings.sectionTitle,
    sectionDesc: initialSettings.sectionDesc,
    displayMode: initialSettings.displayMode,
    autoSlideDelay: initialSettings.autoSlideDelay,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
    setSaveStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/events/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save settings");
      }

      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      setSaveStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to save"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/events")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Event Section Settings
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Configure how the events section appears on your website
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
              Save Settings
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Section Content
            </h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Section Title */}
            <div>
              <label
                htmlFor="sectionTitle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Section Title
              </label>
              <input
                type="text"
                id="sectionTitle"
                name="sectionTitle"
                value={settings.sectionTitle}
                onChange={handleChange}
                placeholder="e.g., Global Events"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Section Description */}
            <div>
              <label
                htmlFor="sectionDesc"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Section Description
              </label>
              <textarea
                id="sectionDesc"
                name="sectionDesc"
                value={settings.sectionDesc}
                onChange={handleChange}
                rows={4}
                placeholder="Description for the events section..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Display Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Display Settings
            </h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Display Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Display Mode
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, displayMode: "GRID" }))
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    settings.displayMode === "GRID"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                  <span className="font-medium">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, displayMode: "SLIDER" }))
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    settings.displayMode === "SLIDER"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="font-medium">Slider</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Grid shows all events, Slider shows carousel (auto-switches if &gt;4
                events)
              </p>
            </div>

            {/* Auto Slide Delay */}
            {settings.displayMode === "SLIDER" && (
              <div>
                <label
                  htmlFor="autoSlideDelay"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Auto Slide Delay (ms)
                </label>
                <input
                  type="number"
                  id="autoSlideDelay"
                  name="autoSlideDelay"
                  value={settings.autoSlideDelay}
                  onChange={handleChange}
                  min={1000}
                  max={30000}
                  step={500}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Time between automatic slides (1000ms = 1 second)
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </form>
  );
}
