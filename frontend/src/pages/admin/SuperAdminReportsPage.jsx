// ══════════════════════════════════════════════════════════════════════
// SuperAdminReportsPage.jsx — Reports Dashboard
// Data: fetched from /api/reports/admin
// Charts render empty state until backend returns real data.
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import apiClient from '../../services/apiClient'

export default function SuperAdminReportsPage() {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/reports/admin')
      .then(res => { if (!cancelled) setReport(res.data) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const stats = [
    { id: 'report-enrollments',  icon: 'school',          label: 'Total Enrollments',  value: report?.totalEnrollments  ?? '—', delta: '', variant: 'primary'   },
    { id: 'report-active-users', icon: 'group',           label: 'Active Users',        value: report?.activeUsers       ?? '—', delta: '', variant: 'success'   },
    { id: 'report-revenue',      icon: 'payments',        label: 'Revenue Collected',   value: report?.revenueCollected  ?? '—', delta: '', variant: 'secondary' },
    { id: 'report-attendance',   icon: 'event_available', label: 'Avg Attendance',      value: report?.avgAttendance     ?? '—', delta: '', variant: 'tertiary'  },
  ]

  const enrollmentTrends = report?.enrollmentTrends ?? []
  const studentsByDept   = report?.studentsByDepartment ?? []
  const revenueData      = report?.revenueData ?? []

  const noData = <p style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-text-muted)' }}>No data available yet. Backend implementation pending.</p>

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
            {enrollmentTrends.length === 0 ? noData : (
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
            )}
          </div>

          {/* Students by Department */}
          <div className="section-panel" id="students-by-dept-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">bar_chart</span>
              <h2>Students by Department</h2>
            </div>
            {studentsByDept.length === 0 ? noData : (
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
            )}
          </div>
        </div>

        {/* ── Revenue Overview (full-width) ── */}
        <div className="section-panel" id="revenue-overview-panel">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">account_balance</span>
            <h2>Revenue Overview</h2>
          </div>
          {revenueData.length === 0 ? noData : (
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
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
