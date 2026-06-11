// ══════════════════════════════════════════════════════════════════════
// SuperAdminUsersPage.jsx — User Management for Super Admin
// Data: GET/POST /api/users
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'
import apiClient from '../../services/apiClient'

/* ── Static filter options ── */
const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ADMIN',       label: 'Admin' },
  { value: 'FACULTY',     label: 'Faculty' },
  { value: 'ACCOUNTANT',  label: 'Accountant' },
  { value: 'STUDENT',     label: 'Student' },
]

const statusOptions = [
  { value: '',         label: 'All Status'  },
  { value: 'ACTIVE',   label: 'Active'      },
  { value: 'INACTIVE', label: 'Inactive'    },
  { value: 'SUSPENDED',label: 'Suspended'   },
]

/* ── Chip helpers ── */
const roleChipClass = (role) => {
  switch (role) {
    case 'SUPER_ADMIN': return 'chip chip--primary'
    case 'ADMIN':       return 'chip chip--secondary'
    default:            return 'chip chip--neutral'
  }
}
const roleLabel = (role) => {
  switch (role) {
    case 'SUPER_ADMIN': return 'Super Admin'
    case 'ADMIN':       return 'Admin'
    case 'FACULTY':     return 'Faculty'
    case 'ACCOUNTANT':  return 'Accountant'
    case 'STUDENT':     return 'Student'
    default:            return role ?? '—'
  }
}
const statusChipClass = (status) => {
  switch (status) {
    case 'ACTIVE':    return 'chip chip--success'
    case 'INACTIVE':  return 'chip chip--error'
    case 'SUSPENDED': return 'chip chip--error'
    default:          return 'chip chip--neutral'
  }
}

/* ── Empty form state ── */
const emptyForm = {
  firstName:  '',
  lastName:   '',
  email:      '',
  role:       '',
  department: '',
  password:   '',
  phone:      '',
}

