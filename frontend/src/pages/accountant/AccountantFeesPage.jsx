// ══════════════════════════════════════════════════════════════════════
// AccountantFeesPage.jsx — Fee Structure Management
// Data: GET /api/accountant/fees
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'
import apiClient from '../../services/apiClient'

const semesterOptions = [
  { value: '', label: 'All Semesters' },
  ...Array.from({ length: 8 }, (_, i) => ({ value: String(i + 1), label: `Semester ${i + 1}` })),
]

export default function AccountantFeesPage() {
  const [feeHeads, setFeeHeads]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [courseFilter, setCourseFilter] = useState('')
  const [semFilter, setSemFilter]       = useState('')
  const [modalOpen, setModalOpen]       = useState(false)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/accountant/fees')
      .then(res => { if (!cancelled) setFeeHeads(Array.isArray(res.data) ? res.data : (res.data?.feeHeads ?? [])) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Dynamic course options
  const courseOptions = useMemo(() => {
    const courses = [...new Set(feeHeads.map(f => f.course ?? f.courseName).filter(Boolean))]
    return [{ value: '', label: 'All Courses' }, ...courses.map(c => ({ value: c, label: c }))]
  }, [feeHeads])

  const filtered = useMemo(() => feeHeads.filter(f => {
    if (courseFilter && (f.course ?? f.courseName) !== courseFilter) return false
    if (semFilter && String(f.semester) !== semFilter) return false
    return true
  }), [feeHeads, courseFilter, semFilter])

  return (
    <DashboardLayout>
      <div className="page-header" id="fees-page-header">
        <h1>Fee Structure</h1>
        <p>Manage fee heads, amounts, and due dates across courses</p>
      </div>

      <div className="toolbar" id="fees-toolbar">
        <FilterDropdown label="Course" options={courseOptions} value={courseFilter} onChange={setCourseFilter} id="filter-course" />
        <FilterDropdown label="Semester" options={semesterOptions} value={semFilter} onChange={setSemFilter} id="filter-semester" />
        <button className="btn btn-primary" id="btn-add-fee-head" onClick={() => setModalOpen(true)}>
          <span className="material-symbols-rounded">add</span>
          Add Fee Head
        </button>
      </div>

      <div className="section-panel" id="fee-heads-panel">
        <div className="section-panel__header">
          <h2>Fee Heads ({filtered.length})</h2>
        </div>
        <table className="data-table" id="fee-heads-table">
          <thead>
            <tr>
              <th>Fee Head</th>
              <th>Course</th>
              <th>Semester</th>
              <th>Amount (₹)</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>No fee records available yet.</td></tr>
            ) : (
              filtered.map((f, i) => (
                <tr key={f.id ?? f.feeId ?? i} id={`fh-${i}`}>
                  <td>{f.name ?? f.feeHead ?? f.feeName ?? '—'}</td>
                  <td>{f.course ?? f.courseName ?? '—'}</td>
                  <td>{f.semester ? `Sem ${f.semester}` : '—'}</td>
                  <td>₹{f.amount ?? f.feeAmount ?? '—'}</td>
                  <td>{f.dueDate ?? f.dueDateStr ?? '—'}</td>
                  <td>
                    <span className={`chip chip--${f.status === 'Active' ? 'success' : 'neutral'}`}>
                      {f.status ?? '—'}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn-icon" title="Edit" id={`edit-fh-${i}`}>
                        <span className="material-symbols-rounded">edit</span>
                      </button>
                      <button className="btn-icon btn-icon--danger" title="Delete" id={`delete-fh-${i}`}>
                        <span className="material-symbols-rounded">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Fee Head" id="add-fee-head-modal">
        <form onSubmit={(e) => { e.preventDefault(); setModalOpen(false) }}>
          <div className="form-grid">
            <div className="form-group form-group--full">
              <label htmlFor="fee-name">Fee Head Name</label>
              <input type="text" id="fee-name" placeholder="e.g. Tuition Fee" />
            </div>
            <div className="form-group">
              <label htmlFor="fee-course">Course</label>
              <input type="text" id="fee-course" placeholder="e.g. B.Tech" />
            </div>
            <div className="form-group">
              <label htmlFor="fee-semester">Semester</label>
              <select id="fee-semester">
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fee-amount">Amount (₹)</label>
              <input type="number" id="fee-amount" placeholder="e.g. 75000" />
            </div>
            <div className="form-group">
              <label htmlFor="fee-due-date">Due Date</label>
              <input type="date" id="fee-due-date" />
            </div>
            <div className="form-group form-group--full">
              <label htmlFor="fee-description">Description</label>
              <textarea id="fee-description" rows={3} placeholder="Brief description…" />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Fee Head</button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}
