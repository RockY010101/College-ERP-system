// ══════════════════════════════════════════════════════════════════════
// AdminStudentsPage.jsx — Student Directory for Admin module
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'

/* ── Static Data ── */
const students = [
  { id: 's-1', rollNo: 'CSE2024001', firstName: 'Aarav', lastName: 'Sharma', department: 'Computer Science', semester: 4, email: 'aarav.sharma@college.edu', phone: '9876543210', status: 'Active' },
  { id: 's-2', rollNo: 'ECE2024012', firstName: 'Priya', lastName: 'Patel', department: 'Electronics', semester: 4, email: 'priya.patel@college.edu', phone: '9823456781', status: 'Active' },
  { id: 's-3', rollNo: 'ME2023045', firstName: 'Rohan', lastName: 'Mehta', department: 'Mechanical', semester: 6, email: 'rohan.mehta@college.edu', phone: '9812345678', status: 'Active' },
  { id: 's-4', rollNo: 'CSE2024003', firstName: 'Sneha', lastName: 'Iyer', department: 'Computer Science', semester: 4, email: 'sneha.iyer@college.edu', phone: '9845671234', status: 'Active' },
  { id: 's-5', rollNo: 'CE2022078', firstName: 'Karan', lastName: 'Desai', department: 'Civil', semester: 8, email: 'karan.desai@college.edu', phone: '9867891234', status: 'Alumni' },
  { id: 's-6', rollNo: 'ECE2023020', firstName: 'Ananya', lastName: 'Reddy', department: 'Electronics', semester: 6, email: 'ananya.reddy@college.edu', phone: '9834567890', status: 'Active' },
  { id: 's-7', rollNo: 'CSE2025010', firstName: 'Vikram', lastName: 'Singh', department: 'Computer Science', semester: 2, email: 'vikram.singh@college.edu', phone: '9801234567', status: 'Active' },
  { id: 's-8', rollNo: 'ME2024033', firstName: 'Divya', lastName: 'Nair', department: 'Mechanical', semester: 4, email: 'divya.nair@college.edu', phone: '9856781234', status: 'Inactive' },
  { id: 's-9', rollNo: 'CE2024056', firstName: 'Arjun', lastName: 'Gupta', department: 'Civil', semester: 4, email: 'arjun.gupta@college.edu', phone: '9823451234', status: 'Active' },
  { id: 's-10', rollNo: 'CSE2022002', firstName: 'Meera', lastName: 'Joshi', department: 'Computer Science', semester: 8, email: 'meera.joshi@college.edu', phone: '9878901234', status: 'Alumni' },
]

const departmentOptions = [
  { value: '', label: 'All Departments' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Mechanical', label: 'Mechanical' },
  { value: 'Civil', label: 'Civil' },
]

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
    case 'Active': return 'chip chip--success'
    case 'Inactive': return 'chip chip--error'
    case 'Alumni': return 'chip chip--neutral'
    default: return 'chip'
  }
}

/* ── Component ── */
export default function AdminStudentsPage() {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  const [semFilter, setSemFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const q = search.toLowerCase()
      const matchesSearch = !q || s.firstName.toLowerCase().includes(q) || s.lastName.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
      const matchesDept = !deptFilter || s.department === deptFilter
      const matchesSem = !semFilter || s.semester === Number(semFilter)
      const matchesStatus = !statusFilter || s.status === statusFilter
      return matchesSearch && matchesDept && matchesSem && matchesStatus
    })
  }, [search, deptFilter, semFilter, statusFilter])

  return (
    <DashboardLayout>
      <div id="admin-students-page">
        {/* ── Page Header ── */}
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

        {/* ── Toolbar ── */}
        <div className="toolbar" id="students-toolbar">
          <SearchBar placeholder="Search by name, roll no…" value={search} onChange={setSearch} id="students-search" />
          <FilterDropdown label="Dept" options={departmentOptions} value={deptFilter} onChange={setDeptFilter} id="students-dept-filter" />
          <FilterDropdown label="Sem" options={semesterOptions} value={semFilter} onChange={setSemFilter} id="students-sem-filter" />
          <FilterDropdown label="Status" options={statusOptions} value={statusFilter} onChange={setStatusFilter} id="students-status-filter" />
        </div>

        {/* ── Data Table ── */}
        {filtered.length === 0 ? (
          <EmptyState icon="school" title="No students found" message="Try adjusting your search or filter criteria." id="students-empty" />
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
                {filtered.map((s) => (
                  <tr key={s.id} id={s.id}>
                    <td><strong>{s.rollNo}</strong></td>
                    <td>{s.firstName} {s.lastName}</td>
                    <td>{s.department}</td>
                    <td>Sem {s.semester}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                    <td><span className={chipVariant(s.status)}>{s.status}</span></td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title="View student" id={`view-${s.id}`}>
                          <span className="material-symbols-rounded">visibility</span>
                        </button>
                        <button className="btn-icon" title="Edit student" id={`edit-${s.id}`}>
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

        {/* ── Add Student Modal ── */}
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
              <select id="student-dept">
                <option value="">Select department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
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
            <div className="form-group">
              <label htmlFor="student-gender">Gender</label>
              <select id="student-gender">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group form-group--full">
              <label htmlFor="student-address">Address</label>
              <textarea id="student-address" rows="3" placeholder="Full postal address" />
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
