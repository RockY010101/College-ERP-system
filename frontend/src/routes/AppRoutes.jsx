// ══════════════════════════════════════════════════════════════════════
// AppRoutes — College ERP Frontend
// Central route configuration for all roles and pages.
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoutes'
import { ROLES } from '../context/RoleContext'

// ─── Auth Pages ───────────────────────────────────────────────────────
import LoginPage from '../pages/auth/LoginPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'

// ─── Dashboards ───────────────────────────────────────────────────────
import SuperAdminDashboard from '../pages/admin/SuperAdminDashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'
import FacultyDashboard from '../pages/faculty/FacultyDashboard'
import AccountantDashboard from '../pages/accountant/AccountantDashboard'
import StudentDashboard from '../pages/student/StudentDashboard'

/**
 * AppRoutes — defines all client-side routes.
 * Protected routes enforce role-based access control.
 */
function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* ── Public Routes ─────────────────────────────────── */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* ── Super Admin Routes ────────────────────────────── */}
        <Route
          path="/super-admin/*"
          element={
            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Admin Routes ──────────────────────────────────── */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Faculty Routes ────────────────────────────────── */}
        <Route
          path="/faculty/*"
          element={
            <ProtectedRoute allowedRoles={[ROLES.FACULTY]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Accountant Routes ─────────────────────────────── */}
        <Route
          path="/accountant/*"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ACCOUNTANT]}>
              <AccountantDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Student Routes ────────────────────────────────── */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Default Redirect ──────────────────────────────── */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
