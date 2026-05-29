// ══════════════════════════════════════════════════════════════════════
// AdminAttendancePage.jsx — Attendance Overview for Admin module
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

/* ── Static Data ── */
const stats = [
  { id: 'att-overall', icon: 'percent', label: 'Overall Attendance', value: '82.4%', delta: '+1.2% from last month', variant: 'primary' },
  { id: 'att-present', icon: 'check_circle', label: "Today's Present", value: '1,086', delta: 'Out of 1,247 students', variant: 'success' },
  { id: 'att-absent', icon: 'cancel', label: "Today's Absent", value: '161', delta: '12.9% absent today', variant: 'error' },
  { id: 'att-alerts', icon: 'warning', label: 'Low Attendance Alerts', value: '23', delta: 'Students below 75%', variant: 'tertiary' },
]

const deptAttendanceData = [
  { department: 'CSE', attendance: 85 },
  { department: 'ECE', attendance: 80 },
  { department: 'ME', attendance: 78 },
  { department: 'CE', attendance: 82 },
  { department: 'EEE', attendance: 76 },
  { department: 'IT', attendance: 84 },
]

const lowAttendanceStudents = [
  { id: 'la-1', name: 'Rahul Tiwari', department: 'Computer Science', attendance: 58, semester: 4 },
  { id: 'la-2', name: 'Pooja Sharma', department: 'Electronics', attendance: 62, semester: 6 },
  { id: 'la-3', name: 'Amit Yadav', department: 'Mechanical', attendance: 65, semester: 2 },
  { id: 'la-4', name: 'Kavita Rao', department: 'Civil', attendance: 68, semester: 4 },
  { id: 'la-5', name: 'Deepak Jain', department: 'Computer Science', attendance: 70, semester: 6 },
  { id: 'la-6', name: 'Swati Mishra', department: 'Electronics', attendance: 71, semester: 2 },
  { id: 'la-7', name: 'Manoj Pandey', department: 'Mechanical', attendance: 72, semester: 8 },
  { id: 'la-8', name: 'Nisha Agarwal', department: 'Computer Science', attendance: 73, semester: 4 },
]

const departmentOptions = [
  { value: '', label: 'All Departments' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Mechanical', label: 'Mechanical' },
  { value: 'Civil', label: 'Civil' },
]

const monthOptions = [
  { value: '', label: 'All Months' },
  { value: 'Jan', label: 'January' },
  { value: 'Feb', label: 'February' },
  { value: 'Mar', label: 'March' },
  { value: 'Apr', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'Jun', label: 'June' },
  { value: 'Jul', label: 'July' },
  { value: 'Aug', label: 'August' },
  { value: 'Sep', label: 'September' },
  { value: 'Oct', label: 'October' },
  { value: 'Nov', label: 'November' },
  { value: 'Dec', label: 'December' },
]

const attendanceChip = (pct) => {
  if (pct < 75) return 'chip chip--error'
  if (pct < 85) return 'chip chip--primary'
  return 'chip chip--success'
}

/* ── Component ── */
export default function AdminAttendancePage() {
  const [deptFilter, setDeptFilter] = useState('')
  const [monthFilter, setMonthFilter] = useState('')

  return (
    <DashboardLayout>
      <div id="admin-attendance-page">
        {/* ── Page Header ── */}
        <div className="page-header">
          <h1>Attendance Overview</h1>
          <p>Monitor institution-wide attendance statistics and identify at-risk students.</p>
        </div>

        {/* ── Stat Cards ── */}
        <div className="stat-grid" id="attendance-stat-grid">
          {stats.map((s) => (
            <div className="stat-card" key={s.id} id={s.id}>
              <div className={`stat-card__icon stat-card__icon--${s.variant}`}>
                <span className="material-symbols-rounded">{s.icon}</span>
              </div>
              <div className="stat-card__info">
                <span className="stat-card__label">{s.label}</span>
                <span className="stat-card__value">{s.value}</span>
                <span className="stat-card__delta">{s.delta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="toolbar" id="attendance-toolbar">
          <FilterDropdown label="Department" options={departmentOptions} value={deptFilter} onChange={setDeptFilter} id="attendance-dept-filter" />
          <FilterDropdown label="Month" options={monthOptions} value={monthFilter} onChange={setMonthFilter} id="attendance-month-filter" />
        </div>

        {/* ── Dashboard Grid ── */}
        <div className="dashboard-grid" id="attendance-dashboard-grid">
          {/* Left: Department-wise Bar Chart */}
          <div className="section-panel" id="dept-attendance-chart-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">bar_chart</span>
              <h2>Department-wise Attendance</h2>
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={deptAttendanceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0d6d0" />
                  <XAxis dataKey="department" tick={{ fontSize: 13, fill: '#5d4037' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 13, fill: '#5d4037' }} unit="%" />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Attendance']}
                    contentStyle={{ borderRadius: 12, border: '1px solid #e0d6d0', fontSize: 13 }}
                  />
                  <Bar dataKey="attendance" fill="#a43700" radius={[6, 6, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Low Attendance Students */}
          <div className="section-panel" id="low-attendance-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">warning</span>
              <h2>Low Attendance Students</h2>
            </div>
            <table className="data-table" id="low-attendance-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Attendance %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowAttendanceStudents.map((s) => (
                  <tr key={s.id} id={s.id}>
                    <td>{s.name}</td>
                    <td>{s.department}</td>
                    <td>{s.attendance}%</td>
                    <td>
                      <span className={attendanceChip(s.attendance)}>
                        {s.attendance < 75 ? 'Critical' : 'Warning'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
