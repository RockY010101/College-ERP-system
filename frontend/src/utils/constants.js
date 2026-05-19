// ══════════════════════════════════════════════════════════════════════
// constants.js — College ERP Frontend
// Application-wide constants.
// ══════════════════════════════════════════════════════════════════════

export const APP_NAME = 'College ERP'
export const APP_VERSION = '1.0.0'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// ─── User Roles ───────────────────────────────────────────────────────
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  FACULTY: 'FACULTY',
  ACCOUNTANT: 'ACCOUNTANT',
  STUDENT: 'STUDENT',
}

// ─── Attendance Status ────────────────────────────────────────────────
export const ATTENDANCE_STATUS = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
}

// ─── Fee Status ───────────────────────────────────────────────────────
export const FEE_STATUS = {
  PAID: 'PAID',
  UNPAID: 'UNPAID',
  PARTIAL: 'PARTIAL',
  OVERDUE: 'OVERDUE',
}

// ─── Payment Status ───────────────────────────────────────────────────
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
}

// ─── Document Types ───────────────────────────────────────────────────
export const DOCUMENT_TYPES = {
  PROFILE_IMAGE: 'PROFILE_IMAGE',
  TRANSCRIPT: 'TRANSCRIPT',
  CERTIFICATE: 'CERTIFICATE',
  RECEIPT: 'RECEIPT',
  ID_CARD: 'ID_CARD',
}

// ─── Notification Types ───────────────────────────────────────────────
export const NOTIFICATION_TYPES = {
  FEE_REMINDER: 'FEE_REMINDER',
  ATTENDANCE_ALERT: 'ATTENDANCE_ALERT',
  RESULT_PUBLISHED: 'RESULT_PUBLISHED',
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  ACCOUNT: 'ACCOUNT',
}

// ─── Exam Types ───────────────────────────────────────────────────────
export const EXAM_TYPES = {
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL',
  PRACTICAL: 'PRACTICAL',
}

// ─── Pagination ───────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10
