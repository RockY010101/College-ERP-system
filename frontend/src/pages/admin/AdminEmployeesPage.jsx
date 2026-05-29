// ══════════════════════════════════════════════════════════════════════
// AdminEmployeesPage.jsx — Employee Directory (Faculty + Staff)
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'

/* ── Static Data ── */
const employees = [
  { id: 'e-1', empId: 'FAC2019001', firstName: 'Dr. Raghav', lastName: 'Menon', department: 'Computer Science', designation: 'Professor', email: 'raghav.menon@college.edu', phone: '9876001234', status: 'Active' },
  { id: 'e-2', empId: 'FAC2020014', firstName: 'Dr. Sunita', lastName: 'Verma', department: 'Electronics', designation: 'Assoc. Professor', email: 'sunita.verma@college.edu', phone: '9876002345', status: 'Active' },
  { id: 'e-3', empId: 'FAC2021008', firstName: 'Amit', lastName: 'Kulkarni', department: 'Mechanical', designation: 'Asst. Professor', email: 'amit.kulkarni@college.edu', phone: '9876003456', status: 'Active' },
  { id: 'e-4', empId: 'FAC2018022', firstName: 'Dr. Lakshmi', lastName: 'Narayan', department: 'Civil', designation: 'Professor', email: 'lakshmi.narayan@college.edu', phone: '9876004567', status: 'Active' },
  { id: 'e-5', empId: 'STF2020035', firstName: 'Rajesh', lastName: 'Kumar', department: 'Computer Science', designation: 'Lab Assistant', email: 'rajesh.kumar@college.edu', phone: '9876005678', status: 'Active' },
  { id: 'e-6', empId: 'FAC2022011', firstName: 'Neha', lastName: 'Saxena', department: 'Computer Science', designation: 'Asst. Professor', email: 'neha.saxena@college.edu', phone: '9876006789', status: 'Active' },
  { id: 'e-7', empId: 'STF2019042', firstName: 'Suresh', lastName: 'Babu', department: 'Administration', designation: 'Office Staff', email: 'suresh.babu@college.edu', phone: '9876007890', status: 'Inactive' },
  { id: 'e-8', empId: 'FAC2023005', firstName: 'Dr. Pooja', lastName: 'Bhatt', department: 'Electronics', designation: 'Asst. Professor', email: 'pooja.bhatt@college.edu', phone: '9876008901', status: 'Active' },
]

