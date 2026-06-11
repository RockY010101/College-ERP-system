// ══════════════════════════════════════════════════════════════════════
// FacultyAttendancePage.jsx — Mark & review attendance
// Data: GET /api/faculty/attendance  (student list + history)
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'
import apiClient from '../../services/apiClient'

function formatDate(d) {
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

const todayStr = formatDate(new Date())

const dateOptions = [
  { value: 'today',     label: `Today — ${todayStr}` },
  { value: 'yesterday', label: 'Yesterday' },
]

export default function FacultyAttendancePage() {
  const [subjects, setSubjects]         = useState([])
  const [attendanceData, setAttendanceData] = useState([])
  const [history, setHistory]           = useState([])
  const [loading, setLoading]           = useState(true)
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedDate, setSelectedDate] = useState('today')

  useEffect(() => {
    let cancelled = false
    apiClient.get('/faculty/attendance')
      .then(res => {
        if (!cancelled && res.data) {
          const d = res.data
          const rawSubjects = Array.isArray(d.subjects) ? d.subjects : []
          setSubjects(rawSubjects)
          if (rawSubjects.length > 0) setSelectedSubject(rawSubjects[0].value ?? rawSubjects[0].id ?? '')
          setAttendanceData(Array.isArray(d.students) ? d.students.map(s => ({ ...s, status: s.status ?? 'present' })) : [])
          setHistory(Array.isArray(d.history) ? d.history : [])
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const toggleStatus = (id) => {
    setAttendanceData(prev =>
      prev.map(s => s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s)
    )
  }

  const resetAll = () => {
    setAttendanceData(prev => prev.map(s => ({ ...s, status: 'present' })))
  }

  const presentCount = attendanceData.filter(s => s.status === 'present').length
  const absentCount  = attendanceData.filter(s => s.status === 'absent').length

  const subjectOptions = useMemo(() => {
    if (subjects.length > 0) return subjects
    return []
  }, [subjects])

  const noDataMsg = (msg = 'No data available yet.') => (
    <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>{msg}</p>
  )

  return (
    <DashboardLayout>
      <div className="page-header" id="faculty-attendance-header">
        <h1>Mark Attendance</h1>
        <p>Record daily attendance for your classes</p>
      </div>

      {/* ── Toolbar ── */}
      <div className="toolbar" id="attendance-toolbar">
        {subjectOptions.length > 0 ? (
          <FilterDropdown
            label="Subject"
            options={subjectOptions}
            value={selectedSubject}
            onChange={setSelectedSubject}
            id="attendance-subject-filter"
          />
        ) : (
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Loading subjects…</span>
        )}
        <FilterDropdown label="Date" options={dateOptions} value={selectedDate} onChange={setSelectedDate} id="attendance-date-filter" />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span className="chip chip--success">
            <span className="material-symbols-rounded" style={{ fontSize: 14 }}>check_circle</span>
            Present: {presentCount}
          </span>
          <span className="chip chip--error">
            <span className="material-symbols-rounded" style={{ fontSize: 14 }}>cancel</span>
            Absent: {absentCount}
          </span>
        </div>
      </div>

      {/* ── Mark Attendance Panel ── */}
      <div className="section-panel" id="mark-attendance-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">fact_check</span>
          <h2>Mark Attendance</h2>
        </div>

        {loading ? noDataMsg('Loading students…') : attendanceData.length === 0 ? noDataMsg('No student records available yet.') : (
          <table className="data-table" id="mark-attendance-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>#</th>
                <th>Roll No</th>
                <th>Name</th>
                <th style={{ textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((s, idx) => (
                <tr key={s.id ?? idx} id={`att-${s.id ?? idx}`}>
                  <td>{idx + 1}</td>
                  <td>{s.rollNo ?? s.rollNumber ?? '—'}</td>
                  <td>{s.name ?? `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim()}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="attendance-toggle" id={`toggle-${s.id ?? idx}`}>
                      <button
                        className={`attendance-toggle__btn ${s.status === 'present' ? 'attendance-toggle__btn--active-present' : ''}`}
                        onClick={() => toggleStatus(s.id ?? idx)}
                      >Present</button>
                      <button
                        className={`attendance-toggle__btn ${s.status === 'absent' ? 'attendance-toggle__btn--active-absent' : ''}`}
                        onClick={() => toggleStatus(s.id ?? idx)}
                      >Absent</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="form-actions" id="attendance-form-actions">
          <button className="btn-secondary" id="reset-attendance-btn" onClick={resetAll}>
            <span className="material-symbols-rounded">restart_alt</span>
            Reset
          </button>
          <button className="btn-primary" id="submit-attendance-btn">
            <span className="material-symbols-rounded">check</span>
            Submit Attendance
          </button>
        </div>
      </div>

      {/* ── Attendance History Panel ── */}
      <div className="section-panel" id="attendance-history-panel" style={{ marginTop: '1.5rem' }}>
        <div className="section-panel__header">
          <span className="material-symbols-rounded">history</span>
          <h2>Attendance History</h2>
        </div>

        {loading ? noDataMsg('Loading history…') : history.length === 0 ? noDataMsg('No attendance history available yet.') : (
          <table className="data-table" id="attendance-history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => {
                const pct = h.pct ?? h.percentage ?? 0
                return (
                  <tr key={h.id ?? i} id={`hist-${h.id ?? i}`}>
                    <td>{h.date ?? '—'}</td>
                    <td>{h.subject ?? h.subjectName ?? '—'}</td>
                    <td><span style={{ color: '#2e7d32', fontWeight: 600 }}>{h.present ?? '—'}</span></td>
                    <td><span style={{ color: '#ba1a1a', fontWeight: 600 }}>{h.absent ?? '—'}</span></td>
                    <td>
                      <span className={`chip ${pct >= 90 ? 'chip--success' : pct >= 80 ? 'chip--primary' : 'chip--error'}`}>
                        {pct}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  )
}
