"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  AlertTriangle,
  Check,
  Copy,
  File,
  Image as ImageIcon,
  Loader2,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";

interface Media {
  id: string;
  filename: string;
  path: string;
  mimeType: string;
  size: number;
  alt: string | null;
  createdAt: Date;
}

interface MediaLibraryClientProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  initialMedia: Media[];
  initialTotal: number;
}

export default function MediaLibraryClient({
  user,
  initialMedia,
  initialTotal,
}: MediaLibraryClientProps) {
  const [media, setMedia] = useState<Media[]>(initialMedia);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<Media | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const limit = 24;

  const fetchMedia = useCallback(async (pageNum: number, searchQuery: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: limit.toString(),
      });
      if (searchQuery) {
        params.set("search", searchQuery);
      }

      const response = await fetch(`/api/admin/media?${params}`);
      const data = await response.json();

      if (pageNum === 1) {
        setMedia(data.media);
      } else {
        setMedia((prev) => [...prev, ...data.media]);
      }
      setTotal(data.pagination.total);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    setPage(1);
    fetchMedia(1, search);
  }, [search, fetchMedia]);

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMedia(nextPage, search);
  }, [page, search, fetchMedia]);

  const handleUpload = useCallback(async (files: FileList) => {
    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "general");

        const response = await fetch("/api/admin/media/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Upload failed");
        }

        return response.json();
      });

      const results = await Promise.all(uploadPromises);

      // Add new media to the beginning of the list
      setMedia((prev) => [
        ...results.map((r) => ({
          id: r.id,
          filename: r.filename,
          path: r.path,
          mimeType: r.mimeType,
          size: r.size,
          alt: null,
          createdAt: new Date(),
        })),
        ...prev,
      ]);
      setTotal((prev) => prev + results.length);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      if (e.dataTransfer.files.length > 0) {
        handleUpload(e.dataTransfer.files);
      }
    },
    [handleUpload]
  );

  const handleDelete = useCallback(async (mediaItem: Media) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/media/${mediaItem.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMedia((prev) => prev.filter((m) => m.id !== mediaItem.id));
        setTotal((prev) => prev - 1);
        setShowDeleteModal(null);
        setSelectedMedia(null);
      }
    } catch (error) {
      console.error("Error deleting media:", error);
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const handleCopyUrl = useCallback((mediaItem: Media) => {
    navigator.clipboard.writeText(mediaItem.path);
    setCopiedId(mediaItem.id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const isImage = (mimeType: string) => mimeType.startsWith("image/");

  return (
    <AdminLayout user={user} title="Media Library">
      <div className="space-y-6">
        {/* Header & Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Media Library
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {total} files uploaded
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search files..."
                  className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {/* Upload Button */}
              <button
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragOver
              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
              : "border-gray-300 dark:border-gray-600"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              <span className="text-gray-500 dark:text-gray-400">
                Uploading...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">
                Drag and drop files here, or{" "}
                <button
                  onClick={() => inputRef.current?.click()}
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-gray-400">
                Supports: JPEG, PNG, GIF, WebP, SVG (max 10MB)
              </p>
            </div>
          )}
        </div>

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files?.length) {
              handleUpload(e.target.files);
            }
          }}
          className="hidden"
        />

        {/* Media Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          {media.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No media files found. Upload your first file!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {media.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMedia(item)}
                    className={`group relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 cursor-pointer border-2 transition-colors ${
                      selectedMedia?.id === item.id
                        ? "border-purple-500"
                        : "border-transparent hover:border-purple-300 dark:hover:border-purple-700"
                    }`}
                  >
                    {isImage(item.mimeType) ? (
                      <Image
                        src={item.path}
                        alt={item.alt || item.filename}
                        fill
                        className="object-cover"
                        unoptimized={item.path.startsWith('/uploads/')}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <File className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(item);
                        }}
                        className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        title="Copy URL"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteModal(item);
                        }}
                        className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {media.length < total && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    ) : (
                      `Load More (${media.length}/${total})`
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Media Details Sidebar */}
      {selectedMedia && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl z-50 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Media Details
            </h3>
            <button
              onClick={() => setSelectedMedia(null)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Preview */}
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              {isImage(selectedMedia.mimeType) ? (
                <Image
                  src={selectedMedia.path}
                  alt={selectedMedia.alt || selectedMedia.filename}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                  unoptimized={selectedMedia.path.startsWith('/uploads/')}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <File className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Filename
                </label>
                <p className="text-sm text-gray-900 dark:text-white break-all">
                  {selectedMedia.filename}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={selectedMedia.path}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => handleCopyUrl(selectedMedia)}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copiedId === selectedMedia.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Type
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {selectedMedia.mimeType}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Size
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {formatFileSize(selectedMedia.size)}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Uploaded
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {new Date(selectedMedia.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowDeleteModal(selectedMedia)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowDeleteModal(null)}
          />
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Delete File
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <strong>&ldquo;{showDeleteModal.filename}&rdquo;</strong>? This file
              may be in use elsewhere on your website.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
