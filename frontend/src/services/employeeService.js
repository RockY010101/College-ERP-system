// ══════════════════════════════════════════════════════════════════════
// employeeService.js — College ERP Frontend
// API calls for the Employee Management module.
// ══════════════════════════════════════════════════════════════════════

import apiClient from './apiClient'

const BASE = '/employees'

export const getEmployees = (params) => apiClient.get(BASE, { params })
export const createEmployee = (data) => apiClient.post(BASE, data)
export const updateEmployee = (id, data) => apiClient.put(`${BASE}/${id}`, data)
export const deleteEmployee = (id) => apiClient.delete(`${BASE}/${id}`)
