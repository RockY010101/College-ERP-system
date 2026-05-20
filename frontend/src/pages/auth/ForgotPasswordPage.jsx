// ══════════════════════════════════════════════════════════════════════
// ForgotPasswordPage.jsx — Academic Trust Redesign
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './LoginPage.css'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { resetPassword } = await import('../../services/authService')
      await resetPassword(email)
      setSent(true)
    } catch (err) {
      setError('Could not send reset email. Please check your address.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login" id="forgot-password-page">
      {/* ── Hero Panel ── */}
      <div className="login__hero">
        <div className="login__hero-content">
          <div className="login__hero-badge">
            <span className="material-symbols-rounded">lock_reset</span>
          </div>
          <h1 className="login__hero-title">Password Recovery</h1>
          <p className="login__hero-tagline">We'll help you get back in</p>
          <div className="login__hero-divider"></div>
          <p className="login__hero-desc">
            Enter your registered email address and we'll send you a link to reset your password.
          </p>
        </div>
      </div>

      {/* ── Form Panel ── */}
      <div className="login__form-panel">
        <div className="login__form-container">
          <div className="login__form-header">
            <h2>Reset Password</h2>
            <p>Enter your email to receive a reset link</p>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <span className="material-symbols-rounded" style={{ fontSize: '48px', color: 'var(--color-success)', display: 'block', marginBottom: 'var(--space-4)' }}>
                mark_email_read
              </span>
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Check Your Email</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-5)' }}>
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="login__form">
              {error && (
                <div className="login__error" role="alert">
                  <span className="material-symbols-rounded">error</span>
                  {error}
                </div>
              )}

              <div className="login__field">
                <label htmlFor="reset-email">Email Address</label>
                <input
                  id="reset-email"
                  type="email"
                  placeholder="you@institution.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <button type="submit" className="btn btn-primary login__submit" disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>

              <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
                <Link to="/login" style={{ fontSize: '0.875rem' }}>
                  ← Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
