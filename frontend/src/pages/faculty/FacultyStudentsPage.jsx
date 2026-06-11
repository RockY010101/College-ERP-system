// ══════════════════════════════════════════════════════════════════════
// FacultyStudentsPage.jsx — My Students listing
// Data: GET /api/faculty/students
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import EmptyState from '../../components/EmptyState'
import apiClient from '../../services/apiClient'

function attendanceColor(pct) {
  if (pct >= 85) return '#2e7d32'
  if (pct >= 75) return '#e65100'
  return '#ba1a1a'
}

const semesterOptions = [
  { value: '', label: 'All Semesters' },
  ...Array.from({ length: 8 }, (_, i) => ({ value: String(i + 1), label: `Semester ${i + 1}` })),
]

export default function FacultyStudentsPage() {
  const [students, setStudents]         = useState([])
  const [summary, setSummary]           = useState(null)
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [subjectFilter, setSubjectFilter] = useState('')
  const [semFilter, setSemFilter]       = useState('')

  useEffect(() => {
    let cancelled = false
    apiClient.get('/faculty/students')
      .then(res => {
        if (!cancelled) {
          const d = res.data
          if (Array.isArray(d)) {
            setStudents(d)
          } else if (d && typeof d === 'object') {
            setStudents(Array.isArray(d.students) ? d.students : [])
            setSummary(d.summary ?? null)
          }
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Build subject options dynamically
  const subjectOptions = useMemo(() => {
    const subs = [...new Set(students.map(s => s.subject ?? s.subjectName).filter(Boolean))]
    return [{ value: '', label: 'All Subjects' }, ...subs.map(s => ({ value: s, label: s }))]
  }, [students])

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const q = search.toLowerCase()
      const name = (s.name ?? `${s.firstName ?? ''} ${s.lastName ?? ''}`).toLowerCase()
      const roll = (s.rollNo ?? s.rollNumber ?? '').toLowerCase()
      const matchesSearch  = !q || name.includes(q) || roll.includes(q)
      const matchesSubject = !subjectFilter || (s.subject ?? s.subjectName) === subjectFilter
      const matchesSem     = !semFilter || String(s.semester) === semFilter
      return matchesSearch && matchesSubject && matchesSem
    })
  }, [students, search, subjectFilter, semFilter])

  const stats = [
    { id: 'total-students',      label: 'Total Students',      value: summary?.totalStudents    ?? students.length, icon: 'groups',      variant: 'primary'  },
    { id: 'avg-attendance',      label: 'Avg Attendance',      value: summary?.avgAttendance    ?? '—',             icon: 'trending_up', variant: 'success'  },
    { id: 'pending-evaluations', label: 'Pending Evaluations', value: summary?.pendingEvals     ?? '—',             icon: 'rate_review', variant: 'tertiary' },
  ]

  return (
    <DashboardLayout>
      <div className="page-header" id="faculty-students-header">
        <h1>My Students</h1>
        <p>View and manage students across your assigned subjects</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-grid" id="students-stat-grid">
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

      {/* ── Toolbar ── */}
      <div className="toolbar" id="students-toolbar">
        <SearchBar placeholder="Search by name or roll no…" value={search} onChange={setSearch} id="students-search" />
        <FilterDropdown label="Subject" options={subjectOptions} value={subjectFilter} onChange={setSubjectFilter} id="students-subject-filter" />
        <FilterDropdown label="Semester" options={semesterOptions} value={semFilter} onChange={setSemFilter} id="students-semester-filter" />
      </div>

      {/* ── Students Table ── */}
      <div className="section-panel" id="students-list-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">groups</span>
          <h2>Student List</h2>
          <span className="chip chip--neutral" style={{ marginLeft: 'auto' }}>
            {filtered.length} student{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading students…</p>
        ) : filtered.length === 0 ? (
          <EmptyState icon="search_off" title="No students found" message="No student records available yet." id="students-empty" />
        ) : (
          <table className="data-table" id="students-data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Semester</th>
                <th>Attendance %</th>
                <th>Internal Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const att = s.attendance ?? s.attendancePercent ?? null
                return (
                  <tr key={s.studentId ?? s.id ?? i} id={`fstud-${s.studentId ?? i}`}>
                    <td>{s.rollNo ?? s.rollNumber ?? '—'}</td>
                    <td>{s.name ?? `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim()}</td>
                    <td>{s.subject ?? s.subjectName ?? '—'}</td>
                    <td><span className="chip chip--neutral">{s.semester ? `Sem ${s.semester}` : '—'}</span></td>
                    <td>
                      {att !== null ? (
                        <span style={{ fontWeight: 600, color: attendanceColor(att) }}>{att}%</span>
                      ) : '—'}
                    </td>
                    <td>{s.marks ?? s.internalMarks !== undefined ? `${s.marks ?? s.internalMarks} / 40` : '—'}</td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title="View Student" id={`view-fstud-${s.studentId ?? i}`}>
                          <span className="material-symbols-rounded">visibility</span>
                        </button>
                      </div>
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
