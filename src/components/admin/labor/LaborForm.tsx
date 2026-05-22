// src/components/admin/labor/LaborForm.tsx

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, User, AlertCircle, Loader2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { validateFile } from '@/services/laborService';
import type {
  Labor,
  LaborFormData,
  LaborFileUploads,
  UploadProgress,
} from '@/types/labor';
import {
  BLOOD_GROUPS,
  DEPARTMENTS,
  MAX_FILE_SIZE_MB,
} from '@/types/labor';

// ─── Zod Schema ───────────────────────────────────────────────────────────────
const laborSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(60, 'Full name too long')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  fatherName: z
    .string()
    .min(2, "Father's name must be at least 2 characters")
    .max(60, "Father's name too long"),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  alternateMobile: z
    .string()
    .regex(/^([6-9]\d{9})?$/, 'Enter a valid 10-digit mobile number or leave empty')
    .optional()
    .or(z.literal('')),
  aadhaarNumber: z
    .string()
    .regex(/^\d{12}$/, 'Aadhaar number must be exactly 12 digits'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']),
  address: z.string().min(5, 'Address must be at least 5 characters').max(200),
  city: z.string().min(2, 'City is required').max(50),
  state: z.string().min(2, 'State is required').max(50),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  department: z.enum([
    'Production', 'Packing', 'Quality Control', 'Dispatch',
    'Maintenance', 'Security', 'Cleaning', 'Administration', 'Other',
  ]),
  joiningDate: z.string().min(1, 'Joining date is required'),
  experience: z.string().max(50).optional().or(z.literal('')),
  salary: z
    .union([z.string(), z.number()])
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, {
      message: 'Enter a valid salary amount',
    }),
  emergencyContactName: z
    .string()
    .min(2, 'Emergency contact name is required')
    .max(60),
  emergencyContactNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  notes: z.string().max(500, 'Notes too long').optional().or(z.literal('')),
});

// ─── Props ────────────────────────────────────────────────────────────────────
interface LaborFormProps {
  isEditing: boolean;
  existingLabor: Labor | null;
  submitting: boolean;
  uploadProgress: UploadProgress;
  onSubmit: (data: LaborFormData, files: LaborFileUploads) => Promise<void>;
  onCancel: () => void;
}

// ─── FileUploadField ──────────────────────────────────────────────────────────
interface FileUploadFieldProps {
  label: string;
  required?: boolean;
  file: File | null;
  existingUrl?: string;
  progress: number;
  uploading: boolean;
  onChange: (file: File | null) => void;
  accept?: string;
}

