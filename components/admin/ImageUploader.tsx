"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange?: (url: string) => void;
  label?: string;
  folder?: string; // Subfolder in /public/uploads/
  accept?: string;
  maxSize?: number; // in MB
}

export default function ImageUploader({
  value = "",
  onChange,
  label = "Upload Image",
  folder = "general",
  accept = "image/*",
  maxSize = 5,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setError(null);

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return;
      }

      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/admin/media/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Upload failed");
        }

        const data = await response.json();
        onChange?.(data.path);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [folder, maxSize, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleRemove = useCallback(() => {
    onChange?.("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [onChange]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>

      {value ? (
        // Preview Mode
        <div className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-2 bg-white/90 rounded-lg text-sm font-medium text-gray-900 hover:bg-white transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/60 rounded text-xs text-white truncate">
            {value}
          </div>
        </div>
      ) : (
        // Upload Mode
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
          } ${isUploading ? "pointer-events-none" : ""}`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Uploading...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {dragOver ? (
                  <Upload className="w-6 h-6 text-blue-500" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Click to upload
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {" "}
                  or drag and drop
                </span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                PNG, JPG, GIF up to {maxSize}MB
              </span>
            </div>
          )}
        </div>
      )}

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* URL Input as fallback */}
      <div className="mt-3">
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          Or enter image URL:
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="/uploads/image.jpg or https://..."
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
