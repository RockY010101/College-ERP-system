// ══════════════════════════════════════════════════════════════════════
// AdminAttendancePage.jsx — Attendance Overview
// Data: GET /api/attendance  (summary stats + dept breakdown)
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import apiClient from '../../services/apiClient'

const monthOptions = [
  { value: '', label: 'All Months' },
  ...['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    .map(m => ({ value: m, label: m })),
]

const attendanceChip = (pct) => {
  if (pct < 75) return 'chip chip--error'
  if (pct < 85) return 'chip chip--primary'
  return 'chip chip--success'
}

const noData = (
  <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
    No data available yet — backend implementation pending.
  </p>
)

export default function AdminAttendancePage() {
  const [summary, setSummary]           = useState(null)
  const [deptData, setDeptData]         = useState([])
  const [lowStudents, setLowStudents]   = useState([])
  const [loading, setLoading]           = useState(true)
  const [deptFilter, setDeptFilter]     = useState('')
  const [monthFilter, setMonthFilter]   = useState('')

  useEffect(() => {
    let cancelled = false
    apiClient.get('/attendance')
      .then(res => {
        if (!cancelled) {
          const d = res.data
          if (d && typeof d === 'object' && !Array.isArray(d)) {
            setSummary(d.summary ?? null)
            setDeptData(Array.isArray(d.departmentWise) ? d.departmentWise : [])
            setLowStudents(Array.isArray(d.lowAttendance) ? d.lowAttendance : [])
          }
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Build dept options from deptData
  const deptOptions = [
    { value: '', label: 'All Departments' },
    ...deptData.map(d => ({ value: d.department, label: d.department })),
  ]

  const filteredDept = deptFilter
    ? deptData.filter(d => d.department === deptFilter)
    : deptData

  const filteredLow = deptFilter
    ? lowStudents.filter(s => s.department === deptFilter)
    : lowStudents

  const stats = [
    { id: 'att-overall', icon: 'percent',       label: 'Overall Attendance',     value: summary?.overallAttendance ?? '—', delta: '', variant: 'primary'  },
    { id: 'att-present', icon: 'check_circle',  label: "Today's Present",         value: summary?.todayPresent      ?? '—', delta: '', variant: 'success'  },
    { id: 'att-absent',  icon: 'cancel',        label: "Today's Absent",          value: summary?.todayAbsent       ?? '—', delta: '', variant: 'error'    },
    { id: 'att-alerts',  icon: 'warning',       label: 'Low Attendance Alerts',   value: summary?.lowAttendanceCount ?? '—', delta: 'Students below 75%', variant: 'tertiary' },
  ]

  return (
    <DashboardLayout>
      <div id="admin-attendance-page">
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
                {s.delta && <span className="stat-card__delta">{s.delta}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="toolbar" id="attendance-toolbar">
          <FilterDropdown label="Department" options={deptOptions} value={deptFilter} onChange={setDeptFilter} id="attendance-dept-filter" />
          <FilterDropdown label="Month" options={monthOptions} value={monthFilter} onChange={setMonthFilter} id="attendance-month-filter" />
        </div>

        {/* ── Dashboard Grid ── */}
        <div className="dashboard-grid" id="attendance-dashboard-grid">
          {/* Department-wise Bar Chart */}
          <div className="section-panel" id="dept-attendance-chart-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">bar_chart</span>
              <h2>Department-wise Attendance</h2>
            </div>
            {loading ? (
              <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading…</p>
            ) : filteredDept.length === 0 ? noData : (
              <div style={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                  <BarChart data={filteredDept} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
            )}
          </div>

          {/* Low Attendance Students */}
          <div className="section-panel" id="low-attendance-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">warning</span>
              <h2>Low Attendance Students</h2>
            </div>
            {loading ? (
              <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading…</p>
            ) : filteredLow.length === 0 ? (
              <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No low-attendance records available.</p>
            ) : (
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
                  {filteredLow.map((s, i) => (
                    <tr key={s.studentId ?? s.id ?? i} id={`low-att-${i}`}>
                      <td>{s.name ?? `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim()}</td>
                      <td>{s.department ?? '—'}</td>
                      <td>{s.attendance ?? s.attendancePercent ?? '—'}{typeof (s.attendance ?? s.attendancePercent) === 'number' ? '%' : ''}</td>
                      <td>
                        <span className={attendanceChip(s.attendance ?? s.attendancePercent ?? 0)}>
                          {(s.attendance ?? s.attendancePercent) < 75 ? 'Critical' : 'Warning'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
