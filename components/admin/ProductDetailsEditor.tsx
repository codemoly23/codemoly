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
  ExternalLink,
  Eye,
} from "lucide-react";
import SunEditorWrapper from "./SunEditorWrapper";

interface ProductDetailsEditorProps {
  productId: string;
  productTitle: string;
  productSlug: string;
  initialContent: string;
}

export default function ProductDetailsEditor({
  productId,
  productTitle,
  productSlug,
  initialContent,
}: ProductDetailsEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch(`/api/admin/products/${productId}/details`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ detailsContent: content }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save details");
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
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push(`/admin/products/${productId}`)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Product Details
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {productTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/products/${productSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Page
          </a>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
              showPreview
                ? "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide Preview" : "Preview"}
          </button>
          <button
            onClick={handleSave}
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

      {/* Editor and Preview */}
      <div className={`grid gap-6 ${showPreview ? "grid-cols-2" : "grid-cols-1"}`}>
        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Details Content
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This content will be displayed on the product details page
            </p>
          </div>
          <div className="p-4">
            <SunEditorWrapper
              value={content}
              onChange={setContent}
              placeholder="Write the full product details here..."
              height="500px"
              minHeight="400px"
              maxHeight="800px"
            />
          </div>
        </motion.div>

        {/* Preview */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Preview
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                How it will look on the product page
              </p>
            </div>
            <div className="p-6 overflow-auto max-h-[600px]">
              <article
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content || "<p class='text-gray-400'>No content yet...</p>" }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
      >
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Tips for great product details:
        </h4>
        <ul className="list-disc list-inside text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>Use headings to organize sections (Overview, Features, Pricing, FAQ)</li>
          <li>Include screenshots or demo videos</li>
          <li>Highlight key benefits and use cases</li>
          <li>Add tables for feature comparison or pricing tiers</li>
          <li>Include customer testimonials if available</li>
        </ul>
      </motion.div>
    </div>
  );
}
