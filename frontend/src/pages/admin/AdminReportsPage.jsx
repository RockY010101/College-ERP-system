// ══════════════════════════════════════════════════════════════════════
// AdminReportsPage.jsx — Administrative Reports with multiple tabs
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import Tabs from '../../components/Tabs'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

/* ── Chart Colors ── */
const COLORS = {
  primary: '#a43700',
  primaryContainer: '#cd4700',
  secondary: '#feb300',
  secondaryDark: '#7e5700',
  success: '#2e7d32',
  error: '#ba1a1a',
}
const PIE_COLORS = [COLORS.success, COLORS.error, COLORS.secondary]

/* ── Tab Definitions ── */
const tabList = [
  { value: 'overview', label: 'Overview', icon: 'dashboard' },
  { value: 'academic', label: 'Academic', icon: 'school' },
  { value: 'attendance', label: 'Attendance', icon: 'fact_check' },
  { value: 'enrollment', label: 'Enrollment', icon: 'group_add' },
]

/* ── Overview Data ── */
const overviewStats = [
  { id: 'rpt-students', icon: 'school', label: 'Total Students', value: '1,247', delta: 'Across 4 departments', variant: 'primary' },
  { id: 'rpt-faculty', icon: 'groups', label: 'Total Faculty', value: '86', delta: '12:1 student-faculty ratio', variant: 'secondary' },
  { id: 'rpt-pass', icon: 'emoji_events', label: 'Pass %', value: '89.2%', delta: '+2.1% over last year', variant: 'success' },
  { id: 'rpt-revenue', icon: 'payments', label: 'Revenue', value: '₹4.8Cr', delta: 'FY 2025-26 collection', variant: 'tertiary' },
]

const passFailData = [
  { name: 'Passed', value: 1112 },
  { name: 'Failed', value: 78 },
  { name: 'Backlog', value: 57 },
]

const deptEnrollmentData = [
  { department: 'CSE', students: 420 },
  { department: 'ECE', students: 310 },
  { department: 'ME', students: 280 },
  { department: 'CE', students: 237 },
]

/* ── Academic Data ── */
const semesterResults = [
  { semester: 'Semester 1', students: 320, passPercent: 92.5, avgCGPA: 7.8, toppers: 'Aarav Sharma (9.6)' },
  { semester: 'Semester 2', students: 315, passPercent: 90.1, avgCGPA: 7.5, toppers: 'Priya Patel (9.5)' },
  { semester: 'Semester 3', students: 298, passPercent: 88.3, avgCGPA: 7.3, toppers: 'Sneha Iyer (9.7)' },
  { semester: 'Semester 4', students: 290, passPercent: 86.9, avgCGPA: 7.1, toppers: 'Vikram Singh (9.4)' },
  { semester: 'Semester 5', students: 275, passPercent: 89.8, avgCGPA: 7.4, toppers: 'Ananya Reddy (9.8)' },
  { semester: 'Semester 6', students: 268, passPercent: 91.0, avgCGPA: 7.6, toppers: 'Rohan Mehta (9.3)' },
  { semester: 'Semester 7', students: 255, passPercent: 93.2, avgCGPA: 7.9, toppers: 'Divya Nair (9.5)' },
  { semester: 'Semester 8', students: 248, passPercent: 95.1, avgCGPA: 8.1, toppers: 'Meera Joshi (9.9)' },
]

/* ── Attendance Data ── */
const monthlyAttendance = [
  { month: 'Jul', attendance: 88 },
  { month: 'Aug', attendance: 85 },
  { month: 'Sep', attendance: 82 },
  { month: 'Oct', attendance: 79 },
  { month: 'Nov', attendance: 83 },
  { month: 'Dec', attendance: 76 },
  { month: 'Jan', attendance: 84 },
  { month: 'Feb', attendance: 86 },
  { month: 'Mar', attendance: 81 },
  { month: 'Apr', attendance: 80 },
  { month: 'May', attendance: 82 },
]

const deptAttendance = [
  { department: 'Computer Science', totalStudents: 420, avgAttendance: 85, below75: 8 },
  { department: 'Electronics', totalStudents: 310, avgAttendance: 80, below75: 6 },
  { department: 'Mechanical', totalStudents: 280, avgAttendance: 78, below75: 5 },
  { department: 'Civil', totalStudents: 237, avgAttendance: 82, below75: 4 },
]

/* ── Enrollment Data ── */
const yearWiseEnrollment = [
  { year: '2021', students: 980 },
  { year: '2022', students: 1050 },
  { year: '2023', students: 1120 },
  { year: '2024', students: 1180 },
  { year: '2025', students: 1247 },
  { year: '2026', students: 1340 },
]

