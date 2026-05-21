// ══════════════════════════════════════════════════════════════════════
// AuthContext — College ERP Frontend
// Manages Firebase authentication state across the app.
// Supports mock/demo mode when Firebase isn't configured.
// ══════════════════════════════════════════════════════════════════════

import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Check if Firebase is configured via env vars
const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY)

/**
 * AuthProvider — wraps the app and tracks authentication state.
 * If Firebase is configured, uses Firebase auth.
 * Otherwise falls back to a mock auth system for demo/development.
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isFirebaseConfigured) {
      // Dynamic import to avoid crash when Firebase env vars are missing
      import('../firebase/firebaseConfig').then(({ auth }) => {
        import('firebase/auth').then(({ onAuthStateChanged }) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
          })
          return () => unsubscribe()
        })
      }).catch(() => {
        setLoading(false)
      })
    } else {
      // No Firebase — check if there's a saved demo user in sessionStorage
      const saved = sessionStorage.getItem('erp_demo_user')
      if (saved) {
        setCurrentUser(JSON.parse(saved))
      }
      setLoading(false)
    }
  }, [])

  /**
   * Mock login for demo/development mode.
   * @param {string} role - One of SUPER_ADMIN, ADMIN, FACULTY, ACCOUNTANT, STUDENT
   * @param {string} name - Display name
   */
  const demoLogin = (role, name) => {
    const mockUser = {
      uid: `demo-${role.toLowerCase()}`,
      email: `${role.toLowerCase()}@college-erp.demo`,
      displayName: name,
      role: role,
      isDemo: true,
    }
    sessionStorage.setItem('erp_demo_user', JSON.stringify(mockUser))
    setCurrentUser(mockUser)
  }

  /**
   * Logout — clears both Firebase and demo sessions.
   */
  const logout = async () => {
    if (isFirebaseConfigured && currentUser && !currentUser.isDemo) {
      const { auth } = await import('../firebase/firebaseConfig')
      const { signOut } = await import('firebase/auth')
      await signOut(auth)
    }
    sessionStorage.removeItem('erp_demo_user')
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    loading,
    isFirebaseConfigured,
    demoLogin,
    logout,
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
