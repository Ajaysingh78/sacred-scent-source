// src/pages/LaborManagement.tsx

import { toast } from 'sonner';
import { useLabors } from '@/hooks/useLabors';
import LaborTable from '@/components/admin/labor/LaborTable';
import LaborForm from '@/components/admin/labor/LaborForm';
import LaborDetails from '@/components/admin/labor/LaborDetails';
import { generateLaborPDF } from '@/components/admin/labor/LaborPDF';
import type { Labor } from '@/types/labor';

// ─── Stats Card ───────────────────────────────────────────────────────────────
interface StatsCardProps {
  emoji: string;
  label: string;
  value: number;
  subLabel?: string;
  color: string;
}

const StatsCard = ({ emoji, label, value, subLabel, color }: StatsCardProps) => (
  <div className={`bg-white rounded-xl border p-5 hover:shadow-md transition-shadow ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        {subLabel && <p className="text-xs text-gray-500 mt-1">{subLabel}</p>}
      </div>
      <div className="text-3xl">{emoji}</div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const LaborManagement = () => {
  const {
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
    openCreateForm,
    openEditForm,
    openDetails,
    handleSubmit,
    handleDelete,
    handleStatusChange,
  } = useLabors();

  // Compute stats from raw laborers list
  const stats = {
    total: laborers.length,
    active: laborers.filter((l) => l.status === 'active').length,
    inactive: laborers.filter((l) => l.status === 'inactive').length,
    terminated: laborers.filter((l) => l.status === 'terminated').length,
  };

  // Handle PDF download
  const handleDownloadPDF = async (labor: Labor) => {
    try {
      toast.loading('Generating PDF...', { id: 'pdf' });
      await generateLaborPDF(labor);
      toast.success('PDF downloaded!', { id: 'pdf' });
    } catch (err) {
      console.error('PDF error:', err);
      toast.error('Failed to generate PDF. Please try again.', { id: 'pdf' });
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Stats Row ── */}
      {!loading && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            emoji="👷"
            label="Total Workers"
            value={stats.total}
            subLabel="All registered"
            color="border-gray-200"
          />
          <StatsCard
            emoji="✅"
            label="Active"
            value={stats.active}
            subLabel="Currently working"
            color="border-green-200"
          />
          <StatsCard
            emoji="⏸️"
            label="Inactive"
            value={stats.inactive}
            subLabel="On leave / paused"
            color="border-yellow-200"
          />
          <StatsCard
            emoji="❌"
            label="Terminated"
            value={stats.terminated}
            subLabel="Left the company"
            color="border-red-200"
          />
        </div>
      )}

      {/* ── Labor Table ── */}
      <LaborTable
        laborers={laborers}
        filteredLaborers={filteredLaborers}
        paginatedLaborers={paginatedLaborers}
        loading={loading}
        filters={filters}
        pagination={pagination}
        onFilterChange={setFilters}
        onPaginationChange={setPagination}
        onView={openDetails}
        onEdit={openEditForm}
        onDelete={handleDelete}
        onAddNew={openCreateForm}
      />

      {/* ── Labor Form (slide-in panel) ── */}
      {showForm && (
        <LaborForm
          isEditing={isEditing}
          existingLabor={selectedLabor}
          submitting={submitting}
          uploadProgress={uploadProgress}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* ── Labor Details (slide-in panel) ── */}
      {showDetails && selectedLabor && (
        <LaborDetails
          labor={selectedLabor}
          onClose={() => setShowDetails(false)}
          onEdit={(labor) => {
            setShowDetails(false);
            openEditForm(labor);
          }}
          onDelete={async (labor) => {
            await handleDelete(labor);
            setShowDetails(false);
          }}
          onStatusChange={handleStatusChange}
          onDownloadPDF={handleDownloadPDF}
        />
      )}
    </div>
  );
};

export default LaborManagement;