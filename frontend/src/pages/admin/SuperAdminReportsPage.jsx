// ══════════════════════════════════════════════════════════════════════
// SuperAdminReportsPage.jsx — Reports Dashboard for Super Admin
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

/* ── Stat Cards ── */
const stats = [
  { id: 'report-enrollments', icon: 'school', label: 'Total Enrollments', value: '2,845', delta: '+126 this semester', variant: 'primary' },
  { id: 'report-active-users', icon: 'group', label: 'Active Users', value: '1,392', delta: '↑ 8.2% from last month', variant: 'success' },
  { id: 'report-revenue', icon: 'payments', label: 'Revenue Collected', value: '₹3.84 Cr', delta: '82% of target', variant: 'secondary' },
  { id: 'report-attendance', icon: 'event_available', label: 'Avg Attendance', value: '87.4%', delta: '↑ 2.1% vs last sem', variant: 'tertiary' },
]

/* ── Enrollment Trends (monthly) ── */
const enrollmentTrends = [
  { month: 'Jan', enrollments: 180 },
  { month: 'Feb', enrollments: 210 },
  { month: 'Mar', enrollments: 195 },
  { month: 'Apr', enrollments: 240 },
  { month: 'May', enrollments: 310 },
  { month: 'Jun', enrollments: 420 },
  { month: 'Jul', enrollments: 380 },
  { month: 'Aug', enrollments: 290 },
  { month: 'Sep', enrollments: 260 },
  { month: 'Oct', enrollments: 230 },
  { month: 'Nov', enrollments: 200 },
  { month: 'Dec', enrollments: 175 },
]

/* ── Students by Department ── */
const studentsByDept = [
  { dept: 'CS', students: 310 },
  { dept: 'ME', students: 275 },
  { dept: 'ECE', students: 260 },
  { dept: 'CE', students: 198 },
  { dept: 'MBA', students: 180 },
  { dept: 'PHY', students: 142 },
  { dept: 'MATH', students: 120 },
  { dept: 'CHEM', students: 105 },
]

/* ── Revenue Overview (monthly) ── */
const revenueData = [
  { month: 'Jan', revenue: 42, expenses: 28 },
  { month: 'Feb', revenue: 38, expenses: 26 },
  { month: 'Mar', revenue: 45, expenses: 30 },
  { month: 'Apr', revenue: 50, expenses: 32 },
  { month: 'May', revenue: 35, expenses: 29 },
  { month: 'Jun', revenue: 58, expenses: 35 },
  { month: 'Jul', revenue: 62, expenses: 38 },
  { month: 'Aug', revenue: 48, expenses: 33 },
  { month: 'Sep', revenue: 44, expenses: 31 },
  { month: 'Oct', revenue: 40, expenses: 27 },
  { month: 'Nov', revenue: 36, expenses: 25 },
  { month: 'Dec', revenue: 30, expenses: 22 },
]

export default function SuperAdminReportsPage() {
  return (
    <DashboardLayout>
      <div id="super-admin-reports-page">
        {/* ── Page Header ── */}
        <div className="page-header" id="reports-page-header">
          <h1>System Reports</h1>
          <p>Comprehensive analytics and insights across enrollments, users, revenue, and attendance.</p>
        </div>

        {/* ── Stat Cards ── */}
        <div className="stat-grid" id="reports-stat-grid">
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

        {/* ── Charts Row ── */}
        <div className="dashboard-grid" id="reports-charts-grid">
          {/* Enrollment Trends */}
          <div className="section-panel" id="enrollment-trends-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">trending_up</span>
              <h2>Enrollment Trends</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentTrends} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e0db" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#8f7066" />
                <YAxis tick={{ fontSize: 12 }} stroke="#8f7066" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e8e0db', fontSize: '0.875rem' }}
                />
                <Line
                  type="monotone"
                  dataKey="enrollments"
                  stroke="#a43700"
                  strokeWidth={2.5}
                  dot={{ fill: '#a43700', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Enrollments"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Students by Department */}
          <div className="section-panel" id="students-by-dept-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">bar_chart</span>
              <h2>Students by Department</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentsByDept} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e0db" />
                <XAxis dataKey="dept" tick={{ fontSize: 12 }} stroke="#8f7066" />
                <YAxis tick={{ fontSize: 12 }} stroke="#8f7066" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e8e0db', fontSize: '0.875rem' }}
                />
                <Bar
                  dataKey="students"
                  fill="#cd4700"
                  radius={[4, 4, 0, 0]}
                  name="Students"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Revenue Overview (full-width) ── */}
        <div className="section-panel" id="revenue-overview-panel">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">account_balance</span>
            <h2>Revenue Overview</h2>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e0db" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#8f7066" />
              <YAxis tick={{ fontSize: 12 }} stroke="#8f7066" tickFormatter={(v) => `₹${v}L`} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e8e0db', fontSize: '0.875rem' }}
                formatter={(value) => [`₹${value}L`, undefined]}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '0.8125rem' }} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2e7d32"
                strokeWidth={2.5}
                dot={{ fill: '#2e7d32', r: 4 }}
                activeDot={{ r: 6 }}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ba1a1a"
                strokeWidth={2.5}
                dot={{ fill: '#ba1a1a', r: 4 }}
                activeDot={{ r: 6 }}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  )
}
