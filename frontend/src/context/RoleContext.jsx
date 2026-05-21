// ══════════════════════════════════════════════════════════════════════
// RoleContext — College ERP Frontend
// Stores the role fetched from the backend after Firebase auth.
// Roles: SUPER_ADMIN | ADMIN | FACULTY | ACCOUNTANT | STUDENT
// ══════════════════════════════════════════════════════════════════════

import React, { createContext, useContext, useState } from 'react'

const RoleContext = createContext(null)

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  FACULTY: 'FACULTY',
  ACCOUNTANT: 'ACCOUNTANT',
  STUDENT: 'STUDENT',
}

/**
 * RoleProvider — stores the user's role after backend validation.
 * Exposes: role, setRole, hasRole()
 */
export function RoleProvider({ children }) {
  const [role, setRole] = useState(null)

  /**
   * Check whether the current user has one of the specified roles.
   * @param {string|string[]} allowedRoles
   */
  const hasRole = (allowedRoles) => {
    if (!role) return false
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
    return roles.includes(role)
  }

  const value = { role, setRole, hasRole, ROLES }

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
