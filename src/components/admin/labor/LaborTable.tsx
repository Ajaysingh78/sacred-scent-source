// src/components/admin/labor/LaborTable.tsx

import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit2,
  Trash2,
  UserPlus,
  Filter,
} from "lucide-react";
import type {
  Labor,
  LaborFilters,
  PaginationState,
  LaborStatus,
  Department,
} from "@/types/labor";
import { DEPARTMENTS, LABOR_STATUSES, PAGE_SIZE_OPTIONS } from "@/types/labor";

// ─── Props ────────────────────────────────────────────────────────────────────
interface LaborTableProps {
  laborers: Labor[];
  filteredLaborers: Labor[];
  paginatedLaborers: Labor[];
  loading: boolean;
  filters: LaborFilters;
  pagination: PaginationState;
  onFilterChange: (f: Partial<LaborFilters>) => void;
  onPaginationChange: (p: Partial<PaginationState>) => void;
  onView: (labor: Labor) => void;
  onEdit: (labor: Labor) => void;
  onDelete: (labor: Labor) => void;
  onAddNew: () => void;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: LaborStatus }) => {
  const config: Record<LaborStatus, { label: string; class: string }> = {
    active: {
      label: "Active",
      class: "bg-green-100 text-green-700 border-green-200",
    },
    inactive: {
      label: "Inactive",
      class: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    terminated: {
      label: "Terminated",
      class: "bg-red-100 text-red-700 border-red-200",
    },
  };
  const { label, class: cls } = config[status] ?? config.active;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}
    >
      {label}
    </span>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({
  hasFilters,
  onAddNew,
}: {
  hasFilters: boolean;
  onAddNew: () => void;
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4">
      <span className="text-4xl">👷</span>
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      {hasFilters ? "No workers found" : "No workers registered yet"}
    </h3>
    <p className="text-sm text-gray-500 mb-6 max-w-xs">
      {hasFilters
        ? "Try adjusting your search or filters to find workers."
        : "Start by registering your first worker."}
    </p>
    {!hasFilters && (
      <button
        onClick={onAddNew}
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-amber-700 transition-all shadow-md"
      >
        <UserPlus className="w-4 h-4" />
        Register First Worker
      </button>
    )}
  </div>
);

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[...Array(7)].map((_, i) => (
      <td key={i} className="px-4 py-4">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </td>
    ))}
  </tr>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const LaborTable = ({
  laborers,
  filteredLaborers,
  paginatedLaborers,
  loading,
  filters,
  pagination,
  onFilterChange,
  onPaginationChange,
  onView,
  onEdit,
  onDelete,
  onAddNew,
}: LaborTableProps) => {
  const totalPages = Math.ceil(filteredLaborers.length / pagination.pageSize);
  const hasFilters =
    filters.searchQuery !== "" ||
    filters.statusFilter !== "all" ||
    filters.departmentFilter !== "all";

  const handleDeleteClick = (labor: Labor) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${labor.fullName}? This action cannot be undone.`,
      )
    ) {
      onDelete(labor);
    }
  };

  const formatDate = (dateValue: any) => {
    if (!dateValue) return "-";

    try {
      // Firebase Timestamp
      if (dateValue?.toDate) {
        return dateValue.toDate().toLocaleDateString("en-IN");
      }

      // Normal string date
      if (typeof dateValue === "string") {
        return new Date(dateValue).toLocaleDateString("en-IN");
      }

      // JS Date object
      if (dateValue instanceof Date) {
        return dateValue.toLocaleDateString("en-IN");
      }

      return "-";
    } catch (error) {
      console.error("Date formatting error:", error);
      return "-";
    }
  };

  return (
    <div className="space-y-4">
      {/* ── Toolbar ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, mobile, Aadhaar, department..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 hidden md:block" />
            <select
              value={filters.statusFilter}
              onChange={(e) =>
                onFilterChange({
                  statusFilter: e.target.value as LaborStatus | "all",
                })
              }
              className="px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              <option value="all">All Status</option>
              {LABOR_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Department filter */}
          <select
            value={filters.departmentFilter}
            onChange={(e) =>
              onFilterChange({
                departmentFilter: e.target.value as Department | "all",
              })
            }
            className="px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="all">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Add button */}
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-amber-700 transition-all shadow-sm whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            Add Worker
          </button>
        </div>

        {/* Results count */}
        {!loading && (
          <div className="mt-3 text-xs text-gray-500">
            Showing {paginatedLaborers.length} of {filteredLaborers.length}{" "}
            workers
            {hasFilters && ` (filtered from ${laborers.length} total)`}
          </div>
        )}
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Worker
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide hidden md:table-cell">
                  Mobile
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide hidden lg:table-cell">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide hidden lg:table-cell">
                  Joining Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : paginatedLaborers.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState hasFilters={hasFilters} onAddNew={onAddNew} />
                  </td>
                </tr>
              ) : (
                paginatedLaborers.map((labor, index) => {
                  const rowNumber =
                    (pagination.currentPage - 1) * pagination.pageSize +
                    index +
                    1;
                  return (
                    <tr
                      key={labor.id}
                      className="hover:bg-orange-50/40 transition-colors cursor-pointer group"
                      onClick={() => onView(labor)}
                    >
                      {/* Row number */}
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {rowNumber}
                      </td>

                      {/* Worker name + photo */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {labor.documents?.photoURL ? (
                            <img
                              src={labor.documents.photoURL}
                              alt={labor.fullName}
                              className="w-9 h-9 rounded-full object-cover border-2 border-orange-200 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-orange-600 text-sm font-bold">
                                {labor.fullName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate max-w-[150px]">
                              {labor.fullName}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {labor.city}, {labor.state}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Mobile */}
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                        {labor.mobileNumber}
                      </td>

                      {/* Department */}
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                          {labor.department}
                        </span>
                      </td>

                      {/* Joining Date */}
                      <td className="px-4 py-3 text-gray-600 text-xs hidden lg:table-cell">
                        {formatDate(labor.joiningDate)}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <StatusBadge status={labor.status} />
                      </td>

                      {/* Actions */}
                      <td
                        className="px-4 py-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onView(labor)}
                            title="View Details"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEdit(labor)}
                            title="Edit"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(labor)}
                            title="Delete"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        {!loading && filteredLaborers.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Page size */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Show</span>
              <select
                value={pagination.pageSize}
                onChange={(e) =>
                  onPaginationChange({
                    pageSize: Number(e.target.value),
                    currentPage: 1,
                  })
                }
                className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {PAGE_SIZE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span>per page</span>
            </div>

            {/* Page controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  onPaginationChange({
                    currentPage: pagination.currentPage - 1,
                  })
                }
                disabled={pagination.currentPage === 1}
                className="p-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - pagination.currentPage) <= 1
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => onPaginationChange({ currentPage: page })}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        pagination.currentPage === page
                          ? "bg-orange-500 text-white shadow-sm"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
                if (Math.abs(page - pagination.currentPage) === 2) {
                  return (
                    <span key={page} className="text-gray-400 px-1">
                      …
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() =>
                  onPaginationChange({
                    currentPage: pagination.currentPage + 1,
                  })
                }
                disabled={
                  pagination.currentPage === totalPages || totalPages === 0
                }
                className="p-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Page {pagination.currentPage} of {totalPages || 1}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaborTable;
