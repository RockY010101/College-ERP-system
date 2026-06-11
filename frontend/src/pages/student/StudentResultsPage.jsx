// ══════════════════════════════════════════════════════════════════════
// StudentResultsPage.jsx — Full Results View
// Data: GET /api/student/results
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import apiClient from '../../services/apiClient'

const gradeChip = (grade) => {
  if (grade === 'O')                   return 'success'
  if (grade === 'A+' || grade === 'A') return 'primary'
  return 'neutral'
}

const noDataRow = (cols, msg = 'No data available yet.') => (
  <tr><td colSpan={cols} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>{msg}</td></tr>
)

export default function StudentResultsPage() {
  const [allResults, setAllResults]         = useState({})
  const [performance, setPerformance]       = useState([])
  const [cumulative, setCumulative]         = useState(null)
  const [loading, setLoading]               = useState(true)
  const [semesterFilter, setSemesterFilter] = useState('')

  useEffect(() => {
    let cancelled = false
    apiClient.get('/student/results')
      .then(res => {
        if (!cancelled && res.data) {
          const d = res.data
          // Support: { bySemester: { '1': [...], '2': [...] }, performance: [...], cumulative: {...} }
          // or plain array of results
          if (Array.isArray(d)) {
            setAllResults({ all: d })
            setSemesterFilter('all')
          } else {
            setAllResults(d.bySemester ?? {})
            setPerformance(Array.isArray(d.performance) ? d.performance : [])
            setCumulative(d.cumulative ?? null)
            const keys = Object.keys(d.bySemester ?? {})
            if (keys.length > 0) setSemesterFilter(keys[keys.length - 1])
          }
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const semesterOptions = useMemo(() => {
    const keys = Object.keys(allResults)
    if (keys.length === 0) return [{ value: '', label: 'All Semesters' }]
    return keys.map(k => ({ value: k, label: k === 'all' ? 'All' : `Semester ${k}` }))
  }, [allResults])

  const subjects     = (semesterFilter ? allResults[semesterFilter] : []) ?? []
  const totalCredits = subjects.reduce((s, r) => s + (r.credits ?? 0), 0)
  const sgpa         = subjects.length && totalCredits > 0
    ? (subjects.reduce((s, r) => s + (r.credits ?? 0) * (r.gp ?? 0), 0) / totalCredits).toFixed(2)
    : '—'
  const allPassed    = subjects.length > 0 && subjects.every(r => (r.total ?? 0) >= 40)

  return (
    <DashboardLayout>
      <div className="page-header" id="results-page-header">
        <h1>My Results</h1>
        <p>View detailed semester-wise examination results and performance</p>
      </div>

      {/* ── Toolbar ── */}
      <div className="toolbar" id="results-toolbar">
        <FilterDropdown label="Semester" options={semesterOptions} value={semesterFilter} onChange={setSemesterFilter} id="filter-result-semester" />
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
            <span className="stat-card__delta">{semesterFilter ? `Semester ${semesterFilter}` : ''}</span>
          </div>
        </div>
        <div className="stat-card" id="stat-cgpa">
          <div className="stat-card__icon stat-card__icon--secondary">
            <span className="material-symbols-rounded">school</span>
          </div>
          <div className="stat-card__info">
            <span className="stat-card__label">CGPA</span>
            <span className="stat-card__value">{cumulative?.cgpa ?? '—'}</span>
            <span className="stat-card__delta">Cumulative to date</span>
          </div>
        </div>
        <div className="stat-card" id="stat-credits">
          <div className="stat-card__icon stat-card__icon--success">
            <span className="material-symbols-rounded">task_alt</span>
          </div>
          <div className="stat-card__info">
            <span className="stat-card__label">Credits Earned</span>
            <span className="stat-card__value">{cumulative?.creditsEarned != null ? `${cumulative.creditsEarned} / ${cumulative.totalCredits ?? '—'}` : '—'}</span>
            <span className="stat-card__delta">{cumulative?.creditsPct != null ? `${cumulative.creditsPct}% completed` : ''}</span>
          </div>
        </div>
      </div>

      {/* ── Results Table ── */}
      <div className="section-panel" id="results-table-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">assignment</span>
          <h2>{semesterFilter && semesterFilter !== 'all' ? `Semester ${semesterFilter} Results` : 'Results'}</h2>
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
            {loading ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>Loading…</td></tr>
            ) : subjects.length === 0 ? noDataRow(8, 'No results available yet.') : (
              subjects.map((r, i) => (
                <tr key={r.id ?? i} id={`res-${r.id ?? i}`}>
                  <td>{r.code ?? r.subjectCode ?? '—'}</td>
                  <td>{r.name ?? r.subjectName ?? '—'}</td>
                  <td>{r.credits ?? '—'}</td>
                  <td>{r.internal ?? r.internalMarks ?? '—'}</td>
                  <td>{r.external ?? r.externalMarks ?? '—'}</td>
                  <td>{r.total ?? '—'}</td>
                  <td><span className={`chip chip--${gradeChip(r.grade ?? '')}`}>{r.grade ?? '—'}</span></td>
                  <td>{r.gp ?? r.gradePoints ?? '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {subjects.length > 0 && (
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
        )}
      </div>

      {/* ── Performance Chart ── */}
      <div className="section-panel" id="performance-chart-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">bar_chart</span>
          <h2>Semester-wise Performance</h2>
        </div>
        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading…</p>
        ) : performance.length === 0 ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Performance data not available yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performance} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" />
              <YAxis domain={[0, 10]} />
              <Tooltip formatter={(v) => [v, 'SGPA']} />
              <Legend />
              <Bar dataKey="sgpa" fill="#a43700" name="SGPA" radius={[4,4,0,0]} barSize={48} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </DashboardLayout>
  )
}