const FileUploadField = ({
  label,
  required,
  file,
  existingUrl,
  progress,
  uploading,
  onChange,
  accept = 'image/jpeg,image/png,image/webp',
}: FileUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = file ? URL.createObjectURL(file) : existingUrl ?? null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const { valid, error } = validateFile(selected);
    if (!valid) {
      toast.error(error);
      return;
    }
    onChange(selected);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        <span className="text-xs text-gray-400 ml-1">(Max {MAX_FILE_SIZE_MB}MB, JPG/PNG)</span>
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />

        {previewUrl ? (
          <div className="flex items-center gap-3">
            <img
              src={previewUrl}
              alt={label}
              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-medium truncate">
                {file ? file.name : 'Current file'}
              </p>
              <p className="text-xs text-gray-500">Click to change</p>
              {uploading && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-orange-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-orange-600 mt-1">{progress}% uploaded</p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
                if (inputRef.current) inputRef.current.value = '';
              }}
              className="p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center py-2">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-orange-500 transition-colors" />
            <p className="text-sm text-gray-500 group-hover:text-orange-600">
              Click to upload
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── FormField helper ─────────────────────────────────────────────────────────
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

const FormField = ({ label, required, error, children }: FormFieldProps) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-xs text-red-600 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
);

// ─── Input class helpers ──────────────────────────────────────────────────────
const inputClass = (hasError?: boolean) =>
  `w-full px-3 py-2.5 rounded-lg border text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
  }`;

const selectClass = (hasError?: boolean) =>
  `w-full px-3 py-2.5 rounded-lg border text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer ${
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
  }`;

// ─── Section heading ──────────────────────────────────────────────────────────
const SectionHeading = ({ title, icon }: { title: string; icon: string }) => (
  <div className="flex items-center gap-2 pb-2 border-b border-gray-200 mb-4">
    <span className="text-lg">{icon}</span>
    <h3 className="text-base font-semibold text-gray-800">{title}</h3>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const LaborForm = ({
  isEditing,
  existingLabor,
  submitting,
  uploadProgress,
  onSubmit,
  onCancel,
}: LaborFormProps) => {
  const [files, setFiles] = useState<LaborFileUploads>({
    photo: null,
    aadhaarFront: null,
    aadhaarBack: null,
  });
  const [photoRequired, setPhotoRequired] = useState(!isEditing);

  const {
    register,
    handleSubmit: rhfSubmit,
    formState: { errors },
    reset,
  } = useForm<LaborFormData>({
    resolver: zodResolver(laborSchema),
    defaultValues: {
      fullName: '',
      fatherName: '',
      dateOfBirth: '',
      mobileNumber: '',
      alternateMobile: '',
      aadhaarNumber: '',
      bloodGroup: 'Unknown',
      address: '',
      city: '',
      state: '',
      pincode: '',
      department: 'Production',
      joiningDate: new Date().toISOString().split('T')[0],
      experience: '',
      salary: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      notes: '',
    },
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditing && existingLabor) {
      reset({
        fullName: existingLabor.fullName,
        fatherName: existingLabor.fatherName,
        dateOfBirth: existingLabor.dateOfBirth,
        mobileNumber: existingLabor.mobileNumber,
        alternateMobile: existingLabor.alternateMobile,
        aadhaarNumber: existingLabor.aadhaarNumber,
        bloodGroup: existingLabor.bloodGroup,
        address: existingLabor.address,
        city: existingLabor.city,
        state: existingLabor.state,
        pincode: existingLabor.pincode,
        department: existingLabor.department,
        joiningDate: existingLabor.joiningDate,
        experience: existingLabor.experience,
        salary: existingLabor.salary,
        emergencyContactName: existingLabor.emergencyContactName,
        emergencyContactNumber: existingLabor.emergencyContactNumber,
        notes: existingLabor.notes,
      });
      setPhotoRequired(false);
    }
  }, [isEditing, existingLabor, reset]);

  const onFormSubmit = async (data: LaborFormData) => {
    if (!isEditing && !files.photo) {
      toast.error('Worker photo is required.');
      return;
    }
    await onSubmit(data, files);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end">
      <div className="h-full w-full max-w-3xl bg-white shadow-2xl overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Edit Worker Profile' : 'Register New Worker'}
              </h2>
              <p className="text-sm text-gray-500">
                {isEditing ? `Editing: ${existingLabor?.fullName}` : 'Fill all required fields'}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={submitting}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={rhfSubmit(onFormSubmit)}
          className="flex-1 p-6 space-y-8"
        >
          {/* ── Personal Information ── */}
          <div>
            <SectionHeading title="Personal Information" icon="👤" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Full Name" required error={errors.fullName?.message}>
                <input
                  {...register('fullName')}
                  className={inputClass(!!errors.fullName)}
                  placeholder="e.g. Raju Kumar"
                />
              </FormField>

              <FormField label="Father's Name" required error={errors.fatherName?.message}>
                <input
                  {...register('fatherName')}
                  className={inputClass(!!errors.fatherName)}
                  placeholder="e.g. Ram Kumar"
                />
              </FormField>

              <FormField label="Date of Birth" required error={errors.dateOfBirth?.message}>
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  className={inputClass(!!errors.dateOfBirth)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </FormField>

              <FormField label="Blood Group" required error={errors.bloodGroup?.message}>
                <select {...register('bloodGroup')} className={selectClass(!!errors.bloodGroup)}>
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Aadhaar Number" required error={errors.aadhaarNumber?.message}>
                <input
                  {...register('aadhaarNumber')}
                  className={inputClass(!!errors.aadhaarNumber)}
                  placeholder="12-digit Aadhaar number"
                  maxLength={12}
                />
              </FormField>
            </div>
          </div>

          {/* ── Contact Information ── */}
          <div>
            <SectionHeading title="Contact Information" icon="📞" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Mobile Number" required error={errors.mobileNumber?.message}>
                <input
                  {...register('mobileNumber')}
                  className={inputClass(!!errors.mobileNumber)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                />
              </FormField>

              <FormField label="Alternate Mobile" error={errors.alternateMobile?.message}>
                <input
                  {...register('alternateMobile')}
                  className={inputClass(!!errors.alternateMobile)}
                  placeholder="Optional"
                  maxLength={10}
                />
              </FormField>
            </div>
          </div>

          {/* ── Address ── */}
          <div>
            <SectionHeading title="Address" icon="📍" />
            <div className="grid grid-cols-1 gap-4">
              <FormField label="Full Address" required error={errors.address?.message}>
                <textarea
                  {...register('address')}
                  className={inputClass(!!errors.address)}
                  rows={2}
                  placeholder="House/Flat no., Street, Area"
                />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="City" required error={errors.city?.message}>
                  <input
                    {...register('city')}
                    className={inputClass(!!errors.city)}
                    placeholder="e.g. Indore"
                  />
                </FormField>

                <FormField label="State" required error={errors.state?.message}>
                  <input
                    {...register('state')}
                    className={inputClass(!!errors.state)}
                    placeholder="e.g. Madhya Pradesh"
                  />
                </FormField>

                <FormField label="Pincode" required error={errors.pincode?.message}>
                  <input
                    {...register('pincode')}
                    className={inputClass(!!errors.pincode)}
                    placeholder="6-digit pincode"
                    maxLength={6}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* ── Work Information ── */}
          <div>
            <SectionHeading title="Work Information" icon="🏭" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Department" required error={errors.department?.message}>
                <select {...register('department')} className={selectClass(!!errors.department)}>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Joining Date" required error={errors.joiningDate?.message}>
                <input
                  type="date"
                  {...register('joiningDate')}
                  className={inputClass(!!errors.joiningDate)}
                />
              </FormField>

              <FormField label="Experience" error={errors.experience?.message}>
                <input
                  {...register('experience')}
                  className={inputClass(!!errors.experience)}
                  placeholder="e.g. 2 years, Fresher"
                />
              </FormField>

              <FormField label="Monthly Salary (₹)" error={errors.salary?.message}>
                <input
                  type="number"
                  {...register('salary')}
                  className={inputClass(!!errors.salary)}
                  placeholder="e.g. 12000"
                  min={0}
                />
              </FormField>
            </div>
          </div>

          {/* ── Emergency Contact ── */}
          <div>
            <SectionHeading title="Emergency Contact" icon="🆘" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Contact Name"
                required
                error={errors.emergencyContactName?.message}
              >
                <input
                  {...register('emergencyContactName')}
                  className={inputClass(!!errors.emergencyContactName)}
                  placeholder="Name of emergency contact"
                />
              </FormField>

              <FormField
                label="Contact Number"
                required
                error={errors.emergencyContactNumber?.message}
              >
                <input
                  {...register('emergencyContactNumber')}
                  className={inputClass(!!errors.emergencyContactNumber)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                />
              </FormField>
            </div>
          </div>

          {/* ── Documents Upload ── */}
          <div>
            <SectionHeading title="Documents & Photo" icon="📄" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FileUploadField
                label="Worker Photo"
                required={!isEditing}
                file={files.photo}
                existingUrl={existingLabor?.documents?.photoURL}
                progress={uploadProgress.photo}
                uploading={submitting && uploadProgress.photo > 0}
                onChange={(f) => setFiles((prev) => ({ ...prev, photo: f }))}
              />

              <FileUploadField
                label="Aadhaar Front"
                file={files.aadhaarFront}
                existingUrl={existingLabor?.documents?.aadhaarFrontURL}
                progress={uploadProgress.aadhaarFront}
                uploading={submitting && uploadProgress.aadhaarFront > 0}
                onChange={(f) => setFiles((prev) => ({ ...prev, aadhaarFront: f }))}
              />

              <FileUploadField
                label="Aadhaar Back"
                file={files.aadhaarBack}
                existingUrl={existingLabor?.documents?.aadhaarBackURL}
                progress={uploadProgress.aadhaarBack}
                uploading={submitting && uploadProgress.aadhaarBack > 0}
                onChange={(f) => setFiles((prev) => ({ ...prev, aadhaarBack: f }))}
              />
            </div>

            {!isEditing && !files.photo && (
              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Worker photo is required for registration
              </p>
            )}
          </div>

          {/* ── Notes ── */}
          <div>
            <SectionHeading title="Additional Notes" icon="📝" />
            <FormField label="Notes / Remarks" error={errors.notes?.message}>
              <textarea
                {...register('notes')}
                className={inputClass(!!errors.notes)}
                rows={3}
                placeholder="Any additional information about the worker..."
              />
            </FormField>
          </div>

          {/* ── Upload Progress ── */}
          {submitting && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-orange-800 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {isEditing ? 'Updating worker profile...' : 'Registering worker...'}
              </p>
              {[
                { label: 'Photo', value: uploadProgress.photo },
                { label: 'Aadhaar Front', value: uploadProgress.aadhaarFront },
                { label: 'Aadhaar Back', value: uploadProgress.aadhaarBack },
              ].map(({ label, value }) =>
                value > 0 ? (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-orange-700 mb-1">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-1.5">
                      <div
                        className="bg-orange-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </form>

        {/* Footer Buttons — sticky */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            form=""
            onClick={rhfSubmit(onFormSubmit)}
            disabled={submitting}
            className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 text-white text-sm font-semibold hover:from-orange-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isEditing ? 'Updating...' : 'Registering...'}
              </>
            ) : (
              <>
                {isEditing ? '✅ Update Worker' : '👷 Register Worker'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaborForm;