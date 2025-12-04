"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import * as LucideIcons from "lucide-react";
import { GripVertical, AlertTriangle } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
  stats: Record<string, string>;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ServicesClientProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  initialServices: Service[];
}

export default function ServicesClient({
  user,
  initialServices,
}: ServicesClientProps) {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<Service | null>(null);

  // Get icon component
  const getIcon = (iconName: string) => {
    const Icon = (
      LucideIcons as Record<
        string,
        React.ComponentType<{ className?: string }>
      >
    )[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  const handleToggleActive = async (service: Service) => {
    try {
      const response = await fetch(`/api/admin/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !service.isActive }),
      });

      if (response.ok) {
        setServices((prev) =>
          prev.map((s) =>
            s.id === service.id ? { ...s, isActive: !s.isActive } : s
          )
        );
      }
    } catch (error) {
      console.error("Error toggling service status:", error);
    }
  };

  const handleDelete = async (service: Service) => {
    setIsDeleting(service.id);
    try {
      const response = await fetch(`/api/admin/services/${service.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setServices((prev) => prev.filter((s) => s.id !== service.id));
        setShowDeleteModal(null);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const columns = [
    {
      key: "order" as keyof Service,
      label: "#",
      className: "w-12",
      render: (item: Service) => (
        <div className="flex items-center gap-2 text-gray-400">
          <GripVertical className="w-4 h-4" />
          <span>{item.order + 1}</span>
        </div>
      ),
    },
    {
      key: "icon" as keyof Service,
      label: "Icon",
      className: "w-16",
      render: (item: Service) => (
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white`}
        >
          {getIcon(item.icon)}
        </div>
      ),
    },
    {
      key: "title" as keyof Service,
      label: "Title",
      sortable: true,
      render: (item: Service) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {item.title}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
            {item.description.substring(0, 60)}...
          </div>
        </div>
      ),
    },
    {
      key: "features" as keyof Service,
      label: "Features",
      render: (item: Service) => {
        const features = item.features as string[];
        return (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {features?.length || 0} features
          </div>
        );
      },
    },
    {
      key: "isActive" as keyof Service,
      label: "Status",
      render: (item: Service) => (
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
    <AdminLayout user={user} title="Services">
      <DataTable
        data={services}
        columns={columns}
        title="AI Automation Services"
        searchPlaceholder="Search services..."
        searchKeys={["title", "description"]}
        createHref="/admin/services/new"
        createLabel="Add Service"
        editHref={(item) => `/admin/services/${item.id}`}
        onDelete={(item) => setShowDeleteModal(item)}
        onToggleActive={handleToggleActive}
        activeKey="isActive"
        emptyMessage="No services found. Create your first service!"
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
                  Delete Service
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <strong>&ldquo;{showDeleteModal.title}&rdquo;</strong>? This will
              permanently remove the service from your website.
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
