// ══════════════════════════════════════════════════════════════════════
// FacultyResultsPage.jsx — Enter & view results with grade chips
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'
import EmptyState from '../../components/EmptyState'

/* ── Static Data ─────────────────────────────────────────────────── */

const stats = [
  { id: 'class-avg',    label: 'Class Average', value: '72.4',  icon: 'analytics',     variant: 'primary'  },
  { id: 'highest-mark', label: 'Highest',       value: '96',    icon: 'emoji_events',  variant: 'success'  },
  { id: 'pass-pct',     label: 'Pass %',        value: '94.2%', icon: 'verified',      variant: 'tertiary' },
]

const subjectOptions = [
  { value: '',   label: 'All Subjects' },
  { value: 'DS', label: 'Data Structures' },
  { value: 'OS', label: 'Operating Systems' },
  { value: 'DB', label: 'DBMS' },
  { value: 'CN', label: 'Computer Networks' },
]

const examOptions = [
  { value: '',     label: 'All Exams' },
  { value: 'INT1', label: 'Internal 1' },
  { value: 'INT2', label: 'Internal 2' },
  { value: 'END',  label: 'End Semester' },
]

function gradeFor(total) {
  if (total >= 90) return 'O'
  if (total >= 80) return 'A+'
  if (total >= 70) return 'A'
  if (total >= 60) return 'B+'
  if (total >= 50) return 'B'
  return 'F'
}

function gradeChipVariant(grade) {
  if (grade === 'O')                      return 'chip--success'
  if (grade === 'A+' || grade === 'A')    return 'chip--primary'
  if (grade === 'B+' || grade === 'B')    return 'chip--neutral'
  return 'chip--error'
}

const results = [
  { id: 'r1',  rollNo: 'CS21001', name: 'Ananya Sharma',   internal: 36, external: 54, subjectKey: 'DS', exam: 'END' },
  { id: 'r2',  rollNo: 'CS21003', name: 'Bhavesh Kumar',   internal: 28, external: 44, subjectKey: 'DS', exam: 'END' },
  { id: 'r3',  rollNo: 'CS21005', name: 'Chandni Desai',   internal: 38, external: 58, subjectKey: 'OS', exam: 'END' },
  { id: 'r4',  rollNo: 'CS21008', name: 'Dhruv Patel',     internal: 22, external: 35, subjectKey: 'DB', exam: 'INT1' },
  { id: 'r5',  rollNo: 'CS21011', name: 'Esha Reddy',      internal: 35, external: 52, subjectKey: 'CN', exam: 'END' },
  { id: 'r6',  rollNo: 'CS21014', name: 'Farhan Sheikh',   internal: 30, external: 46, subjectKey: 'DS', exam: 'INT2' },
  { id: 'r7',  rollNo: 'CS21015', name: 'Gauri Nair',      internal: 33, external: 50, subjectKey: 'OS', exam: 'END' },
  { id: 'r8',  rollNo: 'CS21019', name: 'Harish Joshi',    internal: 18, external: 24, subjectKey: 'DB', exam: 'INT1' },
  { id: 'r9',  rollNo: 'CS21021', name: 'Ishita Gupta',    internal: 37, external: 55, subjectKey: 'CN', exam: 'END' },
  { id: 'r10', rollNo: 'CS21023', name: 'Jayesh Menon',    internal: 26, external: 40, subjectKey: 'DS', exam: 'INT2' },
  { id: 'r11', rollNo: 'CS21026', name: 'Kavya Iyer',      internal: 39, external: 57, subjectKey: 'OS', exam: 'END' },
  { id: 'r12', rollNo: 'CS21028', name: 'Lakshmi Verma',   internal: 31, external: 47, subjectKey: 'DB', exam: 'END' },
]

/* ── Component ───────────────────────────────────────────────────── */

export default function FacultyResultsPage() {
  const [subjectFilter, setSubjectFilter] = useState('')
  const [examFilter, setExamFilter] = useState('')

  const filtered = results.filter((r) => {
    const matchesSubject = !subjectFilter || r.subjectKey === subjectFilter
    const matchesExam = !examFilter || r.exam === examFilter
    return matchesSubject && matchesExam
  })

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
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
        <FilterDropdown
          label="Subject"
          options={subjectOptions}
          value={subjectFilter}
          onChange={setSubjectFilter}
          id="results-subject-filter"
        />
        <FilterDropdown
          label="Exam Type"
          options={examOptions}
          value={examFilter}
          onChange={setExamFilter}
          id="results-exam-filter"
        />
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

        {filtered.length === 0 ? (
          <EmptyState
            icon="search_off"
            title="No results found"
            message="Try adjusting your filter criteria."
            id="results-empty"
          />
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
              {filtered.map((r) => {
                const total = r.internal + r.external
                const grade = gradeFor(total)
                return (
                  <tr key={r.id} id={r.id}>
                    <td>{r.rollNo}</td>
                    <td>{r.name}</td>
                    <td>{r.internal}</td>
                    <td>{r.external}</td>
                    <td style={{ fontWeight: 600 }}>{total}</td>
                    <td>
                      <span className={`chip ${gradeChipVariant(grade)}`}>{grade}</span>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title="Edit Result" id={`edit-${r.id}`}>
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
