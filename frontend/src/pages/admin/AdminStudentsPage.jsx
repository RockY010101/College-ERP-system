// ══════════════════════════════════════════════════════════════════════
// AdminStudentsPage.jsx — Student Directory
// Data: GET /api/students
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'
import apiClient from '../../services/apiClient'

const semesterOptions = [
  { value: '', label: 'All Semesters' },
  ...Array.from({ length: 8 }, (_, i) => ({ value: String(i + 1), label: `Semester ${i + 1}` })),
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Alumni', label: 'Alumni' },
]

const chipVariant = (status) => {
  switch (status) {
    case 'Active':   return 'chip chip--success'
    case 'Inactive': return 'chip chip--error'
    case 'Alumni':   return 'chip chip--neutral'
    default:         return 'chip'
  }
}

export default function AdminStudentsPage() {
  const [students, setStudents]       = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [search, setSearch]           = useState('')
  const [deptFilter, setDeptFilter]   = useState('')
  const [semFilter, setSemFilter]     = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen]     = useState(false)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/students')
      .then(res => { if (!cancelled) setStudents(Array.isArray(res.data) ? res.data : []) })
      .catch(() => { if (!cancelled) setError('Failed to load students') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Build dept options dynamically from data
  const deptOptions = useMemo(() => {
    const depts = [...new Set(students.map(s => s.department).filter(Boolean))]
    return [{ value: '', label: 'All Departments' }, ...depts.map(d => ({ value: d, label: d }))]
  }, [students])

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const q = search.toLowerCase()
      const name = `${s.firstName ?? ''} ${s.lastName ?? ''} ${s.name ?? ''}`.toLowerCase()
      const matchesSearch = !q || name.includes(q) || (s.rollNo ?? s.rollNumber ?? '').toLowerCase().includes(q) || (s.email ?? '').toLowerCase().includes(q)
      const matchesDept   = !deptFilter   || s.department === deptFilter
      const matchesSem    = !semFilter    || s.semester === Number(semFilter)
      const matchesStatus = !statusFilter || s.status === statusFilter
      return matchesSearch && matchesDept && matchesSem && matchesStatus
    })
  }, [students, search, deptFilter, semFilter, statusFilter])

  return (
    <DashboardLayout>
      <div id="admin-students-page">
        <div className="page-header-row">
          <div className="page-header">
            <h1>Student Directory</h1>
            <p>View and manage all enrolled students across departments.</p>
          </div>
          <button className="btn btn-primary" id="add-student-btn" onClick={() => setModalOpen(true)}>
            <span className="material-symbols-rounded">person_add</span>
            Add Student
          </button>
        </div>

        <div className="toolbar" id="students-toolbar">
          <SearchBar placeholder="Search by name, roll no…" value={search} onChange={setSearch} id="students-search" />
          <FilterDropdown label="Dept" options={deptOptions} value={deptFilter} onChange={setDeptFilter} id="students-dept-filter" />
          <FilterDropdown label="Sem" options={semesterOptions} value={semFilter} onChange={setSemFilter} id="students-sem-filter" />
          <FilterDropdown label="Status" options={statusOptions} value={statusFilter} onChange={setStatusFilter} id="students-status-filter" />
        </div>

        {loading ? (
          <div className="section-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading students…</div>
        ) : error ? (
          <div className="section-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-error)' }}>{error}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon="school" title="No students found" message="No student records available yet." id="students-empty" />
        ) : (
          <div className="section-panel" id="students-table-panel">
            <table className="data-table" id="students-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.studentId ?? s.id ?? i} id={`student-${s.studentId ?? i}`}>
                    <td><strong>{s.rollNo ?? s.rollNumber ?? '—'}</strong></td>
                    <td>{s.name ?? `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim()}</td>
                    <td>{s.department ?? '—'}</td>
                    <td>{s.semester ? `Sem ${s.semester}` : '—'}</td>
                    <td>{s.email ?? '—'}</td>
                    <td>{s.phone ?? s.phoneNumber ?? '—'}</td>
                    <td><span className={chipVariant(s.status ?? 'Active')}>{s.status ?? 'Active'}</span></td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title="View student" id={`view-student-${s.studentId ?? i}`}>
                          <span className="material-symbols-rounded">visibility</span>
                        </button>
                        <button className="btn-icon" title="Edit student" id={`edit-student-${s.studentId ?? i}`}>
                          <span className="material-symbols-rounded">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Student" id="add-student-modal">
          <form className="form-grid" id="add-student-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="student-roll">Roll No</label>
              <input type="text" id="student-roll" placeholder="e.g. CSE2026001" />
            </div>
            <div className="form-group">
              <label htmlFor="student-fname">First Name</label>
              <input type="text" id="student-fname" placeholder="First name" />
            </div>
            <div className="form-group">
              <label htmlFor="student-lname">Last Name</label>
              <input type="text" id="student-lname" placeholder="Last name" />
            </div>
            <div className="form-group">
              <label htmlFor="student-email">Email</label>
              <input type="email" id="student-email" placeholder="student@college.edu" />
            </div>
            <div className="form-group">
              <label htmlFor="student-phone">Phone</label>
              <input type="tel" id="student-phone" placeholder="10-digit mobile" />
            </div>
            <div className="form-group">
              <label htmlFor="student-dept">Department</label>
              <input type="text" id="student-dept" placeholder="e.g. Computer Science" />
            </div>
            <div className="form-group">
              <label htmlFor="student-sem">Semester</label>
              <select id="student-sem">
                <option value="">Select semester</option>
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="student-dob">Date of Birth</label>
              <input type="date" id="student-dob" />
            </div>
            <div className="form-actions form-group--full">
              <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Student</button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
