// ══════════════════════════════════════════════════════════════════════
// SuperAdminCoursesPage.jsx — Course Management
// Data: fetched from /api/courses
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'
import apiClient from '../../services/apiClient'


const departmentOptions = [
  { value: '', label: 'All Departments' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Mechanical Engg', label: 'Mechanical Engg' },
  { value: 'ECE', label: 'ECE' },
  { value: 'Civil Engg', label: 'Civil Engg' },
  { value: 'MBA', label: 'MBA' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Chemistry', label: 'Chemistry' },
]

const semesterOptions = [
  { value: '', label: 'All Semesters' },
  ...Array.from({ length: 8 }, (_, i) => ({
    value: String(i + 1),
    label: `Semester ${i + 1}`,
  })),
]

const deptSelectList = [
  'Computer Science', 'Mechanical Engg', 'ECE', 'Civil Engg',
  'MBA', 'Physics', 'Mathematics', 'Chemistry',
]

const statusChipClass = (status) => {
  switch (status) {
    case 'Active':   return 'chip chip--success'
    case 'Inactive': return 'chip chip--error'
    default:         return 'chip chip--neutral'
  }
}

export default function SuperAdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  const [semFilter, setSemFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [coursesData, setCoursesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/courses')
      .then(res => { if (!cancelled) setCoursesData(Array.isArray(res.data) ? res.data : []) })
      .catch(() => { if (!cancelled) setError('Failed to load courses') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  /* ── Filter logic ── */
  const filteredCourses = useMemo(() => {
    return coursesData.filter((c) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        (c.code ?? '').toLowerCase().includes(q) ||
        (c.name ?? '').toLowerCase().includes(q) ||
        (c.faculty ?? c.assignedFaculty ?? '').toLowerCase().includes(q)
      const matchesDept = !deptFilter || c.department === deptFilter
      const matchesSem = !semFilter || c.semester === Number(semFilter)
      return matchesSearch && matchesDept && matchesSem
    })
  }, [searchQuery, deptFilter, semFilter, coursesData])

  return (
    <DashboardLayout>
      <div id="super-admin-courses-page">
        {/* ── Page Header ── */}
        <div className="page-header" id="courses-page-header">
          <h1>Course Management</h1>
          <p>Browse, add, and manage courses offered across all departments and semesters.</p>
        </div>

        {/* ── Toolbar ── */}
        <div className="toolbar" id="courses-toolbar">
          <SearchBar
            placeholder="Search courses…"
            value={searchQuery}
            onChange={setSearchQuery}
            id="courses-search"
          />
          <FilterDropdown
            label="Dept"
            options={departmentOptions}
            value={deptFilter}
            onChange={setDeptFilter}
            id="courses-dept-filter"
          />
          <FilterDropdown
            label="Sem"
            options={semesterOptions}
            value={semFilter}
            onChange={setSemFilter}
            id="courses-sem-filter"
          />
          <button
            className="btn btn-primary"
            id="add-course-btn"
            onClick={() => setShowModal(true)}
          >
            <span className="material-symbols-rounded">add</span>
            Add Course
          </button>
        </div>

        {/* ── Data Table ── */}
        <div className="section-panel" id="courses-table-panel">
          {loading ? (
            <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading…</p>
          ) : error ? (
            <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-error)' }}>{error}</p>
          ) : filteredCourses.length === 0 ? (
            <EmptyState icon="menu_book" title="No courses found" message="No courses returned from server yet." id="courses-empty" />
          ) : (
            <table className="data-table" id="courses-data-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Department</th>
                  <th>Credits</th>
                  <th>Semester</th>
                  <th>Faculty</th>
                  <th>Enrolled</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, i) => (
                  <tr key={course.courseId ?? course.id ?? i} id={`course-${course.courseId ?? i}`}>
                    <td><span className="chip chip--neutral">{course.code ?? course.courseCode ?? '—'}</span></td>
                    <td style={{ fontWeight: 600 }}>{course.name ?? course.courseName}</td>
                    <td>{course.department ?? course.departmentName ?? '—'}</td>
                    <td>{course.credits ?? '—'}</td>
                    <td>{course.semester ?? '—'}</td>
                    <td>{course.faculty ?? course.assignedFaculty ?? '—'}</td>
                    <td>{course.enrolled ?? course.enrolledCount ?? '—'}</td>
                    <td><span className={statusChipClass(course.status ?? 'Active')}>{course.status ?? 'Active'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Add Course Modal ── */}
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title="Add New Course"
          id="add-course-modal"
        >
          <form onSubmit={(e) => { e.preventDefault(); setShowModal(false) }}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="course-code">Course Code</label>
                <input type="text" id="course-code" placeholder="e.g. CS801" required />
              </div>
              <div className="form-group">
                <label htmlFor="course-name">Course Name</label>
                <input type="text" id="course-name" placeholder="e.g. Cloud Computing" required />
              </div>
              <div className="form-group">
                <label htmlFor="course-dept">Department</label>
                <select id="course-dept" required>
                  <option value="">Select department</option>
                  {deptSelectList.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="course-credits">Credits</label>
                <input type="number" id="course-credits" min={1} max={6} placeholder="e.g. 4" required />
              </div>
              <div className="form-group">
                <label htmlFor="course-semester">Semester</label>
                <select id="course-semester" required>
                  <option value="">Select semester</option>
                  {Array.from({ length: 8 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="course-faculty">Assigned Faculty</label>
                <input type="text" id="course-faculty" placeholder="Faculty name" />
              </div>
              <div className="form-group form-group--full">
                <label htmlFor="course-desc">Description</label>
                <textarea
                  id="course-desc"
                  rows={3}
                  placeholder="Brief course description…"
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create Course</button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