const deptWiseEnrollment = [
  { department: 'Computer Science', ug: 350, pg: 70, total: 420, growth: '+8.2%' },
  { department: 'Electronics', ug: 250, pg: 60, total: 310, growth: '+5.4%' },
  { department: 'Mechanical', ug: 230, pg: 50, total: 280, growth: '+3.7%' },
  { department: 'Civil', ug: 197, pg: 40, total: 237, growth: '+4.1%' },
]

/* ── Helper ── */
const attendanceChip = (pct) => {
  if (pct >= 85) return 'chip chip--success'
  if (pct >= 75) return 'chip chip--primary'
  return 'chip chip--error'
}

/* ── Component ── */
export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <DashboardLayout>
      <div id="admin-reports-page">
        {/* ── Page Header ── */}
        <div className="page-header">
          <h1>Administrative Reports</h1>
          <p>Comprehensive analytics and insights for institutional decision-making.</p>
        </div>

        {/* ── Tabs ── */}
        <Tabs tabs={tabList} activeTab={activeTab} onChange={setActiveTab} id="reports-tabs" />

        {/* ══════ Overview Tab ══════ */}
        {activeTab === 'overview' && (
          <div id="reports-overview">
            {/* Stat Cards */}
            <div className="stat-grid" id="reports-stat-grid">
              {overviewStats.map((s) => (
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

            {/* Charts */}
            <div className="dashboard-grid" id="overview-charts-grid">
              {/* Pie: Pass / Fail / Backlog */}
              <div className="section-panel" id="pass-fail-chart-panel">
                <div className="section-panel__header">
                  <span className="material-symbols-rounded">pie_chart</span>
                  <h2>Result Distribution</h2>
                </div>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={passFailData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
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
              </div>

              {/* Bar: Department Enrollment */}
              <div className="section-panel" id="dept-enrollment-chart-panel">
                <div className="section-panel__header">
                  <span className="material-symbols-rounded">bar_chart</span>
                  <h2>Department Enrollment</h2>
                </div>
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
                      <td>{r.students}</td>
                      <td>
                        <span className={r.passPercent >= 90 ? 'chip chip--success' : 'chip chip--primary'}>
                          {r.passPercent}%
                        </span>
                      </td>
                      <td>{r.avgCGPA}</td>
                      <td>{r.toppers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════ Attendance Tab ══════ */}
        {activeTab === 'attendance' && (
          <div id="reports-attendance">
            {/* Line Chart: Monthly Attendance Trend */}
            <div className="section-panel" id="monthly-attendance-chart-panel" style={{ marginBottom: 'var(--space-5)' }}>
              <div className="section-panel__header">
                <span className="material-symbols-rounded">show_chart</span>
                <h2>Monthly Attendance Trend</h2>
              </div>
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
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke={COLORS.primary}
                      strokeWidth={3}
                      dot={{ fill: COLORS.primary, r: 5 }}
                      activeDot={{ r: 7, fill: COLORS.primaryContainer }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Table: Department Attendance */}
            <div className="section-panel" id="dept-attendance-table-panel">
              <div className="section-panel__header">
                <span className="material-symbols-rounded">table_chart</span>
                <h2>Department-wise Attendance</h2>
              </div>
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
                      <td>{d.totalStudents}</td>
                      <td>{d.avgAttendance}%</td>
                      <td>{d.below75} students</td>
                      <td><span className={attendanceChip(d.avgAttendance)}>{d.avgAttendance >= 85 ? 'Good' : d.avgAttendance >= 75 ? 'Average' : 'Low'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════ Enrollment Tab ══════ */}
        {activeTab === 'enrollment' && (
          <div id="reports-enrollment">
            {/* Bar Chart: Year-wise Enrollment */}
            <div className="section-panel" id="yearwise-enrollment-chart-panel" style={{ marginBottom: 'var(--space-5)' }}>
              <div className="section-panel__header">
                <span className="material-symbols-rounded">trending_up</span>
                <h2>Year-wise Enrollment (2021–2026)</h2>
              </div>
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
            </div>

            {/* Table: Department-wise Enrollment */}
            <div className="section-panel" id="deptwise-enrollment-table-panel">
              <div className="section-panel__header">
                <span className="material-symbols-rounded">group_add</span>
                <h2>Department-wise Enrollment</h2>
              </div>
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
                      <td>{d.ug}</td>
                      <td>{d.pg}</td>
                      <td>{d.total}</td>
                      <td><span className="chip chip--success">{d.growth}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
