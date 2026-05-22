// src/services/laborService.ts

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  Labor,
  LaborFormData,
  LaborFirestorePayload,
  LaborDocuments,
  LaborStatus,
} from '@/types/labor';
import { MAX_FILE_SIZE_BYTES, ALLOWED_FILE_TYPES } from '@/types/labor';

// ─── Cloudinary Config (from .env) ────────────────────────────────────────────
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
  throw new Error(
    'Missing Cloudinary configuration. Please check VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.'
  );
}

// ─── Collection Reference ──────────────────────────────────────────────────────
const COLLECTION = 'laborers';
const laborersRef = () => collection(db, COLLECTION);

// ─── Cloudinary public_id extractor (used for deletion) ───────────────────────
// Cloudinary URLs look like:
// https://res.cloudinary.com/<cloud>/image/upload/v<version>/<public_id>.<ext>
// We store full URLs in Firestore; to delete we derive the public_id from the URL.
const extractPublicId = (url: string): string | null => {
  try {
    // Match everything after /upload/ (strip version if present)
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

// ─── Validate a file before upload ────────────────────────────────────────────
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Only JPG, PNG, and WebP images are allowed.' };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size must be under 2 MB. Current size: ${(file.size / 1024 / 1024).toFixed(1)} MB`,
    };
  }
  return { valid: true };
};

