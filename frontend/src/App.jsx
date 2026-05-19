import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { RoleProvider } from './context/RoleContext'
import AppRoutes from './routes/AppRoutes'
import './App.css'

/**
 * App — Root application component.
 * Wraps the app with AuthContext, RoleContext, and the router.
 */
function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <AppRoutes />
      </RoleProvider>
    </AuthProvider>
  )
}

export default App
