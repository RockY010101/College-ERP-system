// ══════════════════════════════════════════════════════════════════════
// SuperAdminDashboard.jsx — System Overview
// Data: stats from /api/reports/admin, departments from /api/departments
// Falls back to empty state until backend is implemented.
// ══════════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import apiClient from '../../services/apiClient'

const chipVariant = (status) => {
  switch (status) {
    case 'Active':       return 'chip chip--success'
    case 'Under Review': return 'chip chip--primary'
    case 'Inactive':     return 'chip chip--error'
    default:             return 'chip chip--neutral'
  }
}

function StatCard({ id, icon, label, value, delta, variant }) {
  return (
    <div className="stat-card" id={id}>
      <div className={`stat-card__icon stat-card__icon--${variant}`}>
        <span className="material-symbols-rounded">{icon}</span>
      </div>
      <div className="stat-card__info">
        <span className="stat-card__label">{label}</span>
        <span className="stat-card__value">{value ?? '—'}</span>
        {delta && <span className="stat-card__delta">{delta}</span>}
      </div>
    </div>
  )
}

function EmptyRow({ cols, message = 'No data available' }) {
  return (
    <tr>
      <td colSpan={cols} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
        {message}
      </td>
    </tr>
  )
}

export default function SuperAdminDashboard() {
  const [overview, setOverview]         = useState(null)
  const [departments, setDepartments]   = useState([])
  const [logs, setLogs]                 = useState([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const [overviewRes, deptRes] = await Promise.allSettled([
          apiClient.get('/reports/admin'),
          apiClient.get('/departments'),
        ])
        if (!cancelled) {
          if (overviewRes.status === 'fulfilled') setOverview(overviewRes.value.data)
          if (deptRes.status === 'fulfilled')     setDepartments(Array.isArray(deptRes.value.data) ? deptRes.value.data : [])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const totalUsers   = overview?.totalUsers   ?? '—'
  const uptime       = overview?.systemUptime ?? '—'
  const sessions     = overview?.activeSessions ?? '—'
  const pending      = overview?.pendingApprovals ?? '—'

  return (
    <DashboardLayout>
      <div id="super-admin-dashboard">
        <div className="page-header">
          <h1>System Overview</h1>
          <p>Monitor platform health, manage departments, and review system-wide operations.</p>
        </div>

        <div className="stat-grid" id="super-admin-stat-grid">
          <StatCard id="total-users"        icon="group"           label="Total Users"        value={totalUsers} delta="" variant="primary"   />
          <StatCard id="system-uptime"      icon="timer"           label="System Uptime"      value={uptime}     delta="" variant="success"   />
          <StatCard id="active-sessions"    icon="devices"         label="Active Sessions"    value={sessions}   delta="" variant="secondary" />
          <StatCard id="pending-approvals"  icon="pending_actions" label="Pending Approvals"  value={pending}    delta="" variant="error"     />
        </div>

        <div className="dashboard-grid" id="super-admin-dashboard-grid">
          {/* Department Summary */}
          <div className="section-panel" id="department-summary-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">domain</span>
              <h2>Department Summary</h2>
            </div>
            <table className="data-table" id="department-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Head</th>
                  <th>Students</th>
                  <th>Faculty</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Loading…</td></tr>
                ) : departments.length === 0 ? (
                  <EmptyRow cols={5} message="No departments found" />
                ) : (
                  departments.map((d, i) => (
                    <tr key={d.departmentId ?? i} id={`dept-${d.departmentId ?? i}`}>
                      <td>{d.name}</td>
                      <td>{d.head ?? '—'}</td>
                      <td>{d.studentCount ?? '—'}</td>
                      <td>{d.facultyCount ?? '—'}</td>
                      <td><span className={chipVariant(d.status ?? 'Active')}>{d.status ?? 'Active'}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* System Logs */}
          <div className="section-panel" id="system-logs-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">terminal</span>
              <h2>System Logs</h2>
            </div>
            <div id="system-logs-feed">
              {loading ? (
                <p style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>Loading…</p>
              ) : logs.length === 0 ? (
                <p style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>No system logs available.</p>
              ) : (
                logs.map((log, i) => (
                  <div className="activity-item" key={i} id={`log-${i}`}>
                    <span className="activity-item__dot"></span>
                    <span className="activity-item__text">{log.message ?? log.text}</span>
                    <span className="activity-item__time">{log.time ?? ''}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
