// ══════════════════════════════════════════════════════════════════════
// apiClient.js — College ERP Frontend
// Axios instance with base URL and Firebase token injection.
// ══════════════════════════════════════════════════════════════════════

import axios from 'axios'
import { auth } from '../firebase/firebaseConfig'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Request Interceptor ──────────────────────────────────────────────
// Automatically attach the Firebase ID token to every outbound request.
apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Response Interceptor ─────────────────────────────────────────────
// Global error handling for 401 / 403.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired — redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
