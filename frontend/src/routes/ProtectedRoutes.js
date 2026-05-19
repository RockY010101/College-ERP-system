// ══════════════════════════════════════════════════════════════════════
// ProtectedRoutes — College ERP Frontend
// Guards routes based on authentication and role.
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRole } from '../context/RoleContext'

/**
 * ProtectedRoute — renders children only if the user is authenticated
 * and has one of the specified allowed roles.
 *
 * @param {string[]} allowedRoles - Roles permitted to access this route.
 * @param {ReactNode} children    - The component to render if authorized.
 */
function ProtectedRoute({ allowedRoles = [], children }) {
  const { currentUser, loading } = useAuth()
  const { hasRole } = useRole()

  // Wait for auth state to resolve
  if (loading) {
    return <div className="app-loading">Loading...</div>
  }

  // Redirect unauthenticated users to login
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  // Redirect authenticated users without required role
  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedRoute
