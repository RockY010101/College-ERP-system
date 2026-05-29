// ══════════════════════════════════════════════════════════════════════
// StudentAttendancePage.jsx — Attendance View
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'

/* ── Subject Data ── */
const subjects = [
  { id: 'att-cs501', name: 'Computer Networks',    icon: 'lan',            present: 44, absent: 4, total: 48, percent: 91.7,  variant: 'primary'   },
  { id: 'att-cs502', name: 'Database Systems',     icon: 'storage',        present: 46, absent: 2, total: 48, percent: 95.8,  variant: 'success'   },
  { id: 'att-cs503', name: 'Machine Learning',     icon: 'psychology',     present: 42, absent: 6, total: 48, percent: 87.5,  variant: 'secondary' },
  { id: 'att-cs504', name: 'Web Technologies',     icon: 'language',       present: 55, absent: 5, total: 60, percent: 91.7,  variant: 'tertiary'  },
  { id: 'att-cs505', name: 'Compiler Design',      icon: 'code',           present: 47, absent: 6, total: 53, percent: 88.7,  variant: 'primary'   },
]

/* ── Filter Options ── */
const subjectOptions = [
  { value: '', label: 'All Subjects' },
  ...subjects.map((s) => ({ value: s.id, label: s.name })),
]

const monthOptions = [
  { value: '',    label: 'All Months' },
  { value: 'jan', label: 'January 2026' },
  { value: 'feb', label: 'February 2026' },
  { value: 'mar', label: 'March 2026' },
  { value: 'apr', label: 'April 2026' },
  { value: 'may', label: 'May 2026' },
]

/* ── Calendar Data for May 2026 ── */
// May 2026: Friday start (day 1 = Friday)
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MAY_FIRST_DAY = 5 // Friday (0=Sun)
const MAY_DAYS = 31
const TODAY = 29 // Current date in May

// Sundays and designated holidays
const holidays = new Set([3, 10, 17, 24, 31, 1, 15]) // Sundays + May Day + special
const absents = new Set([6, 13, 19, 27])

const generateCalendarCells = () => {
  const cells = []
  // Empty cells before first day
  for (let i = 0; i < MAY_FIRST_DAY; i++) {
    cells.push({ day: null, type: 'empty' })
  }
  for (let d = 1; d <= MAY_DAYS; d++) {
    let type = 'present'
    if (d > TODAY)         type = 'future'
    else if (holidays.has(d)) type = 'holiday'
    else if (absents.has(d))  type = 'absent'
    cells.push({ day: d, type })
  }
  return cells
}

const calendarCells = generateCalendarCells()

export default function StudentAttendancePage() {
  const [subjectFilter, setSubjectFilter] = useState('')
  const [monthFilter, setMonthFilter] = useState('')

  const filteredSubjects = subjectFilter
    ? subjects.filter((s) => s.id === subjectFilter)
    : subjects

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
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
            <span className="stat-card__value">91.2%</span>
            <span className="stat-card__delta">Above 75% cutoff</span>
          </div>
        </div>
        <div className="stat-card" id="stat-month-att">
          <div className="stat-card__icon stat-card__icon--primary">
            <span className="material-symbols-rounded">calendar_month</span>
          </div>
          <div className="stat-card__info">
            <span className="stat-card__label">This Month</span>
            <span className="stat-card__value">88.5%</span>
            <span className="stat-card__delta">May 2026</span>
          </div>
        </div>
        <div className="stat-card" id="stat-classes-att">
          <div className="stat-card__icon stat-card__icon--secondary">
            <span className="material-symbols-rounded">groups</span>
          </div>
          <div className="stat-card__info">
            <span className="stat-card__label">Classes Attended</span>
            <span className="stat-card__value">234 / 257</span>
            <span className="stat-card__delta">23 classes missed</span>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="toolbar" id="attendance-toolbar">
        <FilterDropdown
          label="Subject"
          options={subjectOptions}
          value={subjectFilter}
          onChange={setSubjectFilter}
          id="filter-subject"
        />
        <FilterDropdown
          label="Month"
          options={monthOptions}
          value={monthFilter}
          onChange={setMonthFilter}
          id="filter-month"
        />
      </div>

      {/* ── Subject-wise Attendance Cards ── */}
      <div className="section-panel" id="subject-attendance-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">bar_chart</span>
          <h2>Subject-wise Attendance</h2>
        </div>
        <div className="card-grid" id="subject-card-grid">
          {filteredSubjects.map((s) => (
            <div className="module-card" key={s.id} id={s.id}>
              <div className="module-card__header">
                <div className={`module-card__icon module-card__icon--${s.variant}`}>
                  <span className="material-symbols-rounded">{s.icon}</span>
                </div>
                <div>
                  <div className="module-card__title">{s.name}</div>
                  <div className="module-card__subtitle">{s.percent}% Attendance</div>
                </div>
              </div>
              <div className="subject-progress">
                <div className="subject-progress__label">
                  <span>Progress</span>
                  <span>{s.percent}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar__fill"
                    style={{
                      width: `${s.percent}%`,
                      background: s.percent >= 90 ? '#2e7d32' : s.percent >= 75 ? '#feb300' : '#ba1a1a',
                    }}
                  />
                </div>
              </div>
              <div className="module-card__meta">
                <span className="module-card__meta-item">
                  <span className="material-symbols-rounded">check_circle</span>
                  Present: {s.present}
                </span>
                <span className="module-card__meta-item">
                  <span className="material-symbols-rounded">cancel</span>
                  Absent: {s.absent}
                </span>
                <span className="module-card__meta-item">
                  <span className="material-symbols-rounded">event</span>
                  Total: {s.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Attendance Calendar ── */}
      <div className="section-panel" id="attendance-calendar-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">calendar_month</span>
          <h2>Attendance Calendar — May 2026</h2>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', fontSize: '0.8125rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, background: '#e8f5e9', border: '1px solid #c8e6c9' }} /> Present
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, background: '#ffdad6', border: '1px solid #f5c5c0' }} /> Absent
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, background: '#fff0c2', border: '1px solid #ffe08a' }} /> Holiday
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, background: '#e8e8e8', border: '1px solid #d0d0d0' }} /> Future
          </span>
        </div>

        <div className="attendance-calendar" id="attendance-calendar-grid">
          {DAY_LABELS.map((d) => (
            <div key={d} className="attendance-calendar__day-label">{d}</div>
          ))}
          {calendarCells.map((cell, i) => (
            <div
              key={i}
              className={`attendance-calendar__cell attendance-calendar__cell--${cell.type}`}
              id={cell.day ? `cal-day-${cell.day}` : undefined}
            >
              {cell.day}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
