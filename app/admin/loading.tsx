import { DashboardSkeleton } from "@/components/admin/LoadingSkeleton";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="lg:pl-64">
        {/* Top Bar Skeleton */}
        <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-6">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </header>

        {/* Content */}
        <main className="p-4 lg:p-6">
          <DashboardSkeleton />
        </main>
      </div>
    </div>
  );
}
