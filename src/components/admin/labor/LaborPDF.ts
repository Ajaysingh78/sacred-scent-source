// src/components/admin/labor/LaborPDF.ts
// Generates a professional labor registration card PDF using jsPDF

import jsPDF from 'jspdf';
import type { Labor } from '@/types/labor';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (dateStr: string): string => {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d} ${months[parseInt(m) - 1]} ${y}`;
};

const formatCurrency = (amount: number): string =>
  `INR ${new Intl.NumberFormat('en-IN').format(amount)}`;

// Convert image URL to base64 (for embedding in PDF)
const urlToBase64 = async (url: string): Promise<string | null> => {
  if (!url) return null;
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

// ─── Main PDF Generator ───────────────────────────────────────────────────────
export const generateLaborPDF = async (labor: Labor): Promise<void> => {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageW = 210;
  const pageH = 297;
  const margin = 15;
  const contentW = pageW - margin * 2;

  // ── Colors ──
  const orange = [234, 88, 12] as [number, number, number];
  const amber  = [217, 119, 6] as [number, number, number];
  const gray   = [75, 85, 99] as [number, number, number];
  const dark   = [17, 24, 39] as [number, number, number];
  const light  = [249, 250, 251] as [number, number, number];
  const white  = [255, 255, 255] as [number, number, number];
  const border = [229, 231, 235] as [number, number, number];

  let y = 0;

  // ── Header Band ──
  pdf.setFillColor(...orange);
  pdf.rect(0, 0, pageW, 40, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(...white);
  pdf.text('NAMAMI ENTERPRISES', margin, 16);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(255, 200, 150);
  pdf.text('Premium Agarbatti Manufacturer - Indore, Madhya Pradesh', margin, 23);
  pdf.text('ISO Certified Since 2020 - Contact: +91 7067449775', margin, 29);

  // Badge
  pdf.setFillColor(...amber);
  pdf.roundedRect(pageW - margin - 55, 8, 55, 14, 3, 3, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(...white);
  pdf.text('WORKER REGISTRATION', pageW - margin - 27.5, 14.5, { align: 'center' });
  pdf.text('CARD', pageW - margin - 27.5, 19.5, { align: 'center' });

  y = 48;

  // ── Worker Photo ──
  const photoSize = 30;
  const photoX = pageW - margin - photoSize;

  const photoBase64 = await urlToBase64(labor.documents?.photoURL);

  if (photoBase64) {
    pdf.setDrawColor(...border);
    pdf.setLineWidth(0.5);
    pdf.rect(photoX - 1, y - 1, photoSize + 2, photoSize + 2);
    pdf.addImage(photoBase64, 'JPEG', photoX, y, photoSize, photoSize);
  } else {
    pdf.setFillColor(...light);
    pdf.setDrawColor(...border);
    pdf.rect(photoX, y, photoSize, photoSize, 'FD');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(...gray);
    pdf.text('No Photo', photoX + photoSize / 2, y + photoSize / 2 + 2, { align: 'center' });
  }

  // Name block
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(...dark);
  pdf.text(labor.fullName.toUpperCase(), margin, y + 8);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(...gray);
  pdf.text(`S/O ${labor.fatherName}`, margin, y + 14);

  pdf.setFontSize(8.5);
  pdf.setTextColor(...orange);
  pdf.text(`${labor.department}  |  Joined ${formatDate(labor.joiningDate)}`, margin, y + 20);

  // Status pill
  const statusColor: [number, number, number] =
    labor.status === 'active'     ? [22, 163, 74]  :
    labor.status === 'inactive'   ? [202, 138, 4]  : [220, 38, 38];
  pdf.setFillColor(...statusColor);
  pdf.roundedRect(margin, y + 24, 25, 7, 2, 2, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7);
  pdf.setTextColor(...white);
  pdf.text(labor.status.toUpperCase(), margin + 12.5, y + 29, { align: 'center' });

  y += photoSize + 10;

  // Divider
  pdf.setDrawColor(...orange);
  pdf.setLineWidth(0.8);
  pdf.line(margin, y, pageW - margin, y);
  y += 6;

  // ── Section Header — NO special unicode chars ──
  const sectionHeader = (title: string) => {
    pdf.setFillColor(...light);
    pdf.rect(margin, y, contentW, 8, 'F');
    pdf.setDrawColor(...orange);
    pdf.setLineWidth(0.3);
    pdf.rect(margin, y, contentW, 8, 'S');

    // Left accent bar
    pdf.setFillColor(...orange);
    pdf.rect(margin, y, 3, 8, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(...orange);
    // Only plain ASCII text — no icons
    pdf.text(title, margin + 7, y + 5.5);
    y += 12;
  };

  const fieldRow = (label: string, value: string, x: number, colW: number): number => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(...gray);
    pdf.text(label, x, y);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(...dark);
    // Replace em dash with plain dash for safety
    const safeValue = (value || '-').replace(/—/g, '-');
    const lines = pdf.splitTextToSize(safeValue, colW - 2);
    pdf.text(lines, x, y + 5);
    return y + 5 + (lines.length - 1) * 4 + 6;
  };

  const twoColRow = (
    l1: string, v1: string,
    l2: string, v2: string
  ) => {
    const halfW = contentW / 2 - 4;
    const y1 = fieldRow(l1, v1, margin, halfW);
    const y2 = l2 ? fieldRow(l2, v2, margin + contentW / 2, halfW) : y;
    y = Math.max(y1, y2);
  };

  // ── Personal Information ──
  sectionHeader('PERSONAL INFORMATION');
  twoColRow('Full Name', labor.fullName, "Father's Name", labor.fatherName);
  twoColRow('Date of Birth', formatDate(labor.dateOfBirth), 'Blood Group', labor.bloodGroup);
  twoColRow('Aadhaar Number', labor.aadhaarNumber, 'Mobile Number', labor.mobileNumber);
  if (labor.alternateMobile) {
    twoColRow('Alternate Mobile', labor.alternateMobile, '', '');
  }

  // ── Address ──
  sectionHeader('ADDRESS');
  y = fieldRow('Address', labor.address, margin, contentW);
  twoColRow('City', labor.city, 'State', labor.state);
  twoColRow('Pincode', labor.pincode, '', '');

  // ── Work Information ──
  sectionHeader('WORK INFORMATION');
  twoColRow('Department', labor.department, 'Joining Date', formatDate(labor.joiningDate));
  twoColRow(
    'Experience', labor.experience || 'Not specified',
    'Monthly Salary', labor.salary ? formatCurrency(labor.salary) : '-'
  );

  // ── Emergency Contact ──
  sectionHeader('EMERGENCY CONTACT');
  twoColRow('Contact Name', labor.emergencyContactName, 'Contact Number', labor.emergencyContactNumber);

  // ── Notes ──
  if (labor.notes) {
    sectionHeader('NOTES / REMARKS');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(...dark);
    const lines = pdf.splitTextToSize(labor.notes, contentW - 4);
    pdf.text(lines, margin + 2, y);
    y += lines.length * 5 + 4;
  }

  // ── Signature Section ──
  y = Math.max(y + 6, pageH - 65);

  pdf.setDrawColor(...border);
  pdf.setLineWidth(0.3);
  pdf.line(margin, y, pageW - margin, y);
  y += 8;

  const sigW = (contentW - 20) / 3;

  const signatureBox = (title: string, x: number) => {
    pdf.setDrawColor(...border);
    pdf.rect(x, y, sigW, 20, 'S');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(...gray);
    pdf.text(title, x + sigW / 2, y + 24, { align: 'center' });
  };

  signatureBox('Worker Signature', margin);
  signatureBox('Supervisor Signature', margin + sigW + 10);
  signatureBox('Admin / HR Signature', margin + (sigW + 10) * 2);

  // ── Footer ──
  pdf.setFillColor(...orange);
  pdf.rect(0, pageH - 14, pageW, 14, 'F');
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(...white);
  const footerText =
    `Generated on ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}` +
    `  |  Record ID: ${labor.id}  |  Namami Enterprises Admin Panel`;
  pdf.text(footerText, pageW / 2, pageH - 7, { align: 'center' });

  // ── Page border ──
  pdf.setDrawColor(...orange);
  pdf.setLineWidth(1);
  pdf.rect(3, 3, pageW - 6, pageH - 6, 'S');

  // ── Save ──
  const fileName = `${labor.fullName.replace(/\s+/g, '_')}_Registration_${labor.id.slice(0, 6)}.pdf`;
  pdf.save(fileName);
};