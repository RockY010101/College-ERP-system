// ══════════════════════════════════════════════════════════════════════
// SuperAdminCoursesPage.jsx — Course Management for Super Admin
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'

/* ── Mock Data ── */
const coursesData = [
  { id: 'crs-1', code: 'CS301', name: 'Data Structures & Algorithms', department: 'Computer Science', credits: 4, semester: 3, faculty: 'Dr. Ramesh Kumar', enrolled: 72, status: 'Active' },
  { id: 'crs-2', code: 'CS502', name: 'Machine Learning', department: 'Computer Science', credits: 4, semester: 5, faculty: 'Dr. Priya Patel', enrolled: 65, status: 'Active' },
  { id: 'crs-3', code: 'CS401', name: 'Database Management Systems', department: 'Computer Science', credits: 3, semester: 4, faculty: 'Prof. Sunil Shetty', enrolled: 78, status: 'Active' },
  { id: 'crs-4', code: 'ME201', name: 'Thermodynamics', department: 'Mechanical Engg', credits: 4, semester: 2, faculty: 'Dr. Sunita Verma', enrolled: 60, status: 'Active' },
  { id: 'crs-5', code: 'ECE301', name: 'Digital Signal Processing', department: 'ECE', credits: 3, semester: 3, faculty: 'Dr. Anil Hegde', enrolled: 55, status: 'Active' },
  { id: 'crs-6', code: 'CS601', name: 'Computer Networks', department: 'Computer Science', credits: 3, semester: 6, faculty: 'Dr. Kavitha Rao', enrolled: 58, status: 'Active' },
  { id: 'crs-7', code: 'CE401', name: 'Structural Analysis', department: 'Civil Engg', credits: 4, semester: 4, faculty: 'Dr. Prakash Rao', enrolled: 45, status: 'Inactive' },
  { id: 'crs-8', code: 'MBA301', name: 'Financial Management', department: 'MBA', credits: 3, semester: 3, faculty: 'Prof. Ajay Nair', enrolled: 40, status: 'Active' },
  { id: 'crs-9', code: 'CS701', name: 'Artificial Intelligence', department: 'Computer Science', credits: 4, semester: 7, faculty: 'Dr. Ramesh Kumar', enrolled: 48, status: 'Active' },
  { id: 'crs-10', code: 'ECE501', name: 'VLSI Design', department: 'ECE', credits: 4, semester: 5, faculty: 'Dr. Meera Joshi', enrolled: 38, status: 'Inactive' },
]

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

  /* ── Filter logic ── */
  const filteredCourses = useMemo(() => {
    return coursesData.filter((c) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.faculty.toLowerCase().includes(q)
      const matchesDept = !deptFilter || c.department === deptFilter
      const matchesSem = !semFilter || c.semester === Number(semFilter)
      return matchesSearch && matchesDept && matchesSem
    })
  }, [searchQuery, deptFilter, semFilter])

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
          {filteredCourses.length === 0 ? (
            <EmptyState
              icon="menu_book"
              title="No courses found"
              message="Try adjusting your search or filter criteria."
              id="courses-empty"
            />
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
                {filteredCourses.map((course) => (
                  <tr key={course.id} id={course.id}>
                    <td>
                      <span className="chip chip--neutral">{course.code}</span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{course.name}</td>
                    <td>{course.department}</td>
                    <td>{course.credits}</td>
                    <td>{course.semester}</td>
                    <td>{course.faculty}</td>
                    <td>{course.enrolled}</td>
                    <td>
                      <span className={statusChipClass(course.status)}>{course.status}</span>
                    </td>
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
