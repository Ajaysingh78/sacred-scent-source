// src/hooks/useLabors.ts

import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import {
  getAllLaborers,
  createLabor,
  updateLabor,
  deleteLabor,
  updateLaborStatus,
  filterLaborers,
} from '@/services/laborService';
import type {
  Labor,
  LaborFormData,
  LaborFileUploads,
  LaborFilters,
  PaginationState,
  LaborStatus,
  UploadProgress,
} from '@/types/labor';
import { DEFAULT_PAGE_SIZE } from '@/types/labor';

// ─── Hook return type ─────────────────────────────────────────────────────────
export interface UseLaborReturn {
  // Data
  laborers: Labor[];
  filteredLaborers: Labor[];
  paginatedLaborers: Labor[];
  selectedLabor: Labor | null;

  // Loading states
  loading: boolean;
  submitting: boolean;
  uploadProgress: UploadProgress;

  // UI state
  filters: LaborFilters;
  pagination: PaginationState;
  showForm: boolean;
  showDetails: boolean;
  isEditing: boolean;

  // Actions
  setFilters: (f: Partial<LaborFilters>) => void;
  setPagination: (p: Partial<PaginationState>) => void;
  setShowForm: (v: boolean) => void;
  setShowDetails: (v: boolean) => void;
  setSelectedLabor: (l: Labor | null) => void;
  openCreateForm: () => void;
  openEditForm: (labor: Labor) => void;
  openDetails: (labor: Labor) => void;
  handleSubmit: (data: LaborFormData, files: LaborFileUploads) => Promise<void>;
  handleDelete: (labor: Labor) => Promise<void>;
  handleStatusChange: (id: string, status: LaborStatus) => Promise<void>;
  refreshLaborers: () => Promise<void>;
}

