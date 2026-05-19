// ══════════════════════════════════════════════════════════════════════
// attendanceService.js — College ERP Frontend
// API calls for the Attendance module.
// ══════════════════════════════════════════════════════════════════════

import apiClient from './apiClient'

const BASE = '/attendance'

export const getAttendance = (params) => apiClient.get(BASE, { params })
export const markAttendance = (data) => apiClient.post(BASE, data)
export const getStudentAttendance = (studentId) => apiClient.get(`${BASE}/student/${studentId}`)
