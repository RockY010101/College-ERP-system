// ══════════════════════════════════════════════════════════════════════
// FacultyDashboard.jsx — Faculty Portal home
// Data: GET /api/faculty/dashboard
// ══════════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import apiClient from '../../services/apiClient'

export default function FacultyDashboard() {
  const [summary, setSummary]         = useState(null)
  const [schedule, setSchedule]       = useState([])
  const [submissions, setSubmissions] = useState([])
  const [semProgress, setSemProgress] = useState(null)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/faculty/dashboard')
      .then(res => {
        if (!cancelled && res.data) {
          const d = res.data
          setSummary(d.summary ?? null)
          setSchedule(Array.isArray(d.todaySchedule) ? d.todaySchedule : [])
          setSubmissions(Array.isArray(d.recentSubmissions) ? d.recentSubmissions : [])
          setSemProgress(d.semesterProgress ?? null)
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const stats = [
    { id: 'my-students',    label: 'My Students',         value: summary?.totalStudents    ?? '—', icon: 'groups',         variant: 'primary'   },
    { id: 'classes-today',  label: 'Classes Today',       value: summary?.classesToday     ?? '—', icon: 'calendar_today', variant: 'secondary' },
    { id: 'pending-evals',  label: 'Pending Evaluations', value: summary?.pendingEvals     ?? '—', icon: 'rate_review',    variant: 'tertiary'  },
    { id: 'avg-attendance', label: 'Avg Attendance',      value: summary?.avgAttendance    ?? '—', icon: 'trending_up',    variant: 'success'   },
  ]

  const pct = semProgress?.percentage ?? null

  const noDataMsg = (msg = 'No data available yet.') => (
    <p style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>{msg}</p>
  )

  return (
    <DashboardLayout>
      <div className="page-header" id="faculty-page-header">
        <h1>Faculty Portal</h1>
        <p>Manage your classes, attendance, and student performance</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-grid" id="faculty-stat-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.id} id={s.id}>
            <div className={`stat-card__icon stat-card__icon--${s.variant}`}>
              <span className="material-symbols-rounded">{s.icon}</span>
            </div>
            <div className="stat-card__info">
              <span className="stat-card__label">{s.label}</span>
              <span className="stat-card__value">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Two-Column Grid ── */}
      <div className="dashboard-grid" id="faculty-dashboard-grid">
        {/* Today's Schedule */}
        <div className="section-panel" id="todays-schedule-panel">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">schedule</span>
            <h2>Today&#39;s Schedule</h2>
          </div>
          {loading ? noDataMsg('Loading…') : schedule.length === 0 ? noDataMsg('No classes scheduled today.') : (
            <table className="data-table" id="todays-schedule-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Subject</th>
                  <th>Semester</th>
                  <th>Room</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((cls, i) => (
                  <tr key={cls.id ?? i} id={`cls-${cls.id ?? i}`}>
                    <td>{cls.time ?? cls.timeSlot ?? '—'}</td>
                    <td>{cls.subject ?? cls.subjectName ?? '—'}</td>
                    <td><span className="chip chip--neutral">{cls.semester ? `Sem ${cls.semester}` : '—'}</span></td>
                    <td>{cls.room ?? cls.roomNo ?? '—'}</td>
                    <td>{cls.students ?? cls.studentCount ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Recent Submissions */}
        <div className="section-panel" id="recent-submissions-panel">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">assignment_turned_in</span>
            <h2>Recent Submissions</h2>
          </div>
          <div id="recent-submissions-feed">
            {loading ? noDataMsg('Loading…') : submissions.length === 0 ? noDataMsg('No recent submissions.') : (
              submissions.map((item, i) => (
                <div className="activity-item" key={item.id ?? i} id={`sub-${item.id ?? i}`}>
                  <span className="activity-item__dot"></span>
                  <span className="activity-item__text">{item.text ?? item.message ?? '—'}</span>
                  <span className="activity-item__time">{item.time ?? item.submittedAt ?? ''}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Semester Progress ── */}
      <div className="section-panel" id="semester-progress-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">trending_up</span>
          <h2>Semester Progress</h2>
        </div>
        {pct !== null ? (
          <>
            <p>{pct}% of the semester completed</p>
            <div className="progress-bar" id="semester-progress-bar">
              <div className="progress-bar__fill" style={{ width: `${pct}%` }}></div>
            </div>
          </>
        ) : (
          <p style={{ color: 'var(--color-text-muted)' }}>Semester progress not available yet.</p>
        )}
      </div>
    </DashboardLayout>
  )
}
