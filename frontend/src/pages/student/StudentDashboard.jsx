// ══════════════════════════════════════════════════════════════════════
// StudentDashboard.jsx — My Academic Portal
// Data: GET /api/student/dashboard
// ══════════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import apiClient from '../../services/apiClient'

const gradeChipVariant = (grade) => {
  if (grade === 'O')                   return 'success'
  if (grade === 'A+' || grade === 'A') return 'primary'
  return 'neutral'
}

const noData = (msg = 'No data available yet.') => (
  <p style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>{msg}</p>
)

export default function StudentDashboard() {
  const [summary, setSummary]     = useState(null)
  const [results, setResults]     = useState([])
  const [upcoming, setUpcoming]   = useState([])
  const [progress, setProgress]   = useState(null)
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/student/dashboard')
      .then(res => {
        if (!cancelled && res.data) {
          const d = res.data
          setSummary(d.summary ?? null)
          setResults(Array.isArray(d.recentResults) ? d.recentResults : [])
          setUpcoming(Array.isArray(d.upcoming) ? d.upcoming : [])
          setProgress(d.degreeProgress ?? null)
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const stats = [
    { id: 'cgpa',       icon: 'school',         label: 'Current CGPA', value: summary?.cgpa        ?? '—', delta: '', variant: 'primary'   },
    { id: 'attendance', icon: 'event_available', label: 'Attendance',   value: summary?.attendance  ?? '—', delta: 'Above 75% cutoff', variant: 'success'   },
    { id: 'fees',       icon: 'account_balance', label: 'Pending Fees', value: summary?.pendingFees ?? '—', delta: '', variant: 'error'     },
    { id: 'semester',   icon: 'calendar_month',  label: 'Semester',     value: summary?.semester    ?? '—', delta: summary?.program ?? '', variant: 'secondary' },
  ]

  const pct  = progress?.percentage ?? null
  const text = progress?.label ?? (pct !== null ? `${pct}% completed` : null)

  return (
    <DashboardLayout>
      <div className="page-header" id="student-page-header">
        <h1>My Academic Portal</h1>
        <p>Track your progress, attendance, and fees</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-grid" id="student-stat-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.id} id={`stat-${s.id}`}>
            <div className={`stat-card__icon stat-card__icon--${s.variant}`}>
              <span className="material-symbols-rounded">{s.icon}</span>
            </div>
            <div className="stat-card__info">
              <span className="stat-card__label">{s.label}</span>
              <span className="stat-card__value">{s.value}</span>
              {s.delta && <span className="stat-card__delta">{s.delta}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Two-column grid ── */}
      <div className="dashboard-grid" id="student-dashboard-grid">
        {/* Recent Results */}
        <div className="section-panel" id="student-recent-results">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">assignment</span>
            <h2>Recent Results</h2>
          </div>
          {loading ? noData('Loading…') : results.length === 0 ? noData('No results available yet.') : (
            <table className="data-table" id="student-results-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Internal</th>
                  <th>External</th>
                  <th>Total</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r.id ?? i} id={`result-${r.id ?? i}`}>
                    <td>{r.subject ?? r.subjectName ?? '—'}</td>
                    <td>{r.internal ?? r.internalMarks ?? '—'}</td>
                    <td>{r.external ?? r.externalMarks ?? '—'}</td>
                    <td>{r.total ?? '—'}</td>
                    <td><span className={`chip chip--${gradeChipVariant(r.grade ?? '')}`}>{r.grade ?? '—'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Upcoming */}
        <div className="section-panel" id="student-upcoming">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">upcoming</span>
            <h2>Upcoming</h2>
          </div>
          <div id="student-activity-feed">
            {loading ? noData('Loading…') : upcoming.length === 0 ? noData('No upcoming events.') : (
              upcoming.map((item, i) => (
                <div className="activity-item" key={item.id ?? i} id={`upcoming-${item.id ?? i}`}>
                  <span className="activity-item__dot"></span>
                  <span className="activity-item__text">
                    {item.icon && <span className="material-symbols-rounded">{item.icon}</span>}
                    {item.text ?? item.title ?? '—'}
                  </span>
                  <span className="activity-item__time">{item.time ?? item.date ?? ''}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Degree Progress ── */}
      <div className="section-panel" id="student-degree-progress">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">trending_up</span>
          <h2>Degree Progress</h2>
        </div>
        {text ? (
          <>
            <p>{text}</p>
            <div className="progress-bar" id="degree-progress-bar">
              <div className="progress-bar__fill" style={{ width: `${pct ?? 0}%` }}></div>
            </div>
          </>
        ) : (
          <p style={{ color: 'var(--color-text-muted)' }}>Degree progress not available yet.</p>
        )}
      </div>
    </DashboardLayout>
  )
}
