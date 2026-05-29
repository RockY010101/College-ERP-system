// ══════════════════════════════════════════════════════════════════════
// SuperAdminUsersPage.jsx — User Management for Super Admin
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'

/* ── Mock Data ── */
const usersData = [
  { id: 'usr-1', firstName: 'Aarav', lastName: 'Sharma', email: 'aarav.sharma@nitk.edu.in', role: 'Super Admin', department: 'Administration', status: 'Active', lastLogin: '29 May 2026, 11:42 PM' },
  { id: 'usr-2', firstName: 'Priya', lastName: 'Patel', email: 'priya.patel@nitk.edu.in', role: 'Admin', department: 'Computer Science', status: 'Active', lastLogin: '29 May 2026, 10:18 PM' },
  { id: 'usr-3', firstName: 'Rajesh', lastName: 'Kumar', email: 'rajesh.kumar@nitk.edu.in', role: 'Faculty', department: 'Mechanical Engg', status: 'Active', lastLogin: '29 May 2026, 09:05 PM' },
  { id: 'usr-4', firstName: 'Sneha', lastName: 'Iyer', email: 'sneha.iyer@nitk.edu.in', role: 'Faculty', department: 'ECE', status: 'Active', lastLogin: '28 May 2026, 04:30 PM' },
  { id: 'usr-5', firstName: 'Vikram', lastName: 'Deshmukh', email: 'vikram.deshmukh@nitk.edu.in', role: 'Accountant', department: 'Finance', status: 'Active', lastLogin: '29 May 2026, 06:12 PM' },
  { id: 'usr-6', firstName: 'Ananya', lastName: 'Reddy', email: 'ananya.reddy@nitk.edu.in', role: 'Student', department: 'Computer Science', status: 'Active', lastLogin: '29 May 2026, 08:55 PM' },
  { id: 'usr-7', firstName: 'Karthik', lastName: 'Nair', email: 'karthik.nair@nitk.edu.in', role: 'Student', department: 'Civil Engg', status: 'Inactive', lastLogin: '15 Apr 2026, 02:10 PM' },
  { id: 'usr-8', firstName: 'Meera', lastName: 'Joshi', email: 'meera.joshi@nitk.edu.in', role: 'Faculty', department: 'Physics', status: 'Active', lastLogin: '28 May 2026, 11:20 AM' },
  { id: 'usr-9', firstName: 'Arjun', lastName: 'Menon', email: 'arjun.menon@nitk.edu.in', role: 'Student', department: 'MBA', status: 'Suspended', lastLogin: '10 Mar 2026, 09:45 AM' },
  { id: 'usr-10', firstName: 'Divya', lastName: 'Gupta', email: 'divya.gupta@nitk.edu.in', role: 'Admin', department: 'ECE', status: 'Active', lastLogin: '29 May 2026, 07:30 PM' },
]

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'Super Admin', label: 'Super Admin' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Faculty', label: 'Faculty' },
  { value: 'Accountant', label: 'Accountant' },
  { value: 'Student', label: 'Student' },
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Suspended', label: 'Suspended' },
]

const departmentList = [
  'Administration', 'Computer Science', 'Mechanical Engg', 'ECE',
  'Civil Engg', 'MBA', 'Physics', 'Mathematics', 'Chemistry', 'Finance',
]

const roleChipClass = (role) => {
  switch (role) {
    case 'Super Admin': return 'chip chip--primary'
    case 'Admin':       return 'chip chip--secondary'
    case 'Faculty':     return 'chip chip--neutral'
    case 'Accountant':  return 'chip chip--neutral'
    case 'Student':     return 'chip chip--neutral'
    default:            return 'chip'
  }
}

const statusChipClass = (status) => {
  switch (status) {
    case 'Active':    return 'chip chip--success'
    case 'Inactive':  return 'chip chip--error'
    case 'Suspended': return 'chip chip--error'
    default:          return 'chip'
  }
}

export default function SuperAdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showModal, setShowModal] = useState(false)

  /* ── Filter logic ── */
  const filteredUsers = useMemo(() => {
    return usersData.filter((u) => {
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        fullName.includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.department.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = !roleFilter || u.role === roleFilter
      const matchesStatus = !statusFilter || u.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [searchQuery, roleFilter, statusFilter])

  return (
    <DashboardLayout>
      <div id="super-admin-users-page">
        {/* ── Page Header ── */}
        <div className="page-header" id="users-page-header">
          <h1>User Management</h1>
          <p>Create, edit, and manage user accounts across all roles and departments.</p>
        </div>

        {/* ── Toolbar ── */}
        <div className="toolbar" id="users-toolbar">
          <SearchBar
            placeholder="Search users…"
            value={searchQuery}
            onChange={setSearchQuery}
            id="users-search"
          />
          <FilterDropdown
            label="Role"
            options={roleOptions}
            value={roleFilter}
            onChange={setRoleFilter}
            id="users-role-filter"
          />
          <FilterDropdown
            label="Status"
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            id="users-status-filter"
          />
          <button
            className="btn btn-primary"
            id="add-user-btn"
            onClick={() => setShowModal(true)}
          >
            <span className="material-symbols-rounded">person_add</span>
            Add User
          </button>
        </div>

        {/* ── Data Table ── */}
        <div className="section-panel" id="users-table-panel">
          {filteredUsers.length === 0 ? (
            <EmptyState
              icon="person_off"
              title="No users found"
              message="Try adjusting your search or filter criteria."
              id="users-empty"
            />
          ) : (
            <table className="data-table" id="users-data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} id={user.id}>
                    <td style={{ fontWeight: 600 }}>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={roleChipClass(user.role)}>{user.role}</span>
                    </td>
                    <td>{user.department}</td>
                    <td>
                      <span className={statusChipClass(user.status)}>{user.status}</span>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title="Edit user" id={`edit-${user.id}`}>
                          <span className="material-symbols-rounded">edit</span>
                        </button>
                        <button className="btn-icon btn-icon--danger" title="Delete user" id={`delete-${user.id}`}>
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

        {/* ── Add User Modal ── */}
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title="Add New User"
          id="add-user-modal"
        >
          <form onSubmit={(e) => { e.preventDefault(); setShowModal(false) }}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="add-first-name">First Name</label>
                <input type="text" id="add-first-name" placeholder="Enter first name" required />
              </div>
              <div className="form-group">
                <label htmlFor="add-last-name">Last Name</label>
                <input type="text" id="add-last-name" placeholder="Enter last name" required />
              </div>
              <div className="form-group form-group--full">
                <label htmlFor="add-email">Email Address</label>
                <input type="email" id="add-email" placeholder="user@nitk.edu.in" required />
              </div>
              <div className="form-group">
                <label htmlFor="add-role">Role</label>
                <select id="add-role" required>
                  <option value="">Select role</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Student">Student</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="add-department">Department</label>
                <select id="add-department" required>
                  <option value="">Select department</option>
                  {departmentList.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-group form-group--full">
                <label htmlFor="add-password">Password</label>
                <input type="password" id="add-password" placeholder="Minimum 8 characters" required />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create User</button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
