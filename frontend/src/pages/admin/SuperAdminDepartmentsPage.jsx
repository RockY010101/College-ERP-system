// ══════════════════════════════════════════════════════════════════════
// SuperAdminDepartmentsPage.jsx — Department Management for Super Admin
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'

/* ── Mock Data ── */
const departmentsData = [
  { id: 'dept-cs', name: 'Computer Science', code: 'CS', hod: 'Dr. Ramesh Kumar', students: 310, faculty: 18, status: 'Active' },
  { id: 'dept-me', name: 'Mechanical Engineering', code: 'ME', hod: 'Dr. Sunita Verma', students: 275, faculty: 15, status: 'Active' },
  { id: 'dept-ece', name: 'Electronics & Communication', code: 'ECE', hod: 'Dr. Anil Hegde', students: 260, faculty: 14, status: 'Active' },
  { id: 'dept-ce', name: 'Civil Engineering', code: 'CE', hod: 'Dr. Prakash Rao', students: 198, faculty: 12, status: 'Active' },
  { id: 'dept-mba', name: 'Business Administration', code: 'MBA', hod: 'Prof. Ajay Nair', students: 180, faculty: 11, status: 'Active' },
  { id: 'dept-phy', name: 'Physics', code: 'PHY', hod: 'Dr. Kavita Joshi', students: 142, faculty: 10, status: 'Under Review' },
  { id: 'dept-math', name: 'Mathematics', code: 'MATH', hod: 'Dr. Sanjay Rao', students: 120, faculty: 9, status: 'Active' },
  { id: 'dept-chem', name: 'Chemistry', code: 'CHEM', hod: 'Dr. Lakshmi Menon', students: 105, faculty: 8, status: 'Inactive' },
]

const hodOptions = [
  'Dr. Ramesh Kumar', 'Dr. Sunita Verma', 'Dr. Anil Hegde',
  'Dr. Prakash Rao', 'Prof. Ajay Nair', 'Dr. Kavita Joshi',
  'Dr. Sanjay Rao', 'Dr. Lakshmi Menon', 'Dr. Ravi Bhat',
  'Dr. Pooja Kulkarni',
]

const statusChipClass = (status) => {
  switch (status) {
    case 'Active':       return 'chip chip--success'
    case 'Under Review': return 'chip chip--primary'
    case 'Inactive':     return 'chip chip--error'
    default:             return 'chip chip--neutral'
  }
}

export default function SuperAdminDepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)

  /* ── Filter logic ── */
  const filteredDepts = useMemo(() => {
    if (!searchQuery) return departmentsData
    const q = searchQuery.toLowerCase()
    return departmentsData.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.hod.toLowerCase().includes(q)
    )
  }, [searchQuery])

  return (
    <DashboardLayout>
      <div id="super-admin-departments-page">
        {/* ── Page Header ── */}
        <div className="page-header" id="departments-page-header">
          <h1>Departments</h1>
          <p>Manage academic and administrative departments across the institution.</p>
        </div>

        {/* ── Toolbar ── */}
        <div className="toolbar" id="departments-toolbar">
          <SearchBar
            placeholder="Search departments…"
            value={searchQuery}
            onChange={setSearchQuery}
            id="departments-search"
          />
          <button
            className="btn btn-primary"
            id="add-department-btn"
            onClick={() => setShowModal(true)}
          >
            <span className="material-symbols-rounded">add</span>
            Add Department
          </button>
        </div>

        {/* ── Data Table ── */}
        <div className="section-panel" id="departments-table-panel">
          {filteredDepts.length === 0 ? (
            <EmptyState
              icon="domain_disabled"
              title="No departments found"
              message="Try adjusting your search criteria."
              id="departments-empty"
            />
          ) : (
            <table className="data-table" id="departments-data-table">
              <thead>
                <tr>
                  <th>Department Name</th>
                  <th>Code</th>
                  <th>HOD</th>
                  <th>Students</th>
                  <th>Faculty</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepts.map((dept) => (
                  <tr key={dept.id} id={dept.id}>
                    <td style={{ fontWeight: 600 }}>{dept.name}</td>
                    <td>
                      <span className="chip chip--neutral">{dept.code}</span>
                    </td>
                    <td>{dept.hod}</td>
                    <td>{dept.students}</td>
                    <td>{dept.faculty}</td>
                    <td>
                      <span className={statusChipClass(dept.status)}>{dept.status}</span>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title="Edit department" id={`edit-${dept.id}`}>
                          <span className="material-symbols-rounded">edit</span>
                        </button>
                        <button className="btn-icon btn-icon--danger" title="Delete department" id={`delete-${dept.id}`}>
                          <span className="material-symbols-rounded">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Add Department Modal ── */}
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title="Add New Department"
          id="add-department-modal"
        >
          <form onSubmit={(e) => { e.preventDefault(); setShowModal(false) }}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="dept-name">Department Name</label>
                <input type="text" id="dept-name" placeholder="e.g. Information Technology" required />
              </div>
              <div className="form-group">
                <label htmlFor="dept-code">Department Code</label>
                <input type="text" id="dept-code" placeholder="e.g. IT" required />
              </div>
              <div className="form-group form-group--full">
                <label htmlFor="dept-hod">Head of Department</label>
                <select id="dept-hod" required>
                  <option value="">Select HOD</option>
                  {hodOptions.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div className="form-group form-group--full">
                <label htmlFor="dept-description">Description</label>
                <textarea
                  id="dept-description"
                  rows={3}
                  placeholder="Brief description of the department…"
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create Department</button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
