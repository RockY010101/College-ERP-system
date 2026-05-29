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

// ─── Super Admin Pages ────────────────────────────────────────────────
import SuperAdminDashboard from '../pages/admin/SuperAdminDashboard'
import SuperAdminUsersPage from '../pages/admin/SuperAdminUsersPage'
import SuperAdminDepartmentsPage from '../pages/admin/SuperAdminDepartmentsPage'
import SuperAdminCoursesPage from '../pages/admin/SuperAdminCoursesPage'
import SuperAdminReportsPage from '../pages/admin/SuperAdminReportsPage'
import SuperAdminSettingsPage from '../pages/admin/SuperAdminSettingsPage'

// ─── Admin Pages ──────────────────────────────────────────────────────
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminStudentsPage from '../pages/admin/AdminStudentsPage'
import AdminEmployeesPage from '../pages/admin/AdminEmployeesPage'
import AdminCoursesPage from '../pages/admin/AdminCoursesPage'
import AdminAttendancePage from '../pages/admin/AdminAttendancePage'
import AdminReportsPage from '../pages/admin/AdminReportsPage'

// ─── Faculty Pages ───────────────────────────────────────────────────
import FacultyDashboard from '../pages/faculty/FacultyDashboard'
import FacultyStudentsPage from '../pages/faculty/FacultyStudentsPage'
import FacultyAttendancePage from '../pages/faculty/FacultyAttendancePage'
import FacultyResultsPage from '../pages/faculty/FacultyResultsPage'
import FacultySubjectsPage from '../pages/faculty/FacultySubjectsPage'

// ─── Accountant Pages ────────────────────────────────────────────────
import AccountantDashboard from '../pages/accountant/AccountantDashboard'
import AccountantFeesPage from '../pages/accountant/AccountantFeesPage'
import AccountantPaymentsPage from '../pages/accountant/AccountantPaymentsPage'
import AccountantReportsPage from '../pages/accountant/AccountantReportsPage'

// ─── Student Pages ───────────────────────────────────────────────────
import StudentDashboard from '../pages/student/StudentDashboard'
import StudentResultsPage from '../pages/student/StudentResultsPage'
import StudentAttendancePage from '../pages/student/StudentAttendancePage'
import StudentFeesPage from '../pages/student/StudentFeesPage'
import StudentNoticesPage from '../pages/student/StudentNoticesPage'

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
        <Route path="/super-admin" element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/super-admin/users" element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <SuperAdminUsersPage />
          </ProtectedRoute>
        } />
        <Route path="/super-admin/departments" element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <SuperAdminDepartmentsPage />
          </ProtectedRoute>
        } />
        <Route path="/super-admin/courses" element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <SuperAdminCoursesPage />
          </ProtectedRoute>
        } />
        <Route path="/super-admin/reports" element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <SuperAdminReportsPage />
          </ProtectedRoute>
        } />
        <Route path="/super-admin/settings" element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <SuperAdminSettingsPage />
          </ProtectedRoute>
        } />

        {/* ── Admin Routes ──────────────────────────────────── */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/students" element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <AdminStudentsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/employees" element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <AdminEmployeesPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/courses" element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <AdminCoursesPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/attendance" element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <AdminAttendancePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <AdminReportsPage />
          </ProtectedRoute>
        } />

        {/* ── Faculty Routes ────────────────────────────────── */}
        <Route path="/faculty" element={
          <ProtectedRoute allowedRoles={[ROLES.FACULTY]}>
            <FacultyDashboard />
          </ProtectedRoute>
        } />
        <Route path="/faculty/students" element={
          <ProtectedRoute allowedRoles={[ROLES.FACULTY]}>
            <FacultyStudentsPage />
          </ProtectedRoute>
        } />
        <Route path="/faculty/attendance" element={
          <ProtectedRoute allowedRoles={[ROLES.FACULTY]}>
            <FacultyAttendancePage />
          </ProtectedRoute>
        } />
        <Route path="/faculty/results" element={
          <ProtectedRoute allowedRoles={[ROLES.FACULTY]}>
            <FacultyResultsPage />
          </ProtectedRoute>
        } />
        <Route path="/faculty/subjects" element={
          <ProtectedRoute allowedRoles={[ROLES.FACULTY]}>
            <FacultySubjectsPage />
          </ProtectedRoute>
        } />

        {/* ── Accountant Routes ─────────────────────────────── */}
        <Route path="/accountant" element={
          <ProtectedRoute allowedRoles={[ROLES.ACCOUNTANT]}>
            <AccountantDashboard />
          </ProtectedRoute>
        } />
        <Route path="/accountant/fees" element={
          <ProtectedRoute allowedRoles={[ROLES.ACCOUNTANT]}>
            <AccountantFeesPage />
          </ProtectedRoute>
        } />
        <Route path="/accountant/payments" element={
          <ProtectedRoute allowedRoles={[ROLES.ACCOUNTANT]}>
            <AccountantPaymentsPage />
          </ProtectedRoute>
        } />
        <Route path="/accountant/reports" element={
          <ProtectedRoute allowedRoles={[ROLES.ACCOUNTANT]}>
            <AccountantReportsPage />
          </ProtectedRoute>
        } />

        {/* ── Student Routes ────────────────────────────────── */}
        <Route path="/student" element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student/results" element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <StudentResultsPage />
          </ProtectedRoute>
        } />
        <Route path="/student/attendance" element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <StudentAttendancePage />
          </ProtectedRoute>
        } />
        <Route path="/student/fees" element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <StudentFeesPage />
          </ProtectedRoute>
        } />
        <Route path="/student/notices" element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <StudentNoticesPage />
          </ProtectedRoute>
        } />

        {/* ── Default Redirect ──────────────────────────────── */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