const departmentOptions = [
  { value: '', label: 'All Departments' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Mechanical', label: 'Mechanical' },
  { value: 'Civil', label: 'Civil' },
  { value: 'Administration', label: 'Administration' },
]

const designationOptions = [
  { value: '', label: 'All Designations' },
  { value: 'Professor', label: 'Professor' },
  { value: 'Assoc. Professor', label: 'Assoc. Professor' },
  { value: 'Asst. Professor', label: 'Asst. Professor' },
  { value: 'Lab Assistant', label: 'Lab Assistant' },
  { value: 'Office Staff', label: 'Office Staff' },
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
]

const chipVariant = (status) => {
  switch (status) {
    case 'Active': return 'chip chip--success'
    case 'Inactive': return 'chip chip--error'
    default: return 'chip'
  }
}

/* ── Component ── */
export default function AdminEmployeesPage() {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  const [desigFilter, setDesigFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const q = search.toLowerCase()
      const matchesSearch = !q || e.firstName.toLowerCase().includes(q) || e.lastName.toLowerCase().includes(q) || e.empId.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)
      const matchesDept = !deptFilter || e.department === deptFilter
      const matchesDesig = !desigFilter || e.designation === desigFilter
      const matchesStatus = !statusFilter || e.status === statusFilter
      return matchesSearch && matchesDept && matchesDesig && matchesStatus
    })
  }, [search, deptFilter, desigFilter, statusFilter])

  return (
    <DashboardLayout>
      <div id="admin-employees-page">
        {/* ── Page Header ── */}
        <div className="page-header-row">
          <div className="page-header">
            <h1>Employee Directory</h1>
            <p>Manage faculty members and administrative staff across all departments.</p>
          </div>
          <button className="btn btn-primary" id="add-employee-btn" onClick={() => setModalOpen(true)}>
            <span className="material-symbols-rounded">person_add</span>
            Add Employee
          </button>
        </div>

        {/* ── Toolbar ── */}
        <div className="toolbar" id="employees-toolbar">
          <SearchBar placeholder="Search by name, ID, email…" value={search} onChange={setSearch} id="employees-search" />
          <FilterDropdown label="Dept" options={departmentOptions} value={deptFilter} onChange={setDeptFilter} id="employees-dept-filter" />
          <FilterDropdown label="Role" options={designationOptions} value={desigFilter} onChange={setDesigFilter} id="employees-desig-filter" />
          <FilterDropdown label="Status" options={statusOptions} value={statusFilter} onChange={setStatusFilter} id="employees-status-filter" />
        </div>

        {/* ── Data Table ── */}
        {filtered.length === 0 ? (
          <EmptyState icon="groups" title="No employees found" message="Try adjusting your search or filter criteria." id="employees-empty" />
        ) : (
          <div className="section-panel" id="employees-table-panel">
            <table className="data-table" id="employees-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id} id={e.id}>
                    <td><strong>{e.empId}</strong></td>
                    <td>{e.firstName} {e.lastName}</td>
                    <td>{e.department}</td>
                    <td>{e.designation}</td>
                    <td>{e.email}</td>
                    <td>{e.phone}</td>
                    <td><span className={chipVariant(e.status)}>{e.status}</span></td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title="View employee" id={`view-${e.id}`}>
                          <span className="material-symbols-rounded">visibility</span>
                        </button>
                        <button className="btn-icon" title="Edit employee" id={`edit-${e.id}`}>
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

        {/* ── Add Employee Modal ── */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Employee" id="add-employee-modal">
          <form className="form-grid" id="add-employee-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="emp-id">Employee ID</label>
              <input type="text" id="emp-id" placeholder="e.g. FAC2026001" />
            </div>
            <div className="form-group">
              <label htmlFor="emp-fname">First Name</label>
              <input type="text" id="emp-fname" placeholder="First name" />
            </div>
            <div className="form-group">
              <label htmlFor="emp-lname">Last Name</label>
              <input type="text" id="emp-lname" placeholder="Last name" />
            </div>
            <div className="form-group">
              <label htmlFor="emp-email">Email</label>
              <input type="email" id="emp-email" placeholder="employee@college.edu" />
            </div>
            <div className="form-group">
              <label htmlFor="emp-phone">Phone</label>
              <input type="tel" id="emp-phone" placeholder="10-digit mobile" />
            </div>
            <div className="form-group">
              <label htmlFor="emp-dept">Department</label>
              <select id="emp-dept">
                <option value="">Select department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Administration">Administration</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="emp-designation">Designation</label>
              <select id="emp-designation">
                <option value="">Select designation</option>
                <option value="Professor">Professor</option>
                <option value="Assoc. Professor">Assoc. Professor</option>
                <option value="Asst. Professor">Asst. Professor</option>
                <option value="Lab Assistant">Lab Assistant</option>
                <option value="Office Staff">Office Staff</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="emp-dob">Date of Birth</label>
              <input type="date" id="emp-dob" />
            </div>
            <div className="form-group">
              <label htmlFor="emp-doj">Date of Joining</label>
              <input type="date" id="emp-doj" />
            </div>
            <div className="form-group">
              <label htmlFor="emp-gender">Gender</label>
              <select id="emp-gender">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group form-group--full">
              <label htmlFor="emp-qualification">Qualification</label>
              <input type="text" id="emp-qualification" placeholder="e.g. Ph.D. Computer Science" />
            </div>
            <div className="form-actions form-group--full">
              <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Employee</button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
