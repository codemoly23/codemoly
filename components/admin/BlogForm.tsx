"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import ImageUploader from "./ImageUploader";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  ImageIcon,
  Loader2,
  Save,
  X,
} from "lucide-react";

// Dynamically import SunEditor to avoid SSR issues
const SunEditorWrapper = dynamic(() => import("./SunEditorWrapper"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
    </div>
  ),
});

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BlogFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    categoryId: string;
    isPublished: boolean;
    publishedAt: Date | null;
  };
  categories: Category[];
}

export default function BlogForm({ initialData, categories }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showImageUploader, setShowImageUploader] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    coverImage: initialData?.coverImage || "",
    categoryId: initialData?.categoryId || "",
    isPublished: initialData?.isPublished || false,
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (!initialData && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.slug || !formData.content || !formData.categoryId) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = initialData
        ? `/api/admin/blog/${initialData.id}`
        : "/api/admin/blog";

      const response = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save blog post");
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, coverImage: imageUrl }));
    setShowImageUploader(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {initialData ? "Edit Blog Post" : "Create Blog Post"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Publish Toggle */}
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  isPublished: !prev.isPublished,
                }))
              }
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                formData.isPublished
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {formData.isPublished ? (
                <>
                  <Eye className="w-4 h-4" />
                  Published
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4" />
                  Draft
                </>
              )}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Post
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-3 text-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Content Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content *
              </label>
              <SunEditorWrapper
                value={formData.content}
                onChange={(content) =>
                  setFormData((prev) => ({ ...prev, content }))
                }
                height="400px"
              />
            </div>

            {/* Excerpt */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                rows={3}
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Brief description for search results and previews"
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave empty to auto-generate from content
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* URL Slug */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="post-url-slug"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                /blog/{formData.slug || "slug"}
              </p>
            </div>

            {/* Category */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                  No categories found.{" "}
                  <Link
                    href="/admin/blog/categories"
                    className="underline hover:no-underline"
                  >
                    Create one first
                  </Link>
                </p>
              )}
            </div>

            {/* Cover Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image
              </label>

              {formData.coverImage ? (
                <div className="relative">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={formData.coverImage}
                      alt="Cover"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowImageUploader(true)}
                      className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm text-gray-700"
                      title="Change image"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, coverImage: "" }))
                      }
                      className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm text-red-600"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowImageUploader(true)}
                  className="w-full aspect-video border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-purple-500 dark:hover:border-purple-500 transition-colors"
                >
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Click to upload
                  </span>
                </button>
              )}
            </div>

            {/* Post Info (for existing posts) */}
            {initialData && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Post Info
                </h3>
                <dl className="space-y-2 text-sm">
                  {initialData.publishedAt && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Published
                      </dt>
                      <dd className="text-gray-900 dark:text-white">
                        {new Date(initialData.publishedAt).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">ID</dt>
                    <dd className="text-gray-900 dark:text-white font-mono text-xs">
                      {initialData.id.slice(0, 8)}...
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Image Uploader Modal */}
      {showImageUploader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowImageUploader(false)}
          />
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Upload Cover Image
              </h3>
              <button
                onClick={() => setShowImageUploader(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ImageUploader
              value={formData.coverImage}
              onChange={handleImageSelect}
              folder="blog"
            />
          </div>
        </div>
      )}
    </div>
  );
}
