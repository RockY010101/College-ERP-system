// ══════════════════════════════════════════════════════════════════════
// LoginPage.jsx — Academic Trust Redesign
// Split-screen login with Firebase auth + Demo Mode quick-select
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useRole } from '../../context/RoleContext'
import './LoginPage.css'

const DEMO_ROLES = [
  { role: 'SUPER_ADMIN', name: 'Super Admin', icon: 'shield_person', desc: 'Full system control' },
  { role: 'ADMIN',       name: 'Administrator', icon: 'admin_panel_settings', desc: 'Manage institution' },
  { role: 'FACULTY',     name: 'Faculty',     icon: 'school', desc: 'Classes & grading' },
  { role: 'ACCOUNTANT',  name: 'Accountant',  icon: 'account_balance', desc: 'Fees & payments' },
  { role: 'STUDENT',     name: 'Student',     icon: 'person', desc: 'Academic portal' },
]

const ROLE_ROUTES = {
  SUPER_ADMIN: '/super-admin',
  ADMIN: '/admin',
  FACULTY: '/faculty',
  ACCOUNTANT: '/accountant',
  STUDENT: '/student',
}

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { demoLogin, isFirebaseConfigured } = useAuth()
  const { setRole } = useRole()
  const navigate = useNavigate()

  const handleFirebaseLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { login } = await import('../../services/authService')
      await login(email, password)
      // Auth state change will redirect via ProtectedRoute
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (roleKey, name) => {
    demoLogin(roleKey, name)
    setRole(roleKey)
    navigate(ROLE_ROUTES[roleKey])
  }

  return (
    <div className="login" id="login-page">
      {/* ── Left Panel: Branding ── */}
      <div className="login__hero">
        <div className="login__hero-content">
          <div className="login__hero-badge">
            <span className="material-symbols-rounded">school</span>
          </div>
          <h1 className="login__hero-title">College ERP</h1>
          <p className="login__hero-tagline">Enterprise Management System</p>
          <div className="login__hero-divider"></div>
          <p className="login__hero-desc">
            Centralized platform for academic, administrative, and financial operations.
            Built for students, faculty, and institutional stakeholders.
          </p>
          <div className="login__hero-features">
            <div className="login__feature">
              <span className="material-symbols-rounded">verified</span>
              <span>Secure Firebase Authentication</span>
            </div>
            <div className="login__feature">
              <span className="material-symbols-rounded">analytics</span>
              <span>Real-time Analytics Dashboard</span>
            </div>
            <div className="login__feature">
              <span className="material-symbols-rounded">groups</span>
              <span>Role-based Access Control</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Login Form ── */}
      <div className="login__form-panel">
        <div className="login__form-container">
          <div className="login__form-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to access the platform</p>
          </div>

          {/* Firebase Login Form */}
          {isFirebaseConfigured && (
            <form onSubmit={handleFirebaseLogin} className="login__form">
              {error && (
                <div className="login__error" role="alert">
                  <span className="material-symbols-rounded">error</span>
                  {error}
                </div>
              )}

              <div className="login__field">
                <label htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@institution.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="login__field">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="login__actions">
                <a href="/forgot-password" className="login__forgot">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary login__submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Divider */}
          {isFirebaseConfigured && <div className="login__divider"><span>or continue with</span></div>}

          {/* Demo Mode */}
          <div className="login__demo">
            {!isFirebaseConfigured && (
              <p className="login__demo-notice">
                <span className="material-symbols-rounded">info</span>
                Firebase not configured. Use demo access below.
              </p>
            )}
            <p className="login__demo-label">Quick Demo Access</p>
            <div className="login__demo-grid">
              {DEMO_ROLES.map((d) => (
                <button
                  key={d.role}
                  className="login__demo-card"
                  onClick={() => handleDemoLogin(d.role, d.name)}
                  id={`demo-${d.role.toLowerCase()}`}
                >
                  <span className="material-symbols-rounded login__demo-icon">{d.icon}</span>
                  <span className="login__demo-name">{d.name}</span>
                  <span className="login__demo-desc">{d.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
