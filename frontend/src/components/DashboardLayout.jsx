// ══════════════════════════════════════════════════════════════════════
// DashboardLayout.jsx — Shared layout wrapper for all dashboards
// Provides: Sidebar + TopBar + Content area
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import Sidebar from './Sidebar'
import { useAuth } from '../context/AuthContext'
import { useRole } from '../context/RoleContext'

function DashboardLayout({ children }) {
  const { currentUser } = useAuth()
  const { role } = useRole()

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        {/* ── Top Bar ── */}
        <header className="topbar" id="main-topbar">
          <div className="topbar__left">
            <h2 className="topbar__greeting">
              Welcome back, <strong>{currentUser?.displayName || 'User'}</strong>
            </h2>
          </div>
          <div className="topbar__right">
            <div className="chip">{role?.replace('_', ' ') || 'Guest'}</div>
            {currentUser?.isDemo && <div className="chip chip--primary">Demo Mode</div>}
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
