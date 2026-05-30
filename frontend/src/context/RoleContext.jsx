// ══════════════════════════════════════════════════════════════════════
// RoleContext — College ERP Frontend
// Stores the user's role and auto-fetches it from Firestore
// when a real Firebase user is detected.
// Roles: SUPER_ADMIN | ADMIN | FACULTY | ACCOUNTANT | STUDENT
// ══════════════════════════════════════════════════════════════════════

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getUserByUid } from '../services/firestoreService'

const RoleContext = createContext(null)

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  FACULTY: 'FACULTY',
  ACCOUNTANT: 'ACCOUNTANT',
  STUDENT: 'STUDENT',
}

/**
 * RoleProvider — resolves the user's role automatically.
 *
 * - Demo users:    role comes from the mock user object.
 * - Firebase users: role is fetched from Firestore `users/{uid}`.
 * - No user:        role is null.
 *
 * Exposes: role, setRole, hasRole(), roleLoading
 */
export function RoleProvider({ children }) {
  const [role, setRole] = useState(null)
  const [roleLoading, setRoleLoading] = useState(true)
  const { currentUser, isFirebaseConfigured } = useAuth()

  // ── Auto-fetch role when auth state changes (login or page refresh) ──
  useEffect(() => {
    // No user logged in
    if (!currentUser) {
      setRole(null)
      setRoleLoading(false)
      return
    }

    // Demo user — role is stored on the mock user object
    if (currentUser.isDemo) {
      setRole(currentUser.role)
      setRoleLoading(false)
      return
    }

    // Real Firebase user — fetch role from Firestore
    if (isFirebaseConfigured) {
      setRoleLoading(true)
      getUserByUid(currentUser.uid)
        .then((userData) => {
          if (userData?.role) {
            setRole(userData.role)
          } else {
            // User exists in Firebase Auth but has no Firestore document/role
            setRole(null)
          }
        })
        .catch(() => {
          setRole(null)
        })
        .finally(() => {
          setRoleLoading(false)
        })
    } else {
      setRoleLoading(false)
    }
  }, [currentUser, isFirebaseConfigured])

  /**
   * Check whether the current user has one of the specified roles.
   * @param {string|string[]} allowedRoles
   */
  const hasRole = (allowedRoles) => {
    if (!role) return false
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
    return roles.includes(role)
  }

  const value = { role, setRole, hasRole, roleLoading, ROLES }

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  )
}

/**
 * useRole — custom hook to consume RoleContext.
 */
export function useRole() {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider')
  }
  return context
}

export default RoleContext
