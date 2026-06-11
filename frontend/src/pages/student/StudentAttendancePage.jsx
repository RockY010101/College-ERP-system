// ══════════════════════════════════════════════════════════════════════
// StudentAttendancePage.jsx — Attendance View
// Data: GET /api/student/attendance
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'
import apiClient from '../../services/apiClient'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const ICON_VARIANTS = ['primary', 'success', 'secondary', 'tertiary']
const ICONS = ['lan', 'storage', 'psychology', 'language', 'code', 'science']

const monthOptions = [
  { value: '', label: 'All Months' },
  ...['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    .map(m => ({ value: m.toLowerCase(), label: m })),
]

export default function StudentAttendancePage() {
  const [subjects, setSubjects]     = useState([])
  const [summary, setSummary]       = useState(null)
  const [calendar, setCalendar]     = useState(null)
  const [loading, setLoading]       = useState(true)
  const [subjectFilter, setSubjectFilter] = useState('')
  const [monthFilter, setMonthFilter]     = useState('')

  useEffect(() => {
    let cancelled = false
    apiClient.get('/student/attendance')
      .then(res => {
        if (!cancelled && res.data) {
          const d = res.data
          setSubjects(Array.isArray(d.subjects) ? d.subjects : (Array.isArray(d) ? d : []))
          setSummary(d.summary ?? null)
          setCalendar(d.calendar ?? null)
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const subjectOptions = useMemo(() => [
    { value: '', label: 'All Subjects' },
    ...subjects.map((s, i) => ({ value: s.id ?? String(i), label: s.name ?? s.subjectName ?? `Subject ${i + 1}` })),
  ], [subjects])

  const filteredSubjects = subjectFilter
    ? subjects.filter((s, i) => (s.id ?? String(i)) === subjectFilter)
    : subjects

  // Build calendar cells from API data or show placeholder
  const calendarCells = useMemo(() => {
    if (!calendar) return []
    const { year, month, firstDay = 0, days = [] } = calendar
    const cells = []
    for (let i = 0; i < firstDay; i++) cells.push({ day: null, type: 'empty' })
    days.forEach((type, idx) => cells.push({ day: idx + 1, type }))
    return cells
  }, [calendar])

  const noDataMsg = (msg = 'No data available yet.') => (
    <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>{msg}</p>
  )

  return (
    <DashboardLayout>
      <div className="page-header" id="attendance-page-header">
        <h1>My Attendance</h1>
        <p>Track your class attendance across all subjects</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-grid" id="attendance-stat-grid">
        <div className="stat-card" id="stat-overall-att">
          <div className="stat-card__icon stat-card__icon--success">
            <span className="material-symbols-rounded">event_available</span>
          </div>
          <div className="stat-card__info">
            <span className="stat-card__label">Overall Attendance</span>
            <span className="stat-card__value">{summary?.overall ?? '—'}</span>
            <span className="stat-card__delta">Above 75% cutoff</span>
          </div>
        </div>
        <div className="stat-card" id="stat-month-att">
          <div className="stat-card__icon stat-card__icon--primary">
            <span className="material-symbols-rounded">calendar_month</span>
          </div>
          <div className="stat-card__info">
            <span className="stat-card__label">This Month</span>
            <span className="stat-card__value">{summary?.thisMonth ?? '—'}</span>
            <span className="stat-card__delta">{summary?.monthLabel ?? ''}</span>
          </div>
        </div>
        <div className="stat-card" id="stat-classes-att">
          <div className="stat-card__icon stat-card__icon--secondary">
            <span className="material-symbols-rounded">groups</span>
          </div>
          <div className="stat-card__info">
            <span className="stat-card__label">Classes Attended</span>
            <span className="stat-card__value">{summary?.attended ?? '—'}{summary?.total ? ` / ${summary.total}` : ''}</span>
            <span className="stat-card__delta">{summary?.missed != null ? `${summary.missed} classes missed` : ''}</span>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="toolbar" id="attendance-toolbar">
        <FilterDropdown label="Subject" options={subjectOptions} value={subjectFilter} onChange={setSubjectFilter} id="filter-subject" />
        <FilterDropdown label="Month" options={monthOptions} value={monthFilter} onChange={setMonthFilter} id="filter-month" />
      </div>

      {/* ── Subject-wise Cards ── */}
      <div className="section-panel" id="subject-attendance-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">bar_chart</span>
          <h2>Subject-wise Attendance</h2>
        </div>
        {loading ? noDataMsg('Loading…') : filteredSubjects.length === 0 ? noDataMsg('No attendance data available yet.') : (
          <div className="card-grid" id="subject-card-grid">
            {filteredSubjects.map((s, i) => {
              const pct = s.percent ?? s.attendancePercent ?? 0
              return (
                <div className="module-card" key={s.id ?? i} id={s.id ?? `att-sub-${i}`}>
                  <div className="module-card__header">
                    <div className={`module-card__icon module-card__icon--${ICON_VARIANTS[i % ICON_VARIANTS.length]}`}>
                      <span className="material-symbols-rounded">{ICONS[i % ICONS.length]}</span>
                    </div>
                    <div>
                      <div className="module-card__title">{s.name ?? s.subjectName ?? '—'}</div>
                      <div className="module-card__subtitle">{pct}% Attendance</div>
                    </div>
                  </div>
                  <div className="subject-progress">
                    <div className="subject-progress__label">
                      <span>Progress</span><span>{pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar__fill" style={{
                        width: `${pct}%`,
                        background: pct >= 90 ? '#2e7d32' : pct >= 75 ? '#feb300' : '#ba1a1a',
                      }} />
                    </div>
                  </div>
                  <div className="module-card__meta">
                    <span className="module-card__meta-item">
                      <span className="material-symbols-rounded">check_circle</span>Present: {s.present ?? '—'}
                    </span>
                    <span className="module-card__meta-item">
                      <span className="material-symbols-rounded">cancel</span>Absent: {s.absent ?? '—'}
                    </span>
                    <span className="module-card__meta-item">
                      <span className="material-symbols-rounded">event</span>Total: {s.total ?? '—'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Attendance Calendar ── */}
      <div className="section-panel" id="attendance-calendar-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">calendar_month</span>
          <h2>Attendance Calendar{calendar?.label ? ` — ${calendar.label}` : ''}</h2>
        </div>
        {loading ? noDataMsg('Loading calendar…') : calendarCells.length === 0 ? noDataMsg('Calendar data not available yet.') : (
          <>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', fontSize: '0.8125rem' }}>
              {[['#e8f5e9','#c8e6c9','Present'],['#ffdad6','#f5c5c0','Absent'],['#fff0c2','#ffe08a','Holiday'],['#e8e8e8','#d0d0d0','Future']].map(([bg, border, label]) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 14, height: 14, borderRadius: 3, background: bg, border: `1px solid ${border}` }} /> {label}
                </span>
              ))}
            </div>
            <div className="attendance-calendar" id="attendance-calendar-grid">
              {DAY_LABELS.map(d => <div key={d} className="attendance-calendar__day-label">{d}</div>)}
              {calendarCells.map((cell, i) => (
                <div key={i} className={`attendance-calendar__cell attendance-calendar__cell--${cell.type}`} id={cell.day ? `cal-day-${cell.day}` : undefined}>
                  {cell.day}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
