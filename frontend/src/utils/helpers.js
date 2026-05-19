// ══════════════════════════════════════════════════════════════════════
// helpers.js — College ERP Frontend
// General-purpose utility functions.
// ══════════════════════════════════════════════════════════════════════

/**
 * Format a date string to a readable format.
 * @param {string} dateStr - ISO date string.
 * @param {string} locale  - BCP 47 locale (default: 'en-IN').
 */
export const formatDate = (dateStr, locale = 'en-IN') => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Format a number as currency (INR by default).
 */
export const formatCurrency = (amount, currency = 'INR') => {
  if (amount == null) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Truncate a string to a max length with ellipsis.
 */
export const truncate = (str, maxLength = 50) => {
  if (!str) return ''
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str
}

/**
 * Capitalize the first letter of a string.
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Get initials from a full name (e.g., "John Doe" → "JD").
 */
export const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Calculate attendance percentage.
 */
export const calcAttendancePercent = (present, total) => {
  if (!total) return 0
  return Math.round((present / total) * 100)
}
