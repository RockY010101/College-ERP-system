// ══════════════════════════════════════════════════════════════════════
// AuthContext — College ERP Frontend
// Manages Firebase authentication state across the app.
// ══════════════════════════════════════════════════════════════════════

import React, { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

const AuthContext = createContext(null)

/**
 * AuthProvider — wraps the app and tracks Firebase auth state.
 * Exposes: currentUser, loading
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    // Cleanup listener on unmount
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth — custom hook to consume AuthContext.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
