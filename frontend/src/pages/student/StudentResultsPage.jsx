// ══════════════════════════════════════════════════════════════════════
// StudentResultsPage.jsx — Full Results View
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

/* ── Semester Options ── */
const semesterOptions = [
  { value: '1', label: 'Semester 1' },
  { value: '2', label: 'Semester 2' },
  { value: '3', label: 'Semester 3' },
  { value: '4', label: 'Semester 4' },
  { value: '5', label: 'Semester 5' },
]

/* ── Results Data by Semester ── */
const resultsBySemester = {
  '1': [
    { id: 'r1-1', code: 'CS101', name: 'Programming in C',          credits: 4, internal: 36, external: 52, total: 88, grade: 'A+', gp: 9 },
    { id: 'r1-2', code: 'MA101', name: 'Engineering Mathematics I',  credits: 4, internal: 30, external: 45, total: 75, grade: 'A',  gp: 8 },
    { id: 'r1-3', code: 'PH101', name: 'Engineering Physics',       credits: 3, internal: 34, external: 50, total: 84, grade: 'A+', gp: 9 },
    { id: 'r1-4', code: 'ME101', name: 'Engineering Graphics',      credits: 3, internal: 28, external: 40, total: 68, grade: 'B+', gp: 7 },
    { id: 'r1-5', code: 'EE101', name: 'Basic Electrical Engg.',    credits: 3, internal: 32, external: 48, total: 80, grade: 'A',  gp: 8 },
    { id: 'r1-6', code: 'HS101', name: 'English Communication',     credits: 2, internal: 38, external: 55, total: 93, grade: 'O',  gp: 10 },
  ],
  '2': [
    { id: 'r2-1', code: 'CS201', name: 'Data Structures',           credits: 4, internal: 38, external: 54, total: 92, grade: 'O',  gp: 10 },
    { id: 'r2-2', code: 'MA201', name: 'Engineering Mathematics II', credits: 4, internal: 32, external: 46, total: 78, grade: 'A',  gp: 8 },
    { id: 'r2-3', code: 'CH201', name: 'Engineering Chemistry',     credits: 3, internal: 30, external: 44, total: 74, grade: 'A',  gp: 8 },
    { id: 'r2-4', code: 'CS202', name: 'Digital Logic Design',      credits: 3, internal: 35, external: 50, total: 85, grade: 'A+', gp: 9 },
    { id: 'r2-5', code: 'ME201', name: 'Workshop Practice',         credits: 2, internal: 36, external: 52, total: 88, grade: 'A+', gp: 9 },
    { id: 'r2-6', code: 'HS201', name: 'Environmental Science',     credits: 2, internal: 28, external: 38, total: 66, grade: 'B+', gp: 7 },
  ],
  '3': [
    { id: 'r3-1', code: 'CS301', name: 'Object Oriented Programming', credits: 4, internal: 37, external: 53, total: 90, grade: 'O',  gp: 10 },
    { id: 'r3-2', code: 'CS302', name: 'Computer Organization',       credits: 4, internal: 33, external: 47, total: 80, grade: 'A',  gp: 8 },
    { id: 'r3-3', code: 'MA301', name: 'Probability & Statistics',    credits: 3, internal: 35, external: 51, total: 86, grade: 'A+', gp: 9 },
    { id: 'r3-4', code: 'CS303', name: 'Discrete Mathematics',        credits: 3, internal: 28, external: 37, total: 65, grade: 'B+', gp: 7 },
    { id: 'r3-5', code: 'CS304', name: 'Database Management Systems', credits: 4, internal: 38, external: 54, total: 92, grade: 'O',  gp: 10 },
    { id: 'r3-6', code: 'HS301', name: 'Economics for Engineers',     credits: 2, internal: 30, external: 42, total: 72, grade: 'A',  gp: 8 },
  ],
  '4': [
    { id: 'r4-1', code: 'CS401', name: 'Design & Analysis of Algorithms', credits: 4, internal: 36, external: 50, total: 86, grade: 'A+', gp: 9 },
    { id: 'r4-2', code: 'CS402', name: 'Operating Systems',                credits: 4, internal: 35, external: 48, total: 83, grade: 'A+', gp: 9 },
    { id: 'r4-3', code: 'CS403', name: 'Theory of Computation',           credits: 3, internal: 30, external: 42, total: 72, grade: 'A',  gp: 8 },
    { id: 'r4-4', code: 'CS404', name: 'Software Engineering',            credits: 3, internal: 32, external: 50, total: 82, grade: 'A+', gp: 9 },
    { id: 'r4-5', code: 'CS405', name: 'Microprocessors',                 credits: 4, internal: 34, external: 46, total: 80, grade: 'A',  gp: 8 },
    { id: 'r4-6', code: 'HS401', name: 'Management Principles',           credits: 2, internal: 36, external: 54, total: 90, grade: 'O',  gp: 10 },
  ],
  '5': [
    { id: 'r5-1', code: 'CS501', name: 'Computer Networks',       credits: 4, internal: 30, external: 42, total: 72, grade: 'A',  gp: 8 },
    { id: 'r5-2', code: 'CS502', name: 'Database Systems',        credits: 4, internal: 38, external: 54, total: 92, grade: 'O',  gp: 10 },
    { id: 'r5-3', code: 'CS503', name: 'Machine Learning',        credits: 4, internal: 36, external: 50, total: 86, grade: 'A+', gp: 9 },
    { id: 'r5-4', code: 'CS504', name: 'Web Technologies',        credits: 3, internal: 35, external: 48, total: 83, grade: 'A+', gp: 9 },
    { id: 'r5-5', code: 'CS505', name: 'Compiler Design',         credits: 3, internal: 28, external: 37, total: 65, grade: 'B+', gp: 7 },
    { id: 'r5-6', code: 'CS506', name: 'Information Security',    credits: 3, internal: 32, external: 50, total: 82, grade: 'A+', gp: 9 },
  ],
}

