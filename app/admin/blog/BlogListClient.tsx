"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import { AlertTriangle, Eye, EyeOff, FolderOpen, Settings } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  authorId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  author: {
    id: string;
    name: string;
    email: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BlogListClientProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  initialBlogs: Blog[];
  categories: Category[];
}

export default function BlogListClient({
  user,
  initialBlogs,
  categories,
}: BlogListClientProps) {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<Blog | null>(null);

  const handleTogglePublished = async (blog: Blog) => {
    try {
      const response = await fetch(`/api/admin/blog/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !blog.isPublished }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs((prev) =>
          prev.map((b) =>
            b.id === blog.id
              ? {
                  ...b,
                  isPublished: updatedBlog.isPublished,
                  publishedAt: updatedBlog.publishedAt,
                }
              : b
          )
        );
      }
    } catch (error) {
      console.error("Error toggling blog status:", error);
    }
  };

  const handleDelete = async (blog: Blog) => {
    setIsDeleting(blog.id);
    try {
      const response = await fetch(`/api/admin/blog/${blog.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
        setShowDeleteModal(null);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const columns = [
    {
      key: "coverImage" as keyof Blog,
      label: "Cover",
      className: "w-20",
      render: (item: Blog) => (
        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          {item.coverImage ? (
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              className="object-cover"
              unoptimized={item.coverImage.startsWith('/uploads/')}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <FolderOpen className="w-5 h-5" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "title" as keyof Blog,
      label: "Title",
      sortable: true,
      render: (item: Blog) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {item.title}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            /{item.slug}
          </div>
        </div>
      ),
    },
    {
      key: "category" as keyof Blog,
      label: "Category",
      render: (item: Blog) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
          {item.category.name}
        </span>
      ),
    },
    {
      key: "author" as keyof Blog,
      label: "Author",
      render: (item: Blog) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {item.author.name}
        </span>
      ),
    },
    {
      key: "isPublished" as keyof Blog,
      label: "Status",
      render: (item: Blog) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleTogglePublished(item);
          }}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
            item.isPublished
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {item.isPublished ? (
            <>
              <Eye className="w-3 h-3" />
              Published
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3" />
              Draft
            </>
          )}
        </button>
      ),
    },
    {
      key: "publishedAt" as keyof Blog,
      label: "Date",
      render: (item: Blog) => (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString()
            : new Date(item.createdAt).toLocaleDateString()}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout user={user} title="Blog Posts">
      {/* Action Buttons */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => router.push("/admin/blog/categories")}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Manage Categories
        </button>
      </div>

      <DataTable
        data={blogs}
        columns={columns}
        title="Blog Posts"
        searchPlaceholder="Search posts..."
        searchKeys={["title", "slug"]}
        createHref="/admin/blog/new"
        createLabel="Create Post"
        editHref={(item) => `/admin/blog/${item.id}`}
        onDelete={(item) => setShowDeleteModal(item)}
        emptyMessage="No blog posts found. Create your first post!"
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
                  Delete Blog Post
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <strong>&ldquo;{showDeleteModal.title}&rdquo;</strong>? This will
              permanently remove the blog post from your website.
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
                disabled={isDeleting === showDeleteModal.id}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {isDeleting === showDeleteModal.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
