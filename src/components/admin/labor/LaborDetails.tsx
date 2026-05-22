// src/components/admin/labor/LaborDetails.tsx

import { X, Edit2, Trash2, Download, Phone, MapPin, Briefcase, User, AlertTriangle, FileText } from 'lucide-react';
import type { Labor, LaborStatus } from '@/types/labor';
import { LABOR_STATUSES } from '@/types/labor';

// ─── Props ────────────────────────────────────────────────────────────────────
interface LaborDetailsProps {
  labor: Labor;
  onClose: () => void;
  onEdit: (labor: Labor) => void;
  onDelete: (labor: Labor) => void;
  onStatusChange: (id: string, status: LaborStatus) => Promise<void>;
  onDownloadPDF: (labor: Labor) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (dateStr: string) => {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d} ${months[parseInt(m) - 1]} ${y}`;
};

const formatTimestamp = (ts: any): string => {
  if (!ts) return '—';
  const date = ts?.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(amount);

// ─── Detail Row ───────────────────────────────────────────────────────────────
const DetailRow = ({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | number;
  mono?: boolean;
}) => (
  <div className="py-2 flex justify-between items-start gap-4 border-b border-gray-100 last:border-0">
    <span className="text-xs font-medium text-gray-500 flex-shrink-0 w-40">{label}</span>
    <span className={`text-sm text-gray-900 text-right ${mono ? 'font-mono' : ''}`}>
      {value || '—'}
    </span>
  </div>
);

// ─── Section Card ─────────────────────────────────────────────────────────────
const SectionCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
      <span className="text-gray-500">{icon}</span>
      <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
    </div>
    <div className="px-4 py-2">{children}</div>
  </div>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: LaborStatus }) => {
  const config: Record<LaborStatus, { label: string; class: string }> = {
    active: { label: '● Active', class: 'bg-green-100 text-green-700 border-green-200' },
    inactive: { label: '● Inactive', class: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    terminated: { label: '● Terminated', class: 'bg-red-100 text-red-700 border-red-200' },
  };
  const { label, class: cls } = config[status] ?? config.active;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      {label}
    </span>
  );
};

// ─── Document Image ───────────────────────────────────────────────────────────
const DocumentImage = ({ url, label }: { url: string; label: string }) => {
  if (!url)
    return (
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 text-center">
        <p className="text-xs text-gray-400">{label} not uploaded</p>
      </div>
    );
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <a href={url} target="_blank" rel="noreferrer">
        <img
          src={url}
          alt={label}
          className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:opacity-90 transition-opacity cursor-pointer"
        />
      </a>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-blue-600 hover:underline"
      >
        Open full size ↗
      </a>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const LaborDetails = ({
  labor,
  onClose,
  onEdit,
  onDelete,
  onStatusChange,
  onDownloadPDF,
}: LaborDetailsProps) => {
  const handleDeleteClick = () => {
    if (
      window.confirm(
        `Are you sure you want to permanently delete ${labor.fullName}? This cannot be undone.`
      )
    ) {
      onDelete(labor);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end">
      <div className="h-full w-full max-w-2xl bg-gray-50 shadow-2xl overflow-y-auto flex flex-col">
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Worker Profile</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Profile Hero ── */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 px-6 py-8">
          <div className="flex items-center gap-5">
            {labor.documents?.photoURL ? (
              <img
                src={labor.documents.photoURL}
                alt={labor.fullName}
                className="w-20 h-20 rounded-full object-cover border-4 border-white/40 shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-white">
                  {labor.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-white truncate">{labor.fullName}</h3>
              <p className="text-white/80 text-sm mt-0.5">S/O {labor.fatherName}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <StatusBadge status={labor.status} />
                <span className="text-white/70 text-xs">
                  {labor.department} · Joined {formatDate(labor.joiningDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Action Bar ── */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onEdit(labor)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-sm font-medium hover:bg-orange-100 transition-colors border border-orange-200"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </button>

          <button
            onClick={() => onDownloadPDF(labor)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-200"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>

          {/* Status change */}
          <select
            value={labor.status}
            onChange={(e) =>
              onStatusChange(labor.id, e.target.value as LaborStatus)
            }
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {LABOR_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleDeleteClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors border border-red-200 ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 p-6 space-y-4">
          {/* Personal Info */}
          <SectionCard icon={<User className="w-4 h-4" />} title="Personal Information">
            <DetailRow label="Full Name" value={labor.fullName} />
            <DetailRow label="Father's Name" value={labor.fatherName} />
            <DetailRow label="Date of Birth" value={formatDate(labor.dateOfBirth)} />
            <DetailRow label="Blood Group" value={labor.bloodGroup} />
            <DetailRow label="Aadhaar Number" value={labor.aadhaarNumber} mono />
          </SectionCard>

          {/* Contact */}
          <SectionCard icon={<Phone className="w-4 h-4" />} title="Contact Information">
            <DetailRow label="Mobile Number" value={labor.mobileNumber} />
            <DetailRow label="Alternate Mobile" value={labor.alternateMobile} />
          </SectionCard>

          {/* Address */}
          <SectionCard icon={<MapPin className="w-4 h-4" />} title="Address">
            <DetailRow label="Address" value={labor.address} />
            <DetailRow label="City" value={labor.city} />
            <DetailRow label="State" value={labor.state} />
            <DetailRow label="Pincode" value={labor.pincode} />
          </SectionCard>

          {/* Work Info */}
          <SectionCard icon={<Briefcase className="w-4 h-4" />} title="Work Information">
            <DetailRow label="Department" value={labor.department} />
            <DetailRow label="Joining Date" value={formatDate(labor.joiningDate)} />
            <DetailRow label="Experience" value={labor.experience || 'Not specified'} />
            <DetailRow label="Monthly Salary" value={labor.salary ? formatCurrency(labor.salary) : '—'} />
          </SectionCard>

          {/* Emergency Contact */}
          <SectionCard icon={<AlertTriangle className="w-4 h-4" />} title="Emergency Contact">
            <DetailRow label="Contact Name" value={labor.emergencyContactName} />
            <DetailRow label="Contact Number" value={labor.emergencyContactNumber} />
          </SectionCard>

          {/* Documents */}
          <SectionCard icon={<FileText className="w-4 h-4" />} title="Documents">
            <div className="grid grid-cols-3 gap-3 py-2">
              <DocumentImage url={labor.documents?.photoURL} label="Worker Photo" />
              <DocumentImage url={labor.documents?.aadhaarFrontURL} label="Aadhaar Front" />
              <DocumentImage url={labor.documents?.aadhaarBackURL} label="Aadhaar Back" />
            </div>
          </SectionCard>

          {/* Notes */}
          {labor.notes && (
            <SectionCard icon={<FileText className="w-4 h-4" />} title="Notes / Remarks">
              <p className="py-2 text-sm text-gray-700 whitespace-pre-wrap">{labor.notes}</p>
            </SectionCard>
          )}

          {/* Meta */}
          <div className="bg-gray-100 rounded-xl px-4 py-3 text-xs text-gray-500 space-y-1">
            <p>Registered: {formatTimestamp(labor.createdAt)}</p>
            <p>Last Updated: {formatTimestamp(labor.updatedAt)}</p>
            <p>Record ID: <span className="font-mono">{labor.id}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaborDetails;