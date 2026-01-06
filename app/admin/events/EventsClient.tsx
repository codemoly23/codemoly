"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import {
  GripVertical,
  AlertTriangle,
  Image as ImageIcon,
  Video,
  Youtube,
  Calendar,
  MapPin,
  Settings,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  mediaType: "IMAGE" | "VIDEO" | "YOUTUBE";
  mediaUrl: string;
  thumbnail: string | null;
  gradient: string;
  eventDate: Date | null;
  location: string | null;
  externalUrl: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface EventsClientProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  initialEvents: Event[];
}

export default function EventsClient({
  user,
  initialEvents,
}: EventsClientProps) {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<Event | null>(null);

  // Get media type icon
  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case "VIDEO":
        return <Video className="w-4 h-4" />;
      case "YOUTUBE":
        return <Youtube className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  const handleToggleActive = async (event: Event) => {
    try {
      const response = await fetch(`/api/admin/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !event.isActive }),
      });

      if (response.ok) {
        setEvents((prev) =>
          prev.map((e) =>
            e.id === event.id ? { ...e, isActive: !e.isActive } : e
          )
        );
      }
    } catch (error) {
      console.error("Error toggling event status:", error);
    }
  };

  const handleDelete = async (event: Event) => {
    setIsDeleting(event.id);
    try {
      const response = await fetch(`/api/admin/events/${event.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== event.id));
        setShowDeleteModal(null);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const columns = [
    {
      key: "order" as keyof Event,
      label: "#",
      className: "w-12",
      render: (item: Event) => (
        <div className="flex items-center gap-2 text-gray-400">
          <GripVertical className="w-4 h-4" />
          <span>{item.order + 1}</span>
        </div>
      ),
    },
    {
      key: "mediaUrl" as keyof Event,
      label: "Media",
      className: "w-24",
      render: (item: Event) => (
        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          {item.mediaType === "IMAGE" ? (
            <Image
              src={item.mediaUrl}
              alt={item.title}
              fill
              className="object-cover"
              unoptimized={item.mediaUrl.startsWith('/uploads/')}
            />
          ) : item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover"
              unoptimized={item.thumbnail.startsWith('/uploads/')}
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white`}
            >
              {getMediaIcon(item.mediaType)}
            </div>
          )}
          <div className="absolute bottom-0 right-0 bg-black/70 p-0.5 rounded-tl">
            {getMediaIcon(item.mediaType)}
          </div>
        </div>
      ),
    },
    {
      key: "title" as keyof Event,
      label: "Event",
      sortable: true,
      render: (item: Event) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {item.title}
          </div>
          {item.subtitle && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {item.subtitle}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "eventDate" as keyof Event,
      label: "Date & Location",
      render: (item: Event) => (
        <div className="text-sm">
          {item.eventDate && (
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <Calendar className="w-3 h-3" />
              {new Date(item.eventDate).toLocaleDateString()}
            </div>
          )}
          {item.location && (
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <MapPin className="w-3 h-3" />
              {item.location}
            </div>
          )}
          {!item.eventDate && !item.location && (
            <span className="text-gray-400">-</span>
          )}
        </div>
      ),
    },
    {
      key: "mediaType" as keyof Event,
      label: "Type",
      render: (item: Event) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.mediaType === "IMAGE"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
              : item.mediaType === "VIDEO"
              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {getMediaIcon(item.mediaType)}
          {item.mediaType}
        </span>
      ),
    },
    {
      key: "isActive" as keyof Event,
      label: "Status",
      render: (item: Event) => (
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
    <AdminLayout user={user} title="Events">
      {/* Settings Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => router.push("/admin/events/settings")}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Section Settings
        </button>
      </div>

      <DataTable
        data={events}
        columns={columns}
        title="Global Events"
        searchPlaceholder="Search events..."
        searchKeys={["title", "subtitle", "location"]}
        createHref="/admin/events/new"
        createLabel="Add Event"
        editHref={(item) => `/admin/events/${item.id}`}
        onDelete={(item) => setShowDeleteModal(item)}
        onToggleActive={handleToggleActive}
        activeKey="isActive"
        emptyMessage="No events found. Create your first event!"
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
                  Delete Event
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <strong>&ldquo;{showDeleteModal.title}&rdquo;</strong>? This will
              permanently remove the event from your website.
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
