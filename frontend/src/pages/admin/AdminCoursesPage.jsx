// ══════════════════════════════════════════════════════════════════════
// AdminCoursesPage.jsx — Course Management
// Data: GET /api/courses
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'
import apiClient from '../../services/apiClient'

const chipVariant = (status) => {
  switch (status) {
    case 'Active':   return 'chip chip--success'
    case 'Inactive': return 'chip chip--neutral'
    default:         return 'chip'
  }
}

export default function AdminCoursesPage() {
  const [courses, setCourses]         = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [search, setSearch]           = useState('')
  const [deptFilter, setDeptFilter]   = useState('')
  const [modalOpen, setModalOpen]     = useState(false)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/courses')
      .then(res => { if (!cancelled) setCourses(Array.isArray(res.data) ? res.data : []) })
      .catch(() => { if (!cancelled) setError('Failed to load courses') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Build dept options dynamically
  const departmentOptions = useMemo(() => {
    const depts = [...new Set(courses.map(c => c.department ?? c.departmentName).filter(Boolean))]
    return [{ value: '', label: 'All Departments' }, ...depts.map(d => ({ value: d, label: d }))]
  }, [courses])

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const q = search.toLowerCase()
      const matchesSearch = !q || (c.name ?? c.courseName ?? '').toLowerCase().includes(q) || (c.code ?? c.courseCode ?? '').toLowerCase().includes(q) || (c.faculty ?? c.assignedFaculty ?? '').toLowerCase().includes(q)
      const matchesDept   = !deptFilter || (c.department ?? c.departmentName) === deptFilter
      return matchesSearch && matchesDept
    })
  }, [courses, search, deptFilter])

  return (
    <DashboardLayout>
      <div id="admin-courses-page">
        <div className="page-header-row">
          <div className="page-header">
            <h1>Course Management</h1>
            <p>Create, edit, and manage courses offered across all departments.</p>
          </div>
          <button className="btn btn-primary" id="add-course-btn" onClick={() => setModalOpen(true)}>
            <span className="material-symbols-rounded">add</span>
            Add Course
          </button>
        </div>

        <div className="toolbar" id="courses-toolbar">
          <SearchBar placeholder="Search by course name, code, faculty…" value={search} onChange={setSearch} id="courses-search" />
          <FilterDropdown label="Dept" options={departmentOptions} value={deptFilter} onChange={setDeptFilter} id="courses-dept-filter" />
        </div>

        {loading ? (
          <div className="section-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading courses…</div>
        ) : error ? (
          <div className="section-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-error)' }}>{error}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon="menu_book" title="No courses found" message="No course records available yet." id="courses-empty" />
        ) : (
          <div className="section-panel" id="courses-table-panel">
            <table className="data-table" id="courses-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Credits</th>
                  <th>Assigned Faculty</th>
                  <th>Enrollment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.courseId ?? c.id ?? i} id={`course-${c.courseId ?? i}`}>
                    <td><strong>{c.code ?? c.courseCode ?? '—'}</strong></td>
                    <td>{c.name ?? c.courseName ?? '—'}</td>
                    <td>{c.department ?? c.departmentName ?? '—'}</td>
                    <td>{c.credits ?? '—'}</td>
                    <td>{c.faculty ?? c.assignedFaculty ?? '—'}</td>
                    <td>{c.enrollment ?? c.enrolledCount ?? '—'}</td>
                    <td><span className={chipVariant(c.status ?? 'Active')}>{c.status ?? 'Active'}</span></td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title="View course" id={`view-course-${c.courseId ?? i}`}>
                          <span className="material-symbols-rounded">visibility</span>
                        </button>
                        <button className="btn-icon" title="Edit course" id={`edit-course-${c.courseId ?? i}`}>
                          <span className="material-symbols-rounded">edit</span>
                        </button>
                        <button className="btn-icon btn-icon--danger" title="Delete course" id={`delete-course-${c.courseId ?? i}`}>
                          <span className="material-symbols-rounded">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Course" id="add-course-modal">
          <form className="form-grid" id="add-course-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="course-code">Course Code</label>
              <input type="text" id="course-code" placeholder="e.g. CS601" />
            </div>
            <div className="form-group">
              <label htmlFor="course-name">Course Name</label>
              <input type="text" id="course-name" placeholder="e.g. Machine Learning" />
            </div>
            <div className="form-group">
              <label htmlFor="course-dept">Department</label>
              <input type="text" id="course-dept" placeholder="e.g. Computer Science" />
            </div>
            <div className="form-group">
              <label htmlFor="course-credits">Credits</label>
              <select id="course-credits">
                <option value="">Select credits</option>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="course-semester">Semester</label>
              <select id="course-semester">
                <option value="">Select semester</option>
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                ))}
              </select>
            </div>
            <div className="form-group form-group--full">
              <label htmlFor="course-desc">Description</label>
              <textarea id="course-desc" rows="3" placeholder="Brief course description" />
            </div>
            <div className="form-actions form-group--full">
              <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Course</button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