/* ── Semester Performance Chart Data ── */
const semesterPerformance = [
  { semester: 'Sem 1', sgpa: 8.26 },
  { semester: 'Sem 2', sgpa: 8.56 },
  { semester: 'Sem 3', sgpa: 8.70 },
  { semester: 'Sem 4', sgpa: 8.75 },
  { semester: 'Sem 5', sgpa: 8.65 },
]

/* ── Grade-to-chip mapping ── */
const gradeChip = (grade) => {
  if (grade === 'O')                   return 'success'
  if (grade === 'A+' || grade === 'A') return 'primary'
  return 'neutral'
}

export default function StudentResultsPage() {
  const [semesterFilter, setSemesterFilter] = useState('5')

  const subjects = resultsBySemester[semesterFilter] || []
  const totalCredits = subjects.reduce((s, r) => s + r.credits, 0)
  const sgpa = subjects.length
    ? (subjects.reduce((s, r) => s + r.credits * r.gp, 0) / totalCredits).toFixed(2)
    : '—'
  const allPassed = subjects.every((r) => r.total >= 40)

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="page-header" id="results-page-header">
        <h1>My Results</h1>
        <p>View detailed semester-wise examination results and performance</p>
      </div>

      {/* ── Toolbar ── */}
      <div className="toolbar" id="results-toolbar">
        <FilterDropdown
          label="Semester"
          options={semesterOptions}
          value={semesterFilter}
          onChange={setSemesterFilter}
          id="filter-result-semester"
        />
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-grid" id="results-stat-grid">
        <div className="stat-card" id="stat-sgpa">
          <div className="stat-card__icon stat-card__icon--primary">
            <span className="material-symbols-rounded">grade</span>
          </div>
          <div className="stat-card__info">
            <span className="stat-card__label">Current SGPA</span>
            <span className="stat-card__value">{sgpa}</span>
            <span className="stat-card__delta">Semester {semesterFilter}</span>
          </div>
        </div>
        <div className="stat-card" id="stat-cgpa">
          <div className="stat-card__icon stat-card__icon--secondary">
            <span className="material-symbols-rounded">school</span>
          </div>
          <div className="stat-card__info">
            <span className="stat-card__label">CGPA</span>
            <span className="stat-card__value">8.42</span>
            <span className="stat-card__delta">Cumulative to date</span>
          </div>
        </div>
        <div className="stat-card" id="stat-credits">
          <div className="stat-card__icon stat-card__icon--success">
            <span className="material-symbols-rounded">task_alt</span>
          </div>
          <div className="stat-card__info">
            <span className="stat-card__label">Credits Earned</span>
            <span className="stat-card__value">120 / 160</span>
            <span className="stat-card__delta">75% completed</span>
          </div>
        </div>
      </div>

      {/* ── Results Table ── */}
      <div className="section-panel" id="results-table-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">assignment</span>
          <h2>Semester {semesterFilter} Results</h2>
        </div>
        <table className="data-table" id="results-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Credits</th>
              <th>Internal (40)</th>
              <th>External (60)</th>
              <th>Total (100)</th>
              <th>Grade</th>
              <th>Grade Points</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((r) => (
              <tr key={r.id} id={r.id}>
                <td>{r.code}</td>
                <td>{r.name}</td>
                <td>{r.credits}</td>
                <td>{r.internal}</td>
                <td>{r.external}</td>
                <td>{r.total}</td>
                <td>
                  <span className={`chip chip--${gradeChip(r.grade)}`}>{r.grade}</span>
                </td>
                <td>{r.gp}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ── Summary Row ── */}
        <div style={{ marginTop: '1rem' }}>
          <div className="summary-row" id="summary-credits">
            <span className="summary-row__label">Total Credits</span>
            <span className="summary-row__value">{totalCredits}</span>
          </div>
          <div className="summary-row" id="summary-sgpa">
            <span className="summary-row__label">SGPA</span>
            <span className="summary-row__value summary-row__value--primary">{sgpa}</span>
          </div>
          <div className="summary-row" id="summary-result">
            <span className="summary-row__label">Result</span>
            <span className={`summary-row__value summary-row__value--${allPassed ? 'success' : 'error'}`}>
              {allPassed ? 'PASS' : 'FAIL'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Semester-wise Performance Chart ── */}
      <div className="section-panel" id="performance-chart-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">bar_chart</span>
          <h2>Semester-wise Performance</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={semesterPerformance} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semester" />
            <YAxis domain={[0, 10]} />
            <Tooltip formatter={(v) => [v, 'SGPA']} />
            <Legend />
            <Bar dataKey="sgpa" fill="#a43700" name="SGPA" radius={[4,4,0,0]} barSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  )
}
