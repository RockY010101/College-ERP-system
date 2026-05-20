// ══════════════════════════════════════════════════════════════════════
// Sidebar.jsx — Shared navigation sidebar
// Academic Trust Redesign
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useRole } from '../context/RoleContext'
import './Sidebar.css'

const NAV_ITEMS = {
  SUPER_ADMIN: [
    { icon: 'dashboard', label: 'Dashboard', path: '/super-admin' },
    { icon: 'group', label: 'Users', path: '/super-admin/users' },
    { icon: 'domain', label: 'Departments', path: '/super-admin/departments' },
    { icon: 'school', label: 'Courses', path: '/super-admin/courses' },
    { icon: 'monitoring', label: 'Reports', path: '/super-admin/reports' },
    { icon: 'settings', label: 'Settings', path: '/super-admin/settings' },
  ],
  ADMIN: [
    { icon: 'dashboard', label: 'Dashboard', path: '/admin' },
    { icon: 'person', label: 'Students', path: '/admin/students' },
    { icon: 'badge', label: 'Employees', path: '/admin/employees' },
    { icon: 'school', label: 'Courses', path: '/admin/courses' },
    { icon: 'calendar_month', label: 'Attendance', path: '/admin/attendance' },
    { icon: 'monitoring', label: 'Reports', path: '/admin/reports' },
  ],
  FACULTY: [
    { icon: 'dashboard', label: 'Dashboard', path: '/faculty' },
    { icon: 'groups', label: 'My Students', path: '/faculty/students' },
    { icon: 'calendar_month', label: 'Attendance', path: '/faculty/attendance' },
    { icon: 'assignment', label: 'Results', path: '/faculty/results' },
    { icon: 'menu_book', label: 'Subjects', path: '/faculty/subjects' },
  ],
  ACCOUNTANT: [
    { icon: 'dashboard', label: 'Dashboard', path: '/accountant' },
    { icon: 'payments', label: 'Fees', path: '/accountant/fees' },
    { icon: 'receipt_long', label: 'Payments', path: '/accountant/payments' },
    { icon: 'monitoring', label: 'Reports', path: '/accountant/reports' },
  ],
  STUDENT: [
    { icon: 'dashboard', label: 'Dashboard', path: '/student' },
    { icon: 'assignment', label: 'Results', path: '/student/results' },
    { icon: 'calendar_month', label: 'Attendance', path: '/student/attendance' },
    { icon: 'payments', label: 'Fees', path: '/student/fees' },
    { icon: 'notifications', label: 'Notices', path: '/student/notices' },
  ],
}

function Sidebar() {
  const { currentUser, logout } = useAuth()
  const { role } = useRole()

  const items = NAV_ITEMS[role] || NAV_ITEMS.STUDENT
  const displayName = currentUser?.displayName || currentUser?.email || 'User'
  const currentPath = window.location.pathname

  return (
    <aside className="sidebar" id="main-sidebar">
      {/* ── Brand ── */}
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <span className="material-symbols-rounded">school</span>
        </div>
        <div className="sidebar__brand-text">
          <span className="sidebar__title">College ERP</span>
          <span className="sidebar__subtitle">Management System</span>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="sidebar__nav">
        {items.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`sidebar__link ${currentPath === item.path ? 'sidebar__link--active' : ''}`}
          >
            <span className="material-symbols-rounded">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* ── User Footer ── */}
      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar__user-info">
            <span className="sidebar__user-name">{displayName}</span>
            <span className="sidebar__user-role">{role?.replace('_', ' ') || 'Guest'}</span>
          </div>
        </div>
        <button className="sidebar__logout" onClick={logout} title="Sign out">
          <span className="material-symbols-rounded">logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