// ─── useLabors hook ───────────────────────────────────────────────────────────
export const useLabors = (): UseLaborReturn => {
  const { user } = useAuth();

  // ── Raw data ──
  const [laborers, setLaborers] = useState<Labor[]>([]);
  const [selectedLabor, setSelectedLabor] = useState<Labor | null>(null);

  // ── Loading states ──
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    photo: 0,
    aadhaarFront: 0,
    aadhaarBack: 0,
  });

  // ── UI state ──
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // ── Filters ──
  const [filters, setFiltersState] = useState<LaborFilters>({
    searchQuery: '',
    statusFilter: 'all',
    departmentFilter: 'all',
  });

  // ── Pagination ──
  const [pagination, setPaginationState] = useState<PaginationState>({
    currentPage: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalCount: 0,
  });

  // ── Fetch all laborers ──
  const fetchLaborers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllLaborers();
      setLaborers(data);
    } catch (err) {
      console.error('Failed to fetch laborers:', err);
      toast.error('Failed to load workers. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLaborers();
  }, [fetchLaborers]);

  // ── Filtered laborers (search + status + department) ──
  const filteredLaborers = useMemo(() => {
    let result = filterLaborers(laborers, filters.searchQuery);

    if (filters.statusFilter !== 'all') {
      result = result.filter((l) => l.status === filters.statusFilter);
    }

    if (filters.departmentFilter !== 'all') {
      result = result.filter((l) => l.department === filters.departmentFilter);
    }

    return result;
  }, [laborers, filters]);

  // ── Sync total count and reset page when filters change ──
  useEffect(() => {
    setPaginationState((prev) => ({
      ...prev,
      currentPage: 1,
      totalCount: filteredLaborers.length,
    }));
  }, [filteredLaborers.length]);

  // ── Paginated slice ──
  const paginatedLaborers = useMemo(() => {
    const { currentPage, pageSize } = pagination;
    const start = (currentPage - 1) * pageSize;
    return filteredLaborers.slice(start, start + pageSize);
  }, [filteredLaborers, pagination.currentPage, pagination.pageSize]);

  // ── Partial filter setter ──
  const setFilters = useCallback((partial: Partial<LaborFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  // ── Partial pagination setter ──
  const setPagination = useCallback((partial: Partial<PaginationState>) => {
    setPaginationState((prev) => ({ ...prev, ...partial }));
  }, []);

  // ── Open create form ──
  const openCreateForm = useCallback(() => {
    setSelectedLabor(null);
    setIsEditing(false);
    setShowDetails(false);
    setShowForm(true);
  }, []);

  // ── Open edit form ──
  const openEditForm = useCallback((labor: Labor) => {
    setSelectedLabor(labor);
    setIsEditing(true);
    setShowDetails(false);
    setShowForm(true);
  }, []);

  // ── Open details ──
  const openDetails = useCallback((labor: Labor) => {
    setSelectedLabor(labor);
    setShowForm(false);
    setShowDetails(true);
  }, []);

  // ── Submit (create or update) ──
  const handleSubmit = useCallback(
    async (data: LaborFormData, files: LaborFileUploads) => {
      if (!user) return;

      const progressCbs = {
        onPhotoProgress: (p: number) =>
          setUploadProgress((prev) => ({ ...prev, photo: p })),
        onAadhaarFrontProgress: (p: number) =>
          setUploadProgress((prev) => ({ ...prev, aadhaarFront: p })),
        onAadhaarBackProgress: (p: number) =>
          setUploadProgress((prev) => ({ ...prev, aadhaarBack: p })),
      };

      try {
        setSubmitting(true);
        setUploadProgress({ photo: 0, aadhaarFront: 0, aadhaarBack: 0 });

        if (isEditing && selectedLabor) {
          // UPDATE
          await updateLabor(
            selectedLabor.id,
            data,
            {
              photo: files.photo,
              aadhaarFront: files.aadhaarFront,
              aadhaarBack: files.aadhaarBack,
            },
            selectedLabor.documents,
            progressCbs
          );
          toast.success(`${data.fullName}'s profile updated successfully!`);
        } else {
          // CREATE
          await createLabor(
            data,
            {
              photo: files.photo,
              aadhaarFront: files.aadhaarFront,
              aadhaarBack: files.aadhaarBack,
            },
            user.uid,
            progressCbs
          );
          toast.success(`${data.fullName} registered successfully!`);
        }

        setShowForm(false);
        setSelectedLabor(null);
        await fetchLaborers();
      } catch (err) {
        console.error('Submit failed:', err);
        toast.error('Something went wrong. Please try again.');
      } finally {
        setSubmitting(false);
        setUploadProgress({ photo: 0, aadhaarFront: 0, aadhaarBack: 0 });
      }
    },
    [user, isEditing, selectedLabor, fetchLaborers]
  );

  // ── Delete ──
  const handleDelete = useCallback(
    async (labor: Labor) => {
      try {
        await deleteLabor(labor);
        toast.success(`${labor.fullName} removed successfully.`);
        setShowDetails(false);
        setSelectedLabor(null);
        await fetchLaborers();
      } catch (err) {
        console.error('Delete failed:', err);
        toast.error('Failed to delete. Please try again.');
      }
    },
    [fetchLaborers]
  );

  // ── Status change ──
  const handleStatusChange = useCallback(
    async (id: string, status: LaborStatus) => {
      try {
        await updateLaborStatus(id, status);
        toast.success('Status updated successfully.');
        await fetchLaborers();
      } catch (err) {
        console.error('Status update failed:', err);
        toast.error('Failed to update status.');
      }
    },
    [fetchLaborers]
  );

  return {
    laborers,
    filteredLaborers,
    paginatedLaborers,
    selectedLabor,
    loading,
    submitting,
    uploadProgress,
    filters,
    pagination,
    showForm,
    showDetails,
    isEditing,
    setFilters,
    setPagination,
    setShowForm,
    setShowDetails,
    setSelectedLabor,
    openCreateForm,
    openEditForm,
    openDetails,
    handleSubmit,
    handleDelete,
    handleStatusChange,
    refreshLaborers: fetchLaborers,
  };
};