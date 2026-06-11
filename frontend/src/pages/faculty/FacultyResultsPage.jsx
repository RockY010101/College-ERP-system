// ══════════════════════════════════════════════════════════════════════
// FacultyResultsPage.jsx — Enter & view results with grade chips
// Data: GET /api/faculty/results
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'
import EmptyState from '../../components/EmptyState'
import apiClient from '../../services/apiClient'

function gradeFor(total) {
  if (total >= 90) return 'O'
  if (total >= 80) return 'A+'
  if (total >= 70) return 'A'
  if (total >= 60) return 'B+'
  if (total >= 50) return 'B'
  return 'F'
}

function gradeChipVariant(grade) {
  if (grade === 'O')                   return 'chip--success'
  if (grade === 'A+' || grade === 'A') return 'chip--primary'
  if (grade === 'B+' || grade === 'B') return 'chip--neutral'
  return 'chip--error'
}

const examOptions = [
  { value: '',     label: 'All Exams'     },
  { value: 'INT1', label: 'Internal 1'    },
  { value: 'INT2', label: 'Internal 2'    },
  { value: 'END',  label: 'End Semester'  },
]

export default function FacultyResultsPage() {
  const [results, setResults]           = useState([])
  const [summary, setSummary]           = useState(null)
  const [loading, setLoading]           = useState(true)
  const [subjectFilter, setSubjectFilter] = useState('')
  const [examFilter, setExamFilter]     = useState('')

  useEffect(() => {
    let cancelled = false
    apiClient.get('/faculty/results')
      .then(res => {
        if (!cancelled) {
          const d = res.data
          if (Array.isArray(d)) {
            setResults(d)
          } else if (d && typeof d === 'object') {
            setResults(Array.isArray(d.results) ? d.results : [])
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
    const subs = [...new Set(results.map(r => r.subject ?? r.subjectName).filter(Boolean))]
    return [{ value: '', label: 'All Subjects' }, ...subs.map(s => ({ value: s, label: s }))]
  }, [results])

  const filtered = useMemo(() => {
    return results.filter(r => {
      const matchesSubject = !subjectFilter || (r.subject ?? r.subjectName) === subjectFilter
      const matchesExam    = !examFilter    || (r.exam ?? r.examType) === examFilter
      return matchesSubject && matchesExam
    })
  }, [results, subjectFilter, examFilter])

  const stats = [
    { id: 'class-avg',    label: 'Class Average', value: summary?.classAverage ?? '—', icon: 'analytics',    variant: 'primary'  },
    { id: 'highest-mark', label: 'Highest',       value: summary?.highest      ?? '—', icon: 'emoji_events', variant: 'success'  },
    { id: 'pass-pct',     label: 'Pass %',        value: summary?.passPercent  ?? '—', icon: 'verified',     variant: 'tertiary' },
  ]

  return (
    <DashboardLayout>
      <div className="page-header" id="faculty-results-header">
        <h1>Results &amp; Grades</h1>
        <p>Enter, review, and submit student examination results</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-grid" id="results-stat-grid">
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
      <div className="toolbar" id="results-toolbar">
        <FilterDropdown label="Subject" options={subjectOptions} value={subjectFilter} onChange={setSubjectFilter} id="results-subject-filter" />
        <FilterDropdown label="Exam Type" options={examOptions} value={examFilter} onChange={setExamFilter} id="results-exam-filter" />
      </div>

      {/* ── Results Table ── */}
      <div className="section-panel" id="results-table-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">grading</span>
          <h2>Student Results</h2>
          <span className="chip chip--neutral" style={{ marginLeft: 'auto' }}>
            {filtered.length} record{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading results…</p>
        ) : filtered.length === 0 ? (
          <EmptyState icon="search_off" title="No results found" message="No result records available yet." id="results-empty" />
        ) : (
          <table className="data-table" id="results-data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Internal (40)</th>
                <th>External (60)</th>
                <th>Total (100)</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const internal = r.internal ?? r.internalMarks ?? 0
                const external = r.external ?? r.externalMarks ?? 0
                const total    = r.total ?? (internal + external)
                const grade    = r.grade ?? gradeFor(total)
                return (
                  <tr key={r.resultId ?? r.id ?? i} id={`result-${r.resultId ?? i}`}>
                    <td>{r.rollNo ?? r.rollNumber ?? '—'}</td>
                    <td>{r.name ?? `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim()}</td>
                    <td>{internal}</td>
                    <td>{external}</td>
                    <td style={{ fontWeight: 600 }}>{total}</td>
                    <td><span className={`chip ${gradeChipVariant(grade)}`}>{grade}</span></td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title="Edit Result" id={`edit-result-${r.resultId ?? i}`}>
                          <span className="material-symbols-rounded">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

        <div className="form-actions" id="results-form-actions">
          <button className="btn-secondary" id="export-results-btn">
            <span className="material-symbols-rounded">download</span>
            Export
          </button>
          <button className="btn-primary" id="submit-grades-btn">
            <span className="material-symbols-rounded">send</span>
            Submit Grades
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