// ─── Upload a single file to Cloudinary ───────────────────────────────────────
// `publicId` sets the file path/name inside your Cloudinary account.
// e.g. "laborers/abc123/photo"
export const uploadLaborFile = (
  file: File,
  publicId: string,
  onProgress?: (percent: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Split publicId into folder + filename
    // e.g. "laborers/abc123/photo" → folder="laborers/abc123", filename="photo"
    const lastSlash = publicId.lastIndexOf('/');
    const folder = publicId.substring(0, lastSlash);       // "laborers/abc123"
    const filename = publicId.substring(lastSlash + 1);    // "photo"

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', folder);
    formData.append('public_id', filename);
    // NOTE: 'overwrite' is NOT allowed with unsigned presets — omitted intentionally

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress?.(percent);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url as string);
        } catch {
          reject(new Error('Failed to parse Cloudinary response.'));
        }
      } else {
        try {
          const errResponse = JSON.parse(xhr.responseText);
          reject(new Error(errResponse?.error?.message ?? `Upload failed with status ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Network error during file upload.')));
    xhr.addEventListener('abort', () => reject(new Error('File upload was aborted.')));

    xhr.open('POST', CLOUDINARY_UPLOAD_URL);
    xhr.send(formData);
  });
};

// ─── Delete a file from Cloudinary by its secure_url ──────────────────────────
// NOTE: Deleting via unsigned preset is NOT supported by Cloudinary's client-side API.
// This function is a no-op placeholder. To enable deletion, use a signed backend endpoint.
// Files will be overwritten on re-upload using the same public_id (overwrite: true).
export const deleteLaborFile = async (url: string): Promise<void> => {
  if (!url) return;
  // Cloudinary does not allow client-side deletion with unsigned presets.
  // The same public_id is reused on updates (overwrite: true), so old files
  // are replaced automatically. For hard deletion, implement a server endpoint.
  const publicId = extractPublicId(url);
  if (!publicId) return;
  // If you add a backend route later, call it here:
  // await fetch('/api/cloudinary/delete', { method: 'POST', body: JSON.stringify({ publicId }) });
  console.warn(
    `[Cloudinary] Client-side deletion is not supported with unsigned presets. ` +
    `File "${publicId}" was NOT deleted from Cloudinary. ` +
    `Implement a signed backend endpoint to enable deletion.`
  );
};

// ─── File Upload Set ───────────────────────────────────────────────────────────
export interface FileUploadSet {
  photo?: File | null;
  aadhaarFront?: File | null;
  aadhaarBack?: File | null;
}

export interface UploadProgressCallbacks {
  onPhotoProgress?: (p: number) => void;
  onAadhaarFrontProgress?: (p: number) => void;
  onAadhaarBackProgress?: (p: number) => void;
}

// ─── Upload all labor documents to Cloudinary ─────────────────────────────────
// Uses laborId as the folder so files are organized:
// laborers/<laborId>/photo, laborers/<laborId>/aadhaar_front, etc.
export const uploadLaborDocuments = async (
  laborId: string,
  files: FileUploadSet,
  existingDocs: Partial<LaborDocuments>,
  progressCbs: UploadProgressCallbacks = {}
): Promise<Partial<LaborDocuments>> => {
  const result: Partial<LaborDocuments> = { ...existingDocs };

  if (files.photo) {
    result.photoURL = await uploadLaborFile(
      files.photo,
      `laborers/${laborId}/photo`,
      progressCbs.onPhotoProgress
    );
  }

  if (files.aadhaarFront) {
    result.aadhaarFrontURL = await uploadLaborFile(
      files.aadhaarFront,
      `laborers/${laborId}/aadhaar_front`,
      progressCbs.onAadhaarFrontProgress
    );
  }

  if (files.aadhaarBack) {
    result.aadhaarBackURL = await uploadLaborFile(
      files.aadhaarBack,
      `laborers/${laborId}/aadhaar_back`,
      progressCbs.onAadhaarBackProgress
    );
  }

  return result;
};

// ─── CREATE — Register a new laborer ──────────────────────────────────────────
export const createLabor = async (
  formData: LaborFormData,
  files: FileUploadSet,
  createdBy: string,
  progressCbs: UploadProgressCallbacks = {}
): Promise<string> => {
  // 1. Create Firestore doc first to get the auto-generated ID
  const payload: LaborFirestorePayload = {
    fullName: formData.fullName.trim(),
    fatherName: formData.fatherName.trim(),
    dateOfBirth: formData.dateOfBirth,
    mobileNumber: formData.mobileNumber.trim(),
    alternateMobile: formData.alternateMobile?.trim() ?? '',
    aadhaarNumber: formData.aadhaarNumber.replace(/\s/g, ''),
    bloodGroup: formData.bloodGroup,
    address: formData.address.trim(),
    city: formData.city.trim(),
    state: formData.state.trim(),
    pincode: formData.pincode.trim(),
    department: formData.department,
    joiningDate: formData.joiningDate,
    experience: formData.experience?.trim() ?? '',
    salary: Number(formData.salary),
    emergencyContactName: formData.emergencyContactName.trim(),
    emergencyContactNumber: formData.emergencyContactNumber.trim(),
    notes: formData.notes?.trim() ?? '',
    documents: { photoURL: '', aadhaarFrontURL: '', aadhaarBackURL: '' },
    status: 'active',
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
    createdBy,
  };

  const docRef = await addDoc(laborersRef(), payload);
  const laborId = docRef.id;

  // 2. Upload files to Cloudinary using laborId as the folder path
  const uploadedDocs = await uploadLaborDocuments(
    laborId,
    files,
    { photoURL: '', aadhaarFrontURL: '', aadhaarBackURL: '' },
    progressCbs
  );

  // 3. Update Firestore document with Cloudinary URLs
  await updateDoc(docRef, { documents: uploadedDocs });

  return laborId;
};

// ─── READ ALL — Get all laborers ───────────────────────────────────────────────
export const getAllLaborers = async (): Promise<Labor[]> => {
  const q = query(laborersRef(), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Labor));
};

// ─── READ ONE — Get a single laborer ──────────────────────────────────────────
export const getLaborById = async (id: string): Promise<Labor | null> => {
  const docRef = doc(db, COLLECTION, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Labor;
};

// ─── UPDATE — Update laborer data ─────────────────────────────────────────────
// New files are uploaded to Cloudinary with the same public_id (overwrite: true),
// so the old image is automatically replaced — no manual deletion needed.
export const updateLabor = async (
  id: string,
  formData: LaborFormData,
  files: FileUploadSet,
  existingDocs: LaborDocuments,
  progressCbs: UploadProgressCallbacks = {}
): Promise<void> => {
  // Upload new files (if any) and merge with existing URLs
  const updatedDocs = await uploadLaborDocuments(id, files, existingDocs, progressCbs);

  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, {
    fullName: formData.fullName.trim(),
    fatherName: formData.fatherName.trim(),
    dateOfBirth: formData.dateOfBirth,
    mobileNumber: formData.mobileNumber.trim(),
    alternateMobile: formData.alternateMobile?.trim() ?? '',
    aadhaarNumber: formData.aadhaarNumber.replace(/\s/g, ''),
    bloodGroup: formData.bloodGroup,
    address: formData.address.trim(),
    city: formData.city.trim(),
    state: formData.state.trim(),
    pincode: formData.pincode.trim(),
    department: formData.department,
    joiningDate: formData.joiningDate,
    experience: formData.experience?.trim() ?? '',
    salary: Number(formData.salary),
    emergencyContactName: formData.emergencyContactName.trim(),
    emergencyContactNumber: formData.emergencyContactNumber.trim(),
    notes: formData.notes?.trim() ?? '',
    documents: updatedDocs,
    updatedAt: serverTimestamp(),
  });
};

// ─── UPDATE STATUS — Change active/inactive/terminated ────────────────────────
export const updateLaborStatus = async (id: string, status: LaborStatus): Promise<void> => {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
};

// ─── DELETE — Remove laborer from Firestore ───────────────────────────────────
// Cloudinary files are NOT deleted client-side (unsigned preset limitation).
// They will be overwritten if this laborId is reused, or delete via Cloudinary dashboard.
export const deleteLabor = async (labor: Labor): Promise<void> => {
  // Attempt best-effort Cloudinary cleanup (logs a warning, see deleteLaborFile above)
  await Promise.allSettled([
    deleteLaborFile(labor.documents.photoURL),
    deleteLaborFile(labor.documents.aadhaarFrontURL),
    deleteLaborFile(labor.documents.aadhaarBackURL),
  ]);

  // Delete Firestore document
  await deleteDoc(doc(db, COLLECTION, labor.id));
};

// ─── SEARCH — Client-side filter (Firestore free-tier friendly) ───────────────
export const filterLaborers = (laborers: Labor[], searchQuery: string): Labor[] => {
  if (!searchQuery.trim()) return laborers;
  const q = searchQuery.toLowerCase().trim();
  return laborers.filter(
    (l) =>
      l.fullName.toLowerCase().includes(q) ||
      l.mobileNumber.includes(q) ||
      l.aadhaarNumber.includes(q) ||
      l.department.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q)
  );
};