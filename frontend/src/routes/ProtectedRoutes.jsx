// ══════════════════════════════════════════════════════════════════════
// ProtectedRoutes — College ERP Frontend
// Guards routes based on authentication and role.
// Supports both Firebase auth and demo/mock auth.
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
  const { hasRole, roleLoading } = useRole()

  // Wait for auth state and role resolution to complete
  if (loading || roleLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-text-muted)',
        gap: '0.5rem',
      }}>
        <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>hourglass_empty</span>
        Loading…
      </div>
    )
  }

  // Redirect unauthenticated users to login
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  // For demo users, the role is stored on the user object itself
  if (currentUser.isDemo && allowedRoles.length > 0) {
    if (!allowedRoles.includes(currentUser.role)) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  // Redirect authenticated users without required role
  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
