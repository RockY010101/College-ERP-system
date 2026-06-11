// ══════════════════════════════════════════════════════════════════════
// AdminDashboard.jsx — Administration Hub
// Data: fetched from /api/reports/admin (stats) + /api/students (enrollments)
// Shows loading/empty state until backend returns real data.
// ══════════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import apiClient from '../../services/apiClient'

const chipVariant = (status) => {
  switch (status) {
    case 'Confirmed': return 'chip chip--success'
    case 'Pending':   return 'chip chip--primary'
    case 'Waitlisted':return 'chip chip--neutral'
    default:          return 'chip'
  }
}

export default function AdminDashboard() {
  const [report, setReport]           = useState(null)
  const [enrollments, setEnrollments] = useState([])
  const [activities, setActivities]   = useState([])
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const [reportRes, studentsRes] = await Promise.allSettled([
          apiClient.get('/reports/admin'),
          apiClient.get('/students'),
        ])
        if (!cancelled) {
          if (reportRes.status === 'fulfilled')   setReport(reportRes.value.data)
          if (studentsRes.status === 'fulfilled') {
            const data = studentsRes.value.data
            // Support array response or wrapped { enrollments: [] }
            setEnrollments(Array.isArray(data) ? data : (data?.enrollments ?? []))
            setActivities(data?.activities ?? [])
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const stats = [
    { id: 'total-students',  icon: 'school',     label: 'Total Students',  value: report?.totalStudents  ?? '—', delta: '', variant: 'primary'   },
    { id: 'total-faculty',   icon: 'groups',     label: 'Total Faculty',   value: report?.totalFaculty   ?? '—', delta: '', variant: 'secondary' },
    { id: 'active-courses',  icon: 'menu_book',  label: 'Active Courses',  value: report?.activeCourses  ?? '—', delta: '', variant: 'tertiary'  },
    { id: 'departments',     icon: 'apartment',  label: 'Departments',     value: report?.totalDepartments ?? '—', delta: '', variant: 'success' },
  ]

  const emptyRow = (cols, msg = 'No data available yet') => (
    <tr>
      <td colSpan={cols} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
        {msg}
      </td>
    </tr>
  )

  return (
    <DashboardLayout>
      <div id="admin-dashboard">
        <div className="page-header">
          <h1>Administration Hub</h1>
          <p>Manage students, faculty, courses, and institutional operations at a glance.</p>
        </div>

        {/* ── Stat Cards ── */}
        <div className="stat-grid" id="admin-stat-grid">
          {stats.map((s) => (
            <div className="stat-card" key={s.id} id={s.id}>
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

        <div className="dashboard-grid" id="admin-dashboard-grid">
          {/* ── Recent Enrollments ── */}
          <div className="section-panel" id="recent-enrollments-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">how_to_reg</span>
              <h2>Recent Enrollments</h2>
            </div>
            <table className="data-table" id="enrollments-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Loading…</td></tr>
                ) : enrollments.length === 0 ? (
                  emptyRow(5, 'No enrollment records yet')
                ) : (
                  enrollments.slice(0, 10).map((e, i) => (
                    <tr key={e.studentId ?? e.id ?? i} id={`enr-${e.studentId ?? i}`}>
                      <td>{e.name ?? `${e.firstName ?? ''} ${e.lastName ?? ''}`.trim()}</td>
                      <td>{e.course ?? e.courseName ?? '—'}</td>
                      <td>{e.semester ? `Sem ${e.semester}` : '—'}</td>
                      <td>{e.enrollmentDate ?? e.date ?? '—'}</td>
                      <td><span className={chipVariant(e.status ?? 'Confirmed')}>{e.status ?? 'Confirmed'}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Recent Activity ── */}
          <div className="section-panel" id="recent-activity-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">timeline</span>
              <h2>Recent Activity</h2>
            </div>
            <div id="admin-activity-feed">
              {loading ? (
                <p style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>Loading…</p>
              ) : activities.length === 0 ? (
                <p style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>No recent activity available.</p>
              ) : (
                activities.map((a, i) => (
                  <div className="activity-item" key={i} id={`act-${i}`}>
                    <span className="activity-item__dot"></span>
                    <span className="activity-item__text">{a.text ?? a.message}</span>
                    <span className="activity-item__time">{a.time ?? a.createdAt ?? ''}</span>
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
