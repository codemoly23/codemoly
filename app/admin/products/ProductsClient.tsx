"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import * as LucideIcons from "lucide-react";
import { GripVertical, AlertTriangle, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
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
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductsClientProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  initialProducts: Product[];
}

export default function ProductsClient({
  user,
  initialProducts,
}: ProductsClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<Product | null>(null);

  // Get icon component
  const getIcon = (iconName: string) => {
    const Icon = (
      LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ className?: string }>
      >
    )[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  const handleToggleActive = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !product.isActive }),
      });

      if (response.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, isActive: !p.isActive } : p
          )
        );
      }
    } catch (error) {
      console.error("Error toggling product status:", error);
    }
  };

  const handleDelete = async (product: Product) => {
    setIsDeleting(product.id);
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
        setShowDeleteModal(null);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const columns = [
    {
      key: "order" as keyof Product,
      label: "#",
      className: "w-12",
      render: (item: Product) => (
        <div className="flex items-center gap-2 text-gray-400">
          <GripVertical className="w-4 h-4" />
          <span>{item.order + 1}</span>
        </div>
      ),
    },
    {
      key: "image" as keyof Product,
      label: "Image",
      className: "w-20",
      render: (item: Product) => (
        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white`}
            >
              {getIcon(item.icon)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "title" as keyof Product,
      label: "Product",
      sortable: true,
      render: (item: Product) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {item.title}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {item.category}
          </div>
        </div>
      ),
    },
    {
      key: "detailsSlug" as keyof Product,
      label: "Slug",
      render: (item: Product) => (
        <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          /products/{item.detailsSlug}
        </code>
      ),
    },
    {
      key: "demoUrl" as keyof Product,
      label: "Demo",
      className: "w-20",
      render: (item: Product) =>
        item.demoUrl ? (
          <a
            href={item.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <span className="text-gray-400 text-sm">-</span>
        ),
    },
    {
      key: "features" as keyof Product,
      label: "Features",
      render: (item: Product) => {
        const features = item.features as string[];
        return (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {features?.length || 0} features
          </div>
        );
      },
    },
    {
      key: "isActive" as keyof Product,
      label: "Status",
      render: (item: Product) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout user={user} title="Products">
      <DataTable
        data={products}
        columns={columns}
        title="Products"
        searchPlaceholder="Search products..."
        searchKeys={["title", "description", "category"]}
        createHref="/admin/products/new"
        createLabel="Add Product"
        editHref={(item) => `/admin/products/${item.id}`}
        onDelete={(item) => setShowDeleteModal(item)}
        onToggleActive={handleToggleActive}
        activeKey="isActive"
        emptyMessage="No products found. Create your first product!"
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
                  Delete Product
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <strong>&ldquo;{showDeleteModal.title}&rdquo;</strong>? This will
              permanently remove the product from your website.
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
