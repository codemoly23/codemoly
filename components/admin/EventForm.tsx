"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Save,
  Loader2,
  Check,
  AlertCircle,
  ArrowLeft,
  Image as ImageIcon,
  Video,
  Youtube,
  Calendar,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";
import GradientPicker from "./GradientPicker";
import ImageUploader from "./ImageUploader";

interface EventFormData {
  title: string;
  subtitle: string;
  description: string;
  mediaType: "IMAGE" | "VIDEO" | "YOUTUBE";
  mediaUrl: string;
  thumbnail: string;
  gradient: string;
  eventDate: string;
  location: string;
  externalUrl: string;
  isActive: boolean;
}

interface EventFormProps {
  initialData?: EventFormData & { id?: string };
  isEditing?: boolean;
}

const defaultFormData: EventFormData = {
  title: "",
  subtitle: "",
  description: "",
  mediaType: "IMAGE",
  mediaUrl: "",
  thumbnail: "",
  gradient: "from-purple-600 via-pink-600 to-red-600",
  eventDate: "",
  location: "",
  externalUrl: "",
  isActive: true,
};

// Extract YouTube video ID from URL
function getYouTubeThumbnail(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
  }
  return "";
}

export default function EventForm({
  initialData,
  isEditing = false,
}: EventFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<EventFormData>(
    initialData
      ? {
          title: initialData.title,
          subtitle: initialData.subtitle || "",
          description: initialData.description || "",
          mediaType: initialData.mediaType,
          mediaUrl: initialData.mediaUrl,
          thumbnail: initialData.thumbnail || "",
          gradient: initialData.gradient,
          eventDate: initialData.eventDate
            ? new Date(initialData.eventDate).toISOString().split("T")[0]
            : "",
          location: initialData.location || "",
          externalUrl: initialData.externalUrl || "",
          isActive: initialData.isActive,
        }
      : defaultFormData
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    setSaveStatus("idle");

    // Auto-fetch YouTube thumbnail
    if (name === "mediaUrl" && formData.mediaType === "YOUTUBE") {
      const thumbnail = getYouTubeThumbnail(value);
      if (thumbnail) {
        setFormData((prev) => ({ ...prev, thumbnail }));
      }
    }
  };

  const handleMediaTypeChange = (mediaType: "IMAGE" | "VIDEO" | "YOUTUBE") => {
    setFormData((prev) => ({
      ...prev,
      mediaType,
      mediaUrl: "",
      thumbnail: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus("idle");
    setErrorMessage("");

    const payload = {
      ...formData,
      subtitle: formData.subtitle || null,
      description: formData.description || null,
      thumbnail: formData.thumbnail || null,
      eventDate: formData.eventDate || null,
      location: formData.location || null,
      externalUrl: formData.externalUrl || null,
    };

    try {
      const url = isEditing
        ? `/api/admin/events/${initialData?.id}`
        : "/api/admin/events";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save event");
      }

      setSaveStatus("success");

      // Redirect to events list after success
      setTimeout(() => {
        router.push("/admin/events");
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
              {isEditing ? "Edit Event" : "Create Event"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isEditing ? "Update event details" : "Add a new global event"}
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
              {isEditing ? "Update Event" : "Create Event"}
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
                  Event Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Tech Summit 2024"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label
                  htmlFor="subtitle"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subtitle (optional)
                </label>
                <input
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="e.g., In Paris"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Brief description of the event..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Date & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Paris, France"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* External URL */}
              <div>
                <label
                  htmlFor="externalUrl"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <LinkIcon className="w-4 h-4 inline mr-1" />
                  External Link (optional)
                </label>
                <input
                  type="url"
                  id="externalUrl"
                  name="externalUrl"
                  value={formData.externalUrl}
                  onChange={handleChange}
                  placeholder="https://event-website.com"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Media
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Media Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Media Type *
                </label>
                <div className="flex gap-3">
                  {[
                    { type: "IMAGE" as const, icon: ImageIcon, label: "Image" },
                    { type: "VIDEO" as const, icon: Video, label: "Video" },
                    {
                      type: "YOUTUBE" as const,
                      icon: Youtube,
                      label: "YouTube",
                    },
                  ].map(({ type, icon: Icon, label }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleMediaTypeChange(type)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                        formData.mediaType === type
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Media Input based on type */}
              {formData.mediaType === "IMAGE" && (
                <ImageUploader
                  value={formData.mediaUrl}
                  onChange={(url) =>
                    setFormData((prev) => ({ ...prev, mediaUrl: url }))
                  }
                  label="Event Image *"
                  folder="events"
                />
              )}

              {formData.mediaType === "VIDEO" && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="mediaUrl"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Video URL *
                    </label>
                    <input
                      type="url"
                      id="mediaUrl"
                      name="mediaUrl"
                      value={formData.mediaUrl}
                      onChange={handleChange}
                      required
                      placeholder="https://example.com/video.mp4"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <ImageUploader
                    value={formData.thumbnail}
                    onChange={(url) =>
                      setFormData((prev) => ({ ...prev, thumbnail: url }))
                    }
                    label="Video Thumbnail"
                    folder="events"
                  />
                </div>
              )}

              {formData.mediaType === "YOUTUBE" && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="mediaUrl"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      YouTube URL *
                    </label>
                    <input
                      type="url"
                      id="mediaUrl"
                      name="mediaUrl"
                      value={formData.mediaUrl}
                      onChange={handleChange}
                      required
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Thumbnail will be auto-fetched from YouTube
                    </p>
                  </div>
                  {formData.thumbnail && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        YouTube Thumbnail
                      </label>
                      <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={formData.thumbnail}
                          alt="YouTube thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Gradient Picker */}
              <GradientPicker
                value={formData.gradient}
                onChange={(gradient) =>
                  setFormData((prev) => ({ ...prev, gradient }))
                }
                label="Overlay Gradient"
              />
            </div>
          </motion.div>
        </div>

        {/* Preview & Settings */}
        <div className="space-y-6">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Preview
              </h3>
            </div>
            <div className="p-4">
              {/* Card Preview */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                {/* Background */}
                {formData.mediaUrl && formData.mediaType === "IMAGE" ? (
                  <Image
                    src={formData.mediaUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : formData.thumbnail ? (
                  <Image
                    src={formData.thumbnail}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${formData.gradient}`}
                  />
                )}

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${formData.gradient} opacity-60`}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <h4 className="text-lg font-bold">
                    {formData.title || "Event Title"}
                  </h4>
                  {formData.subtitle && (
                    <p className="text-white/80 text-sm">{formData.subtitle}</p>
                  )}
                  {(formData.eventDate || formData.location) && (
                    <div className="flex items-center gap-3 mt-2 text-xs text-white/70">
                      {formData.eventDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(formData.eventDate).toLocaleDateString()}
                        </span>
                      )}
                      {formData.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {formData.location}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Media type indicator */}
                {formData.mediaType !== "IMAGE" && (
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2">
                    {formData.mediaType === "VIDEO" ? (
                      <Video className="w-4 h-4 text-white" />
                    ) : (
                      <Youtube className="w-4 h-4 text-white" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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
                    Event will be visible on the website
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
