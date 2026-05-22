// src/types/labor.ts

import { Timestamp } from 'firebase/firestore';

// ─── Blood Group Options ───────────────────────────────────────────────────────
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'Unknown';

// ─── Labor Status ──────────────────────────────────────────────────────────────
export type LaborStatus = 'active' | 'inactive' | 'terminated';

// ─── Department Options ────────────────────────────────────────────────────────
export type Department =
  | 'Production'
  | 'Packing'
  | 'Quality Control'
  | 'Dispatch'
  | 'Maintenance'
  | 'Security'
  | 'Cleaning'
  | 'Administration'
  | 'Other';

// ─── Uploaded Document URLs ────────────────────────────────────────────────────
export interface LaborDocuments {
  photoURL: string;
  aadhaarFrontURL: string;
  aadhaarBackURL: string;
}

// ─── Core Labor Data (stored in Firestore) ─────────────────────────────────────
export interface Labor {
  id: string; // Firestore document ID

  // Personal Info
  fullName: string;
  fatherName: string;
  dateOfBirth: string; // ISO string "YYYY-MM-DD"
  mobileNumber: string;
  alternateMobile: string;
  aadhaarNumber: string; // 12-digit, stored as string
  bloodGroup: BloodGroup;

  // Address
  address: string;
  city: string;
  state: string;
  pincode: string;

  // Work Info
  department: Department;
  joiningDate: string; // ISO string "YYYY-MM-DD"
  experience: string; // e.g. "2 years 3 months"
  salary: number; // in INR

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactNumber: string;

  // Notes
  notes: string;

  // Documents
  documents: LaborDocuments;

  // Meta
  status: LaborStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string; // UID of admin who registered
}

// ─── Form Data (used in React Hook Form — no Timestamps, no id) ───────────────
export interface LaborFormData {
  fullName: string;
  fatherName: string;
  dateOfBirth: string;
  mobileNumber: string;
  alternateMobile: string;
  aadhaarNumber: string;
  bloodGroup: BloodGroup;
  address: string;
  city: string;
  state: string;
  pincode: string;
  department: Department;
  joiningDate: string;
  experience: string;
  salary: number | string; // string during input, number on submit
  emergencyContactName: string;
  emergencyContactNumber: string;
  notes: string;
  // File inputs handled separately (not part of RHF schema)
}

// ─── File uploads state ────────────────────────────────────────────────────────
export interface LaborFileUploads {
  photo: File | null;
  aadhaarFront: File | null;
  aadhaarBack: File | null;
}

// ─── Upload progress ───────────────────────────────────────────────────────────
export interface UploadProgress {
  photo: number;       // 0–100
  aadhaarFront: number;
  aadhaarBack: number;
}

// ─── Filter/Search state for LaborTable ───────────────────────────────────────
export interface LaborFilters {
  searchQuery: string;
  statusFilter: LaborStatus | 'all';
  departmentFilter: Department | 'all';
}

// ─── Pagination state ─────────────────────────────────────────────────────────
export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

// ─── Firestore payload (what we write to Firestore, minus id) ─────────────────
export type LaborFirestorePayload = Omit<Labor, 'id'>;

// ─── Constants ────────────────────────────────────────────────────────────────
export const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

export const DEPARTMENTS: Department[] = [
  'Production',
  'Packing',
  'Quality Control',
  'Dispatch',
  'Maintenance',
  'Security',
  'Cleaning',
  'Administration',
  'Other',
];

export const LABOR_STATUSES: { value: LaborStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'terminated', label: 'Terminated' },
];

export const MAX_FILE_SIZE_MB = 2; // 2 MB max per file
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
export const DEFAULT_PAGE_SIZE = 10;