"use client";

import { useState, useMemo } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { AlertTriangle, ChevronRight, Edit2, FolderPlus, Plus, Trash2, X } from "lucide-react";

interface ParentCategory {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  parent: ParentCategory | null;
  children: ParentCategory[];
  _count: { blogs: number };
  createdAt: Date;
  updatedAt: Date;
}

interface CategoriesClientProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  initialCategories: Category[];
}

export default function CategoriesClient({
  user,
  initialCategories,
}: CategoriesClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", parentId: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  // Get parent categories (categories without parent) for dropdown
  const parentCategories = useMemo(() => {
    return categories.filter((c) => !c.parentId);
  }, [categories]);

  // Organize categories into tree structure
  const organizedCategories = useMemo(() => {
    const parents = categories.filter((c) => !c.parentId);
    const result: (Category & { level: number })[] = [];

    parents.forEach((parent) => {
      result.push({ ...parent, level: 0 });
      const children = categories.filter((c) => c.parentId === parent.id);
      children.forEach((child) => {
        result.push({ ...child, level: 1 });
      });
    });

    // Add orphan categories (those with parentId that doesn't exist)
    const includedIds = new Set(result.map((c) => c.id));
    categories.forEach((c) => {
      if (!includedIds.has(c.id)) {
        result.push({ ...c, level: 0 });
      }
    });

    return result;
  }, [categories]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: editingCategory ? formData.slug : generateSlug(name),
    });
  };

  const openCreateModal = (parentId?: string) => {
    setEditingCategory(null);
    setFormData({ name: "", slug: "", parentId: parentId || "" });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      parentId: category.parentId || "",
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.slug.trim()) {
      setError("Name and slug are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = editingCategory
        ? `/api/admin/blog/categories/${editingCategory.id}`
        : "/api/admin/blog/categories";

      const response = await fetch(url, {
        method: editingCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
          parentId: formData.parentId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save category");
        return;
      }

      // Refetch categories to get updated tree structure
      const refreshResponse = await fetch("/api/admin/blog/categories");
      const refreshedCategories = await refreshResponse.json();
      setCategories(refreshedCategories);

      setIsModalOpen(false);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (category: Category) => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/blog/categories/${category.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== category.id));
        setShowDeleteModal(null);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete category");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const getBlogCount = (category: Category) => {
    return category._count?.blogs || 0;
  };

  const hasChildren = (category: Category) => {
    return categories.some((c) => c.parentId === category.id);
  };

  return (
    <AdminLayout user={user} title="Blog Categories">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Categories
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage blog categories and subcategories
            </p>
          </div>
          <button
            onClick={() => openCreateModal()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Posts
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {organizedCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      No categories found. Create your first category!
                    </p>
                  </td>
                </tr>
              ) : (
                organizedCategories.map((category) => (
                  <tr
                    key={category.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                      category.level > 0 ? "bg-gray-50/50 dark:bg-gray-900/20" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {category.level > 0 && (
                          <span className="text-gray-400 ml-4 flex items-center">
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        )}
                        <span
                          className={`font-medium ${
                            category.level > 0
                              ? "text-gray-700 dark:text-gray-300"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {category.name}
                        </span>
                        {category.level === 0 && (
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            (Parent)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {category.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {getBlogCount(category)} posts
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {category.level === 0 && (
                          <button
                            onClick={() => openCreateModal(category.id)}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Add Subcategory"
                          >
                            <FolderPlus className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => openEditModal(category)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(category)}
                          disabled={getBlogCount(category) > 0 || hasChildren(category)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title={
                            getBlogCount(category) > 0
                              ? "Cannot delete category with posts"
                              : hasChildren(category)
                              ? "Cannot delete category with subcategories"
                              : "Delete"
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingCategory
                  ? "Edit Category"
                  : formData.parentId
                  ? "Create Subcategory"
                  : "Create Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Parent Category Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Parent Category (Optional)
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) =>
                    setFormData({ ...formData, parentId: e.target.value })
                  }
                  disabled={!!(editingCategory && hasChildren(editingCategory))}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                >
                  <option value="">None (Top Level Category)</option>
                  {parentCategories
                    .filter((c) => !editingCategory || c.id !== editingCategory.id)
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {editingCategory && hasChildren(editingCategory) && (
                  <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                    Cannot change parent - this category has subcategories
                  </p>
                )}
                {!editingCategory && formData.parentId && (
                  <p className="mt-1 text-xs text-gray-500">
                    This will be a subcategory of{" "}
                    <strong>
                      {parentCategories.find((c) => c.id === formData.parentId)?.name}
                    </strong>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Category name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="category-slug"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  URL: /blog/category/{formData.slug || "slug"}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingCategory
                    ? "Update"
                    : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  Delete Category
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <strong>&ldquo;{showDeleteModal.name}&rdquo;</strong>?
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
