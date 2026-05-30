// ══════════════════════════════════════════════════════════════════════
// LoginPage.jsx — Academic Trust Redesign
// Split-screen login with Firebase auth + Firestore role lookup
// Flow: Authenticate → Fetch role → Redirect to dashboard (or pending)
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
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
  const [pendingApproval, setPendingApproval] = useState(false)
  const { currentUser, demoLogin, isFirebaseConfigured, logout } = useAuth()
  const { role, setRole } = useRole()
  const navigate = useNavigate()

  // ── Auto-redirect if already authenticated with a resolved role ──
  // Handles: page refresh, back-navigation to /login while logged in
  useEffect(() => {
    if (currentUser && role && ROLE_ROUTES[role]) {
      navigate(ROLE_ROUTES[role], { replace: true })
    }
  }, [currentUser, role, navigate])

  // ── Firebase Login ──────────────────────────────────────────────────
  const handleFirebaseLogin = async (e) => {
    e.preventDefault()
    setError('')
    setPendingApproval(false)
    setLoading(true)

    try {
      // Step 1: Authenticate with Firebase
      const { login } = await import('../../services/authService')
      const credential = await login(email, password)

      // Step 2: Fetch role from Firestore
      const { getUserRole } = await import('../../services/firestoreService')
      const userRole = await getUserRole(credential.user.uid)

      if (userRole && ROLE_ROUTES[userRole]) {
        // Step 3a: Role found → set context + redirect to dashboard
        setRole(userRole)
        navigate(ROLE_ROUTES[userRole], { replace: true })
      } else {
        // Step 3b: No role assigned → sign out + show pending message
        await logout()
        setPendingApproval(true)
      }
    } catch (err) {
      // Firebase auth errors
      const code = err?.code || ''
      if (code.includes('invalid-credential') || code.includes('user-not-found') || code.includes('wrong-password')) {
        setError('Invalid email or password. Please try again.')
      } else if (code.includes('too-many-requests')) {
        setError('Too many failed attempts. Please try again later.')
      } else {
        setError('Unable to sign in. Please check your connection and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // ── Demo Login (unchanged) ─────────────────────────────────────────
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

          {/* ── Pending Approval Banner ── */}
          {pendingApproval && (
            <div className="login__pending" role="status" id="pending-approval-banner">
              <span className="material-symbols-rounded login__pending-icon">hourglass_top</span>
              <div className="login__pending-content">
                <strong>Account Pending Approval</strong>
                <p>Your account exists but no role has been assigned yet. Please contact your institution administrator to get access.</p>
              </div>
              <button
                className="login__pending-dismiss"
                onClick={() => setPendingApproval(false)}
                aria-label="Dismiss"
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
          )}

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