export default function SuperAdminUsersPage() {
  const [users, setUsers]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  // Filters
  const [searchQuery, setSearchQuery]   = useState('')
  const [roleFilter, setRoleFilter]     = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Modal
  const [showModal, setShowModal]       = useState(false)
  const [form, setForm]                 = useState(emptyForm)
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting]     = useState(false)
  const [formError, setFormError]       = useState(null)
  const [formSuccess, setFormSuccess]   = useState(null)

  /* ── Fetch users ── */
  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiClient.get('/users')
      setUsers(Array.isArray(res.data) ? res.data : [])
    } catch {
      setError('Failed to load users from server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadUsers() }, [])

  /* ── Filter logic ── */
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const name  = (u.name ?? '').toLowerCase()
      const email = (u.email ?? '').toLowerCase()
      const q     = searchQuery.toLowerCase()
      if (searchQuery && !name.includes(q) && !email.includes(q)) return false
      if (roleFilter   && u.role   !== roleFilter)   return false
      if (statusFilter && u.status !== statusFilter) return false
      return true
    })
  }, [users, searchQuery, roleFilter, statusFilter])

  /* ── Handle form changes ── */
  const handleChange = (e) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id.replace('add-', '')]: value }))
  }

  /* ── Submit create user ── */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(null)

    if (form.password.length < 8) {
      setFormError('Password must be at least 8 characters.')
      return
    }

    setSubmitting(true)
    try {
      await apiClient.post('/users', {
        firstName:  form.firstName,
        lastName:   form.lastName,
        email:      form.email,
        password:   form.password,
        role:       form.role,
        department: form.department,
        phone:      form.phone,
      })
      setFormSuccess(`User "${form.firstName} ${form.lastName}" created successfully!`)
      setForm(emptyForm)
      // Refresh user list
      await loadUsers()
      // Auto-close after 1.5s
      setTimeout(() => {
        setShowModal(false)
        setFormSuccess(null)
      }, 1500)
    } catch (err) {
      const msg = err?.response?.data?.error ?? err?.message ?? 'Failed to create user.'
      setFormError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Close modal ── */
  const handleCloseModal = () => {
    setShowModal(false)
    setForm(emptyForm)
    setFormError(null)
    setFormSuccess(null)
    setShowPassword(false)
  }

  /* ── Delete user ── */
  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`Delete user "${userName}"? This also removes their Firebase login.`)) return
    try {
      await apiClient.delete(`/users/${userId}`)
      await loadUsers()
    } catch (err) {
      alert('Failed to delete user: ' + (err?.response?.data?.error ?? err.message))
    }
  }

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
          <SearchBar placeholder="Search users…" value={searchQuery} onChange={setSearchQuery} id="users-search" />
          <FilterDropdown label="Role" options={roleOptions} value={roleFilter} onChange={setRoleFilter} id="users-role-filter" />
          <FilterDropdown label="Status" options={statusOptions} value={statusFilter} onChange={setStatusFilter} id="users-status-filter" />
          <button className="btn btn-primary" id="add-user-btn" onClick={() => setShowModal(true)}>
            <span className="material-symbols-rounded">person_add</span>
            Add User
          </button>
        </div>

        {/* ── Data Table ── */}
        <div className="section-panel" id="users-table-panel">
          {loading ? (
            <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading users…</p>
          ) : error ? (
            <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-error)' }}>{error}</p>
          ) : filteredUsers.length === 0 ? (
            <EmptyState icon="person_off" title="No users found" message="No users returned from the server yet." id="users-empty" />
          ) : (
            <table className="data-table" id="users-data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, i) => (
                  <tr key={user.id ?? i} id={`user-row-${user.id ?? i}`}>
                    <td style={{ fontWeight: 600 }}>{user.name ?? '—'}</td>
                    <td>{user.email ?? '—'}</td>
                    <td><span className={roleChipClass(user.role)}>{roleLabel(user.role)}</span></td>
                    <td><span className={statusChipClass(user.status)}>{user.status ?? '—'}</span></td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button
                          className="btn-icon btn-icon--danger"
                          title="Delete user"
                          id={`delete-user-${user.id}`}
                          onClick={() => handleDelete(user.id, user.name)}
                        >
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
        <Modal open={showModal} onClose={handleCloseModal} title="Add New User" id="add-user-modal">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-grid">
              {/* First / Last Name */}
              <div className="form-group">
                <label htmlFor="add-firstName">First Name</label>
                <input
                  type="text"
                  id="add-firstName"
                  placeholder="Enter first name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="add-lastName">Last Name</label>
                <input
                  type="text"
                  id="add-lastName"
                  placeholder="Enter last name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group form-group--full">
                <label htmlFor="add-email">Email Address</label>
                <input
                  type="email"
                  id="add-email"
                  placeholder="user@college.edu.in"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Role */}
              <div className="form-group">
                <label htmlFor="add-role">Role</label>
                <select id="add-role" value={form.role} onChange={handleChange} required>
                  <option value="">Select role</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="ADMIN">Admin</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="ACCOUNTANT">Accountant</option>
                  <option value="STUDENT">Student</option>
                </select>
              </div>

              {/* Department */}
              <div className="form-group">
                <label htmlFor="add-department">Department</label>
                <input
                  type="text"
                  id="add-department"
                  placeholder="e.g. Computer Science"
                  value={form.department}
                  onChange={handleChange}
                />
              </div>

              {/* Phone (optional) */}
              <div className="form-group form-group--full">
                <label htmlFor="add-phone">Phone (optional)</label>
                <input
                  type="tel"
                  id="add-phone"
                  placeholder="e.g. +91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="form-group form-group--full" style={{ position: 'relative' }}>
                <label htmlFor="add-password">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="add-password"
                    placeholder="Minimum 8 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    style={{ paddingRight: '2.75rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    style={{
                      position: 'absolute', right: '0.75rem', top: '50%',
                      transform: 'translateY(-50%)', background: 'none',
                      border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)',
                      display: 'flex', alignItems: 'center'
                    }}
                    tabIndex={-1}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: '1.1rem' }}>
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                <small style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', marginTop: '0.25rem', display: 'block' }}>
                  This password will be used by the user to log in.
                </small>
              </div>
            </div>

            {/* Feedback */}
            {formError && (
              <div style={{
                marginTop: '0.75rem', padding: '0.75rem 1rem', borderRadius: 8,
                background: '#ffdad6', color: '#ba1a1a', fontSize: '0.875rem'
              }} id="add-user-error">
                <span className="material-symbols-rounded" style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: 6 }}>error</span>
                {formError}
              </div>
            )}
            {formSuccess && (
              <div style={{
                marginTop: '0.75rem', padding: '0.75rem 1rem', borderRadius: 8,
                background: '#e8f5e9', color: '#2e7d32', fontSize: '0.875rem'
              }} id="add-user-success">
                <span className="material-symbols-rounded" style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: 6 }}>check_circle</span>
                {formSuccess}
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn" onClick={handleCloseModal} disabled={submitting}>Cancel</button>
              <button type="submit" className="btn btn-primary" id="create-user-btn" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="material-symbols-rounded" style={{ animation: 'spin 1s linear infinite', fontSize: '1rem' }}>sync</span>
                    Creating…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-rounded">person_add</span>
                    Create User
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
