// ══════════════════════════════════════════════════════════════════════
// reportService.js — College ERP Frontend
// API calls for the Reporting module.
// ══════════════════════════════════════════════════════════════════════

import apiClient from './apiClient'

export const getAdminReport = () => apiClient.get('/reports/admin')
export const getFinanceReport = () => apiClient.get('/reports/finance')
export const getFacultyReport = () => apiClient.get('/reports/faculty')
export const getStudentReport = () => apiClient.get('/reports/student')
