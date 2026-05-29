// ══════════════════════════════════════════════════════════════════════
// AdminCoursesPage.jsx — Course Management for Admin module
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'

/* ── Static Data ── */
const courses = [
  { id: 'c-1', code: 'CS301', name: 'Data Structures & Algorithms', department: 'Computer Science', credits: 4, faculty: 'Dr. Raghav Menon', enrollment: 120, status: 'Active' },
  { id: 'c-2', code: 'CS302', name: 'Database Management Systems', department: 'Computer Science', credits: 4, faculty: 'Neha Saxena', enrollment: 115, status: 'Active' },
  { id: 'c-3', code: 'CS401', name: 'Operating Systems', department: 'Computer Science', credits: 4, faculty: 'Dr. Raghav Menon', enrollment: 98, status: 'Active' },
  { id: 'c-4', code: 'CS402', name: 'Computer Networks', department: 'Computer Science', credits: 3, faculty: 'Neha Saxena', enrollment: 102, status: 'Active' },
  { id: 'c-5', code: 'CS501', name: 'Software Engineering', department: 'Computer Science', credits: 3, faculty: 'Dr. Raghav Menon', enrollment: 88, status: 'Active' },
  { id: 'c-6', code: 'EC301', name: 'Signals & Systems', department: 'Electronics', credits: 4, faculty: 'Dr. Sunita Verma', enrollment: 78, status: 'Active' },
  { id: 'c-7', code: 'EC302', name: 'Digital Electronics', department: 'Electronics', credits: 3, faculty: 'Dr. Pooja Bhatt', enrollment: 82, status: 'Active' },
  { id: 'c-8', code: 'ME301', name: 'Thermodynamics', department: 'Mechanical', credits: 4, faculty: 'Amit Kulkarni', enrollment: 65, status: 'Active' },
  { id: 'c-9', code: 'CE301', name: 'Structural Analysis', department: 'Civil', credits: 4, faculty: 'Dr. Lakshmi Narayan', enrollment: 55, status: 'Active' },
  { id: 'c-10', code: 'CS201', name: 'Discrete Mathematics', department: 'Computer Science', credits: 3, faculty: 'Neha Saxena', enrollment: 130, status: 'Inactive' },
]

const departmentOptions = [
  { value: '', label: 'All Departments' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Mechanical', label: 'Mechanical' },
  { value: 'Civil', label: 'Civil' },
]

const chipVariant = (status) => {
  switch (status) {
    case 'Active': return 'chip chip--success'
    case 'Inactive': return 'chip chip--neutral'
    default: return 'chip'
  }
}

/* ── Component ── */
export default function AdminCoursesPage() {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const q = search.toLowerCase()
      const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.faculty.toLowerCase().includes(q)
      const matchesDept = !deptFilter || c.department === deptFilter
      return matchesSearch && matchesDept
    })
  }, [search, deptFilter])

  return (
    <DashboardLayout>
      <div id="admin-courses-page">
        {/* ── Page Header ── */}
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

        {/* ── Toolbar ── */}
        <div className="toolbar" id="courses-toolbar">
          <SearchBar placeholder="Search by course name, code, faculty…" value={search} onChange={setSearch} id="courses-search" />
          <FilterDropdown label="Dept" options={departmentOptions} value={deptFilter} onChange={setDeptFilter} id="courses-dept-filter" />
        </div>

        {/* ── Data Table ── */}
        {filtered.length === 0 ? (
          <EmptyState icon="menu_book" title="No courses found" message="Try adjusting your search or filter criteria." id="courses-empty" />
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
                {filtered.map((c) => (
                  <tr key={c.id} id={c.id}>
                    <td><strong>{c.code}</strong></td>
                    <td>{c.name}</td>
                    <td>{c.department}</td>
                    <td>{c.credits}</td>
                    <td>{c.faculty}</td>
                    <td>{c.enrollment}</td>
                    <td><span className={chipVariant(c.status)}>{c.status}</span></td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title="View course" id={`view-${c.id}`}>
                          <span className="material-symbols-rounded">visibility</span>
                        </button>
                        <button className="btn-icon" title="Edit course" id={`edit-${c.id}`}>
                          <span className="material-symbols-rounded">edit</span>
                        </button>
                        <button className="btn-icon btn-icon--danger" title="Delete course" id={`delete-${c.id}`}>
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

        {/* ── Add Course Modal ── */}
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
              <select id="course-dept">
                <option value="">Select department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="course-credits">Credits</label>
              <select id="course-credits">
                <option value="">Select credits</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="course-faculty">Assigned Faculty</label>
              <select id="course-faculty">
                <option value="">Select faculty</option>
                <option value="Dr. Raghav Menon">Dr. Raghav Menon</option>
                <option value="Dr. Sunita Verma">Dr. Sunita Verma</option>
                <option value="Amit Kulkarni">Amit Kulkarni</option>
                <option value="Dr. Lakshmi Narayan">Dr. Lakshmi Narayan</option>
                <option value="Neha Saxena">Neha Saxena</option>
                <option value="Dr. Pooja Bhatt">Dr. Pooja Bhatt</option>
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
