// ══════════════════════════════════════════════════════════════════════
// feeService.js — College ERP Frontend
// API calls for the Fee Management module.
// ══════════════════════════════════════════════════════════════════════

import apiClient from './apiClient'

export const getFees = (params) => apiClient.get('/fees', { params })
export const createFee = (data) => apiClient.post('/fees', data)
export const updateFee = (id, data) => apiClient.put(`/fees/${id}`, data)

export const createPayment = (data) => apiClient.post('/payments', data)
export const getStudentPayments = (studentId) => apiClient.get(`/payments/${studentId}`)
