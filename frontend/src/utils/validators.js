// ══════════════════════════════════════════════════════════════════════
// validators.js — College ERP Frontend
// Reusable form validation rules (used with React Hook Form).
// ══════════════════════════════════════════════════════════════════════

export const emailRules = {
  required: 'Email is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Enter a valid email address',
  },
}

export const passwordRules = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters',
  },
}

export const requiredField = (label) => ({
  required: `${label} is required`,
})

export const phoneRules = {
  required: 'Phone number is required',
  pattern: {
    value: /^[0-9]{10,15}$/,
    message: 'Enter a valid phone number (10–15 digits)',
  },
}

export const positiveNumberRules = (label) => ({
  required: `${label} is required`,
  min: {
    value: 0,
    message: `${label} must be a positive number`,
  },
})
