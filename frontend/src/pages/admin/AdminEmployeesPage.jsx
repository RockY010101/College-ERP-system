// ══════════════════════════════════════════════════════════════════════
// AdminEmployeesPage.jsx — Employee Directory (Faculty + Staff)
// Data: GET /api/employees
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'
import apiClient from '../../services/apiClient'

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
]

const chipVariant = (status) => {
  switch (status) {
    case 'Active':   return 'chip chip--success'
    case 'Inactive': return 'chip chip--error'
    default:         return 'chip'
  }
}

export default function AdminEmployeesPage() {
  const [employees, setEmployees]     = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [search, setSearch]           = useState('')
  const [deptFilter, setDeptFilter]   = useState('')
  const [desigFilter, setDesigFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen]     = useState(false)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/employees')
      .then(res => { if (!cancelled) setEmployees(Array.isArray(res.data) ? res.data : []) })
      .catch(() => { if (!cancelled) setError('Failed to load employees') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Build filter options dynamically from data
  const deptOptions = useMemo(() => {
    const depts = [...new Set(employees.map(e => e.department).filter(Boolean))]
    return [{ value: '', label: 'All Departments' }, ...depts.map(d => ({ value: d, label: d }))]
  }, [employees])

  const desigOptions = useMemo(() => {
    const desigs = [...new Set(employees.map(e => e.designation).filter(Boolean))]
    return [{ value: '', label: 'All Designations' }, ...desigs.map(d => ({ value: d, label: d }))]
  }, [employees])

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const q = search.toLowerCase()
      const name = `${e.firstName ?? ''} ${e.lastName ?? ''} ${e.name ?? ''}`.toLowerCase()
      const matchesSearch = !q || name.includes(q) || (e.empId ?? e.employeeId ?? '').toLowerCase().includes(q) || (e.email ?? '').toLowerCase().includes(q)
      const matchesDept   = !deptFilter   || e.department === deptFilter
      const matchesDesig  = !desigFilter  || e.designation === desigFilter
      const matchesStatus = !statusFilter || e.status === statusFilter
      return matchesSearch && matchesDept && matchesDesig && matchesStatus
    })
  }, [employees, search, deptFilter, desigFilter, statusFilter])

  return (
    <DashboardLayout>
      <div id="admin-employees-page">
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

        <div className="toolbar" id="employees-toolbar">
          <SearchBar placeholder="Search by name, ID, email…" value={search} onChange={setSearch} id="employees-search" />
          <FilterDropdown label="Dept" options={deptOptions} value={deptFilter} onChange={setDeptFilter} id="employees-dept-filter" />
          <FilterDropdown label="Role" options={desigOptions} value={desigFilter} onChange={setDesigFilter} id="employees-desig-filter" />
          <FilterDropdown label="Status" options={statusOptions} value={statusFilter} onChange={setStatusFilter} id="employees-status-filter" />
        </div>

        {loading ? (
          <div className="section-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading employees…</div>
        ) : error ? (
          <div className="section-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-error)' }}>{error}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon="groups" title="No employees found" message="No employee records available yet." id="employees-empty" />
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
                {filtered.map((e, i) => (
                  <tr key={e.employeeId ?? e.id ?? i} id={`employee-${e.employeeId ?? i}`}>
                    <td><strong>{e.empId ?? e.employeeId ?? '—'}</strong></td>
                    <td>{e.name ?? `${e.firstName ?? ''} ${e.lastName ?? ''}`.trim()}</td>
                    <td>{e.department ?? '—'}</td>
                    <td>{e.designation ?? e.position ?? '—'}</td>
                    <td>{e.email ?? '—'}</td>
                    <td>{e.phone ?? e.phoneNumber ?? '—'}</td>
                    <td><span className={chipVariant(e.status ?? 'Active')}>{e.status ?? 'Active'}</span></td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title="View employee" id={`view-emp-${e.employeeId ?? i}`}>
                          <span className="material-symbols-rounded">visibility</span>
                        </button>
                        <button className="btn-icon" title="Edit employee" id={`edit-emp-${e.employeeId ?? i}`}>
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

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Employee" id="add-employee-modal">
          <form className="form-grid" id="add-employee-form" onSubmit={(e) => e.preventDefault()}>
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
              <input type="text" id="emp-dept" placeholder="e.g. Computer Science" />
            </div>
            <div className="form-group">
              <label htmlFor="emp-designation">Designation</label>
              <input type="text" id="emp-designation" placeholder="e.g. Professor" />
            </div>
            <div className="form-group">
              <label htmlFor="emp-doj">Date of Joining</label>
              <input type="date" id="emp-doj" />
            </div>
            <div className="form-group">
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
