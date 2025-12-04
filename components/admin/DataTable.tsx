"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronUp,
  ChevronDown,
  Search,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  EyeOff,
} from "lucide-react";

interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  createHref?: string;
  createLabel?: string;
  onEdit?: (item: T) => void;
  editHref?: (item: T) => string;
  onDelete?: (item: T) => void;
  onToggleActive?: (item: T) => void;
  activeKey?: keyof T;
  emptyMessage?: string;
  isLoading?: boolean;
}

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  title,
  searchPlaceholder = "Search...",
  searchKeys = [],
  createHref,
  createLabel = "Create New",
  onEdit,
  editHref,
  onDelete,
  onToggleActive,
  activeKey,
  emptyMessage = "No items found",
  isLoading = false,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  // Filter data based on search
  const filteredData = data.filter((item) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return searchKeys.some((key) => {
      const value = item[key];
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchLower);
      }
      return false;
    });
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = (a as Record<string, unknown>)[sortKey];
    const bValue = (b as Record<string, unknown>)[sortKey];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const getValue = (item: T, key: keyof T | string): unknown => {
    if (typeof key === "string" && key.includes(".")) {
      const keys = key.split(".");
      let value: unknown = item;
      for (const k of keys) {
        value = (value as Record<string, unknown>)?.[k];
      }
      return value;
    }
    return item[key as keyof T];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}

          <div className="flex items-center gap-3">
            {/* Search */}
            {searchKeys.length > 0 && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
            )}

            {/* Create Button */}
            {createHref && (
              <Link
                href={createHref}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                {createLabel}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                    column.className || ""
                  }`}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(String(column.key))}
                      className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      {column.label}
                      {sortKey === String(column.key) ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
              {(onEdit || editHref || onDelete || onToggleActive) && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto" />
                  </td>
                </tr>
              ))
            ) : sortedData.length === 0 ? (
              // Empty state
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (onEdit || editHref || onDelete || onToggleActive ? 1 : 0)
                  }
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              // Data rows
              sortedData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`px-6 py-4 text-sm text-gray-900 dark:text-white ${
                        column.className || ""
                      }`}
                    >
                      {column.render
                        ? column.render(item)
                        : String(getValue(item, column.key) ?? "")}
                    </td>
                  ))}
                  {(onEdit || editHref || onDelete || onToggleActive) && (
                    <td className="px-6 py-4 text-right">
                      <div className="relative flex items-center justify-end gap-2">
                        {/* Toggle Active */}
                        {onToggleActive && activeKey && (
                          <button
                            onClick={() => onToggleActive(item)}
                            className={`p-2 rounded-lg transition-colors ${
                              item[activeKey]
                                ? "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                                : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                            title={item[activeKey] ? "Active" : "Inactive"}
                          >
                            {item[activeKey] ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                        )}

                        {/* Edit */}
                        {(onEdit || editHref) && (
                          editHref ? (
                            <Link
                              href={editHref(item)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                          ) : (
                            <button
                              onClick={() => onEdit?.(item)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )
                        )}

                        {/* Delete */}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        Showing {sortedData.length} of {data.length} items
      </div>
    </div>
  );
}
