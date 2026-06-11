// ══════════════════════════════════════════════════════════════════════
// AdminReportsPage.jsx — Administrative Reports (tabbed)
// Data: GET /api/reports/admin
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import Tabs from '../../components/Tabs'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import apiClient from '../../services/apiClient'

/* ── Chart Colors ── */
const COLORS = {
  primary: '#a43700',
  primaryContainer: '#cd4700',
  secondary: '#feb300',
  success: '#2e7d32',
  error: '#ba1a1a',
}
const PIE_COLORS = [COLORS.success, COLORS.error, COLORS.secondary]

/* ── Tab Definitions ── */
const tabList = [
  { value: 'overview',    label: 'Overview',    icon: 'dashboard'  },
  { value: 'academic',    label: 'Academic',    icon: 'school'     },
  { value: 'attendance',  label: 'Attendance',  icon: 'fact_check' },
  { value: 'enrollment',  label: 'Enrollment',  icon: 'group_add'  },
]

const attendanceChip = (pct) => {
  if (pct >= 85) return 'chip chip--success'
  if (pct >= 75) return 'chip chip--primary'
  return 'chip chip--error'
}

const noData = (msg = 'No data available yet — backend implementation pending.') => (
  <p style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-muted)' }}>{msg}</p>
)

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [report, setReport]       = useState(null)
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/reports/admin')
      .then(res => { if (!cancelled) setReport(res.data) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  /* ── Derived data from API response ── */
  const overviewStats = [
    { id: 'rpt-students', icon: 'school',        label: 'Total Students', value: report?.totalStudents    ?? '—', delta: '', variant: 'primary'   },
    { id: 'rpt-faculty',  icon: 'groups',        label: 'Total Faculty',  value: report?.totalFaculty     ?? '—', delta: '', variant: 'secondary' },
    { id: 'rpt-pass',     icon: 'emoji_events',  label: 'Pass %',         value: report?.passPercent      ?? '—', delta: '', variant: 'success'   },
    { id: 'rpt-revenue',  icon: 'payments',      label: 'Revenue',        value: report?.revenueCollected ?? '—', delta: '', variant: 'tertiary'  },
  ]

  const passFailData        = report?.resultDistribution    ?? []
  const deptEnrollmentData  = report?.departmentEnrollment  ?? []
  const semesterResults     = report?.semesterResults       ?? []
  const monthlyAttendance   = report?.monthlyAttendance     ?? []
  const deptAttendance      = report?.departmentAttendance  ?? []
  const yearWiseEnrollment  = report?.yearWiseEnrollment    ?? []
  const deptWiseEnrollment  = report?.departmentWiseEnrollment ?? []

  return (
    <DashboardLayout>
      <div id="admin-reports-page">
        <div className="page-header">
          <h1>Administrative Reports</h1>
          <p>Comprehensive analytics and insights for institutional decision-making.</p>
        </div>

        <Tabs tabs={tabList} activeTab={activeTab} onChange={setActiveTab} id="reports-tabs" />

        {/* ══════ Overview Tab ══════ */}
        {activeTab === 'overview' && (
          <div id="reports-overview">
            <div className="stat-grid" id="reports-stat-grid">
              {overviewStats.map((s) => (
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

            <div className="dashboard-grid" id="overview-charts-grid">
              {/* Pie: Pass/Fail/Backlog */}
              <div className="section-panel" id="pass-fail-chart-panel">
                <div className="section-panel__header">
                  <span className="material-symbols-rounded">pie_chart</span>
                  <h2>Result Distribution</h2>
                </div>
                {loading ? noData('Loading…') : passFailData.length === 0 ? noData() : (
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={passFailData}
                          cx="50%" cy="50%"
                          innerRadius={60} outerRadius={100}
                          paddingAngle={4} dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {passFailData.map((_, idx) => (
                            <Cell key={`cell-${idx}`} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e0d6d0', fontSize: 13 }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Bar: Department Enrollment */}
              <div className="section-panel" id="dept-enrollment-chart-panel">
                <div className="section-panel__header">
                  <span className="material-symbols-rounded">bar_chart</span>
                  <h2>Department Enrollment</h2>
                </div>
                {loading ? noData('Loading…') : deptEnrollmentData.length === 0 ? noData() : (
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={deptEnrollmentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0d6d0" />
                        <XAxis dataKey="department" tick={{ fontSize: 13, fill: '#5d4037' }} />
                        <YAxis tick={{ fontSize: 13, fill: '#5d4037' }} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e0d6d0', fontSize: 13 }} />
                        <Bar dataKey="students" fill={COLORS.primary} radius={[6, 6, 0, 0]} maxBarSize={50} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════ Academic Tab ══════ */}
        {activeTab === 'academic' && (
          <div id="reports-academic">
            <div className="section-panel" id="semester-results-panel">
              <div className="section-panel__header">
                <span className="material-symbols-rounded">assignment</span>
                <h2>Semester-wise Results Summary</h2>
              </div>
              {loading ? noData('Loading…') : semesterResults.length === 0 ? noData() : (
                <table className="data-table" id="semester-results-table">
                  <thead>
                    <tr>
                      <th>Semester</th>
                      <th>Students</th>
                      <th>Pass %</th>
                      <th>Avg CGPA</th>
                      <th>Topper</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semesterResults.map((r, idx) => (
                      <tr key={idx} id={`sem-result-${idx + 1}`}>
                        <td><strong>{r.semester}</strong></td>
                        <td>{r.students ?? r.totalStudents ?? '—'}</td>
                        <td>
                          <span className={(r.passPercent ?? 0) >= 90 ? 'chip chip--success' : 'chip chip--primary'}>
                            {r.passPercent ?? '—'}{typeof r.passPercent === 'number' ? '%' : ''}
                          </span>
                        </td>
                        <td>{r.avgCGPA ?? '—'}</td>
                        <td>{r.toppers ?? r.topper ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ══════ Attendance Tab ══════ */}
        {activeTab === 'attendance' && (
          <div id="reports-attendance">
            <div className="section-panel" id="monthly-attendance-chart-panel" style={{ marginBottom: 'var(--space-5)' }}>
              <div className="section-panel__header">
                <span className="material-symbols-rounded">show_chart</span>
                <h2>Monthly Attendance Trend</h2>
              </div>
              {loading ? noData('Loading…') : monthlyAttendance.length === 0 ? noData() : (
                <div style={{ width: '100%', height: 320 }}>
                  <ResponsiveContainer>
                    <LineChart data={monthlyAttendance} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0d6d0" />
                      <XAxis dataKey="month" tick={{ fontSize: 13, fill: '#5d4037' }} />
                      <YAxis domain={[60, 100]} tick={{ fontSize: 13, fill: '#5d4037' }} unit="%" />
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Attendance']}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e0d6d0', fontSize: 13 }}
                      />
                      <Line type="monotone" dataKey="attendance" stroke={COLORS.primary} strokeWidth={3}
                        dot={{ fill: COLORS.primary, r: 5 }} activeDot={{ r: 7, fill: COLORS.primaryContainer }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="section-panel" id="dept-attendance-table-panel">
              <div className="section-panel__header">
                <span className="material-symbols-rounded">table_chart</span>
                <h2>Department-wise Attendance</h2>
              </div>
              {loading ? noData('Loading…') : deptAttendance.length === 0 ? noData() : (
                <table className="data-table" id="dept-attendance-report-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Total Students</th>
                      <th>Avg Attendance</th>
                      <th>Below 75%</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deptAttendance.map((d, idx) => (
                      <tr key={idx} id={`dept-att-${idx}`}>
                        <td><strong>{d.department}</strong></td>
                        <td>{d.totalStudents ?? '—'}</td>
                        <td>{d.avgAttendance ?? '—'}{typeof d.avgAttendance === 'number' ? '%' : ''}</td>
                        <td>{d.below75 ?? '—'}{typeof d.below75 === 'number' ? ' students' : ''}</td>
                        <td>
                          <span className={attendanceChip(d.avgAttendance ?? 0)}>
                            {(d.avgAttendance ?? 0) >= 85 ? 'Good' : (d.avgAttendance ?? 0) >= 75 ? 'Average' : 'Low'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ══════ Enrollment Tab ══════ */}
        {activeTab === 'enrollment' && (
          <div id="reports-enrollment">
            <div className="section-panel" id="yearwise-enrollment-chart-panel" style={{ marginBottom: 'var(--space-5)' }}>
              <div className="section-panel__header">
                <span className="material-symbols-rounded">trending_up</span>
                <h2>Year-wise Enrollment</h2>
              </div>
              {loading ? noData('Loading…') : yearWiseEnrollment.length === 0 ? noData() : (
                <div style={{ width: '100%', height: 320 }}>
                  <ResponsiveContainer>
                    <BarChart data={yearWiseEnrollment} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0d6d0" />
                      <XAxis dataKey="year" tick={{ fontSize: 13, fill: '#5d4037' }} />
                      <YAxis tick={{ fontSize: 13, fill: '#5d4037' }} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e0d6d0', fontSize: 13 }} />
                      <Bar dataKey="students" fill={COLORS.primaryContainer} radius={[6, 6, 0, 0]} maxBarSize={50} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="section-panel" id="deptwise-enrollment-table-panel">
              <div className="section-panel__header">
                <span className="material-symbols-rounded">group_add</span>
                <h2>Department-wise Enrollment</h2>
              </div>
              {loading ? noData('Loading…') : deptWiseEnrollment.length === 0 ? noData() : (
                <table className="data-table" id="deptwise-enrollment-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>UG Students</th>
                      <th>PG Students</th>
                      <th>Total</th>
                      <th>YoY Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deptWiseEnrollment.map((d, idx) => (
                      <tr key={idx} id={`dept-enr-${idx}`}>
                        <td><strong>{d.department}</strong></td>
                        <td>{d.ug ?? d.ugStudents ?? '—'}</td>
                        <td>{d.pg ?? d.pgStudents ?? '—'}</td>
                        <td>{d.total ?? d.totalStudents ?? '—'}</td>
                        <td><span className="chip chip--success">{d.growth ?? d.yoyGrowth ?? '—'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
