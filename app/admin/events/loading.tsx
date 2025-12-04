import { TableSkeleton } from "@/components/admin/LoadingSkeleton";

export default function EventsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 lg:px-6">
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </header>
        <main className="p-4 lg:p-6">
          <TableSkeleton rows={4} />
        </main>
      </div>
    </div>
  );
}
