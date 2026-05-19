// ══════════════════════════════════════════════════════════════════════
// studentService.js — College ERP Frontend
// API calls for the Student Management module.
// ══════════════════════════════════════════════════════════════════════

import apiClient from './apiClient'

const BASE = '/students'

export const getStudents = (params) => apiClient.get(BASE, { params })
export const getStudentById = (id) => apiClient.get(`${BASE}/${id}`)
export const createStudent = (data) => apiClient.post(BASE, data)
export const updateStudent = (id, data) => apiClient.put(`${BASE}/${id}`, data)
export const deleteStudent = (id) => apiClient.delete(`${BASE}/${id}`)
