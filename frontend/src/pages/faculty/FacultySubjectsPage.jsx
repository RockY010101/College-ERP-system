// ══════════════════════════════════════════════════════════════════════
// FacultySubjectsPage.jsx — Assigned subjects & schedule
// Data: GET /api/faculty/subjects
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import apiClient from '../../services/apiClient'

const ICON_VARIANTS = ['primary', 'secondary', 'tertiary', 'success']
const ICONS = ['menu_book', 'memory', 'database', 'lan', 'account_tree', 'science']

export default function FacultySubjectsPage() {
  const [subjects, setSubjects]   = useState([])
  const [schedule, setSchedule]   = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/faculty/subjects')
      .then(res => {
        if (!cancelled) {
          const d = res.data
          if (Array.isArray(d)) {
            setSubjects(d)
          } else if (d && typeof d === 'object') {
            setSubjects(Array.isArray(d.subjects) ? d.subjects : [])
            setSchedule(Array.isArray(d.weeklySchedule) ? d.weeklySchedule : [])
          }
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const noDataMsg = (msg = 'No data available yet.') => (
    <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>{msg}</p>
  )

  return (
    <DashboardLayout>
      <div className="page-header" id="faculty-subjects-header">
        <h1>My Subjects</h1>
        <p>Subjects assigned to you this semester along with your weekly timetable</p>
      </div>

      {/* ── Subject Cards ── */}
      {loading ? noDataMsg('Loading subjects…') : subjects.length === 0 ? noDataMsg('No subjects assigned yet.') : (
        <div className="card-grid" id="subjects-card-grid">
          {subjects.map((sub, i) => {
            const pct = sub.progress ?? sub.syllabusProgress ?? 0
            return (
              <div className="module-card" key={sub.subjectId ?? sub.id ?? i} id={`sub-${sub.subjectId ?? i}`}>
                <div className="module-card__header">
                  <div className={`module-card__icon module-card__icon--${ICON_VARIANTS[i % ICON_VARIANTS.length]}`}>
                    <span className="material-symbols-rounded">{ICONS[i % ICONS.length]}</span>
                  </div>
                  <div>
                    <div className="module-card__title">{sub.name ?? sub.subjectName ?? '—'}</div>
                    <div className="module-card__subtitle">{sub.code ?? sub.courseCode ?? '—'}</div>
                  </div>
                </div>

                <div className="module-card__meta">
                  <span className="module-card__meta-item">
                    <span className="material-symbols-rounded">school</span>
                    {sub.semester ? `Sem ${sub.semester}` : '—'}
                  </span>
                  <span className="module-card__meta-item">
                    <span className="material-symbols-rounded">groups</span>
                    {sub.students ?? sub.studentCount ?? '—'} students
                  </span>
                  {(sub.schedule ?? sub.timeSlot) && (
                    <span className="module-card__meta-item">
                      <span className="material-symbols-rounded">schedule</span>
                      {sub.schedule ?? sub.timeSlot}
                    </span>
                  )}
                  {(sub.room ?? sub.roomNo) && (
                    <span className="module-card__meta-item">
                      <span className="material-symbols-rounded">meeting_room</span>
                      {sub.room ?? sub.roomNo}
                    </span>
                  )}
                </div>

                <div className="subject-progress">
                  <div className="subject-progress__label">
                    <span>Syllabus Progress</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="progress-bar" id={`progress-sub-${i}`}>
                    <div className="progress-bar__fill" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Weekly Schedule ── */}
      <div className="section-panel" id="weekly-schedule-panel" style={{ marginTop: '1.5rem' }}>
        <div className="section-panel__header">
          <span className="material-symbols-rounded">calendar_month</span>
          <h2>Weekly Schedule</h2>
        </div>
        {loading ? noDataMsg('Loading schedule…') : schedule.length === 0 ? noDataMsg('No weekly schedule available yet.') : (
          <table className="data-table" id="weekly-schedule-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Time</th>
                <th>Subject</th>
                <th>Room</th>
                <th>Batch</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s, i) => (
                <tr key={s.id ?? i} id={`ws-${s.id ?? i}`}>
                  <td style={{ fontWeight: 600 }}>{s.day ?? '—'}</td>
                  <td>{s.time ?? s.timeSlot ?? '—'}</td>
                  <td>{s.subject ?? s.subjectName ?? '—'}</td>
                  <td><span className="chip chip--neutral">{s.room ?? s.roomNo ?? '—'}</span></td>
                  <td>{s.batch ?? s.batchName ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  )
}
