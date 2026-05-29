// ══════════════════════════════════════════════════════════════════════
// AccountantReportsPage.jsx — Financial Reports
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import Tabs from '../../components/Tabs'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

/* ── Chart Colors ── */
const COLORS = {
  primary:   '#a43700',
  container: '#cd4700',
  secondary: '#feb300',
  secDark:   '#7e5700',
  success:   '#2e7d32',
  error:     '#ba1a1a',
}

/* ── Revenue Tab Data ── */
const revenueStats = [
  { id: 'total-revenue', label: 'Total Revenue',   value: '₹2,84,50,000', delta: 'FY 2025-26',         icon: 'account_balance', variant: 'primary'   },
  { id: 'monthly-avg',   label: 'Monthly Average',  value: '₹23,70,833',   delta: 'Across 12 months',   icon: 'trending_up',     variant: 'secondary' },
  { id: 'yoy-growth',    label: 'YoY Growth',       value: '+14.3%',        delta: 'vs FY 2024-25',      icon: 'show_chart',      variant: 'success'   },
]

const monthlyRevenue = [
  { month: 'Apr',  revenue: 3200000 },
  { month: 'May',  revenue: 2800000 },
  { month: 'Jun',  revenue: 1500000 },
  { month: 'Jul',  revenue: 4500000 },
  { month: 'Aug',  revenue: 3800000 },
  { month: 'Sep',  revenue: 2200000 },
  { month: 'Oct',  revenue: 1800000 },
  { month: 'Nov',  revenue: 1200000 },
  { month: 'Dec',  revenue: 1600000 },
  { month: 'Jan',  revenue: 3400000 },
  { month: 'Feb',  revenue: 2500000 },
  { month: 'Mar',  revenue: 0       },
]

/* ── Collections Tab Data ── */
const methodBreakdown = [
  { name: 'UPI',           value: 42, color: COLORS.primary   },
  { name: 'Bank Transfer', value: 28, color: COLORS.container },
  { name: 'Cash',          value: 18, color: COLORS.secondary },
  { name: 'Credit Card',   value: 12, color: COLORS.secDark   },
]

const semesterCollection = [
  { semester: 'Sem 1', collected: 4200000, target: 4500000 },
  { semester: 'Sem 2', collected: 3800000, target: 4200000 },
  { semester: 'Sem 3', collected: 3500000, target: 4000000 },
  { semester: 'Sem 4', collected: 2800000, target: 3800000 },
  { semester: 'Sem 5', collected: 2200000, target: 3500000 },
  { semester: 'Sem 6', collected: 1900000, target: 2800000 },
]

/* ── Defaulters Tab Data ── */
const defaulters = [
  { id: 'd-1', name: 'Rahul Verma',     course: 'B.Tech CSE',   semester: '5', pending: '52,000',  dueDate: '15 Apr 2026', daysOverdue: 45, status: 'Critical' },
  { id: 'd-2', name: 'Pooja Sharma',    course: 'MBA',          semester: '3', pending: '1,20,000',dueDate: '01 Apr 2026', daysOverdue: 59, status: 'Critical' },
  { id: 'd-3', name: 'Amit Kulkarni',   course: 'B.Tech ECE',   semester: '4', pending: '35,000',  dueDate: '20 Apr 2026', daysOverdue: 40, status: 'Critical' },
  { id: 'd-4', name: 'Neha Agarwal',    course: 'B.Sc Physics', semester: '2', pending: '18,500',  dueDate: '01 May 2026', daysOverdue: 29, status: 'Warning'  },
  { id: 'd-5', name: 'Siddharth Jain',  course: 'B.Com',        semester: '6', pending: '22,500',  dueDate: '10 May 2026', daysOverdue: 20, status: 'Warning'  },
  { id: 'd-6', name: 'Tanvi Deshmukh',  course: 'M.Tech',       semester: '2', pending: '65,000',  dueDate: '15 May 2026', daysOverdue: 15, status: 'Warning'  },
  { id: 'd-7', name: 'Karthik Nair',    course: 'B.Tech ME',    semester: '3', pending: '42,000',  dueDate: '20 May 2026', daysOverdue: 10, status: 'Overdue'  },
  { id: 'd-8', name: 'Riya Chatterjee', course: 'MBA',          semester: '1', pending: '95,000',  dueDate: '25 May 2026', daysOverdue: 5,  status: 'Overdue'  },
]

const tabList = [
  { value: 'revenue',     label: 'Revenue',     icon: 'trending_up'    },
  { value: 'collections', label: 'Collections', icon: 'pie_chart'      },
  { value: 'defaulters',  label: 'Defaulters',  icon: 'warning'        },
]

const formatINR = (v) => `₹${(v / 100000).toFixed(1)}L`

export default function AccountantReportsPage() {
  const [activeTab, setActiveTab] = useState('revenue')

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="page-header" id="reports-page-header">
        <h1>Financial Reports</h1>
        <p>Revenue analytics, collection insights, and defaulter tracking</p>
      </div>

      {/* ── Tabs ── */}
      <Tabs tabs={tabList} activeTab={activeTab} onChange={setActiveTab} id="reports-tabs" />

      {/* ════════════ Revenue Tab ════════════ */}
      {activeTab === 'revenue' && (
        <>
          <div className="stat-grid" id="revenue-stat-grid">
            {revenueStats.map((s) => (
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

          <div className="section-panel" id="revenue-chart-panel">
            <div className="section-panel__header">
              <h2>Monthly Revenue (FY 2025-26)</h2>
            </div>
            <ResponsiveContainer width="100%" height={340}>
              <LineChart data={monthlyRevenue} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatINR} />
                <Tooltip formatter={(v) => [`₹${(v / 100000).toFixed(2)} L`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke={COLORS.primary} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* ════════════ Collections Tab ════════════ */}
      {activeTab === 'collections' && (
        <div className="dashboard-grid" id="collections-grid">
          <div className="section-panel" id="method-breakdown-panel">
            <div className="section-panel__header">
              <h2>Collection by Method</h2>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={methodBreakdown}
                  cx="50%" cy="50%"
                  innerRadius={60} outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value}%)`}
                >
                  {methodBreakdown.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="section-panel" id="semester-collection-panel">
            <div className="section-panel__header">
              <h2>Semester-wise Collection vs Target</h2>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={semesterCollection} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis tickFormatter={formatINR} />
                <Tooltip formatter={(v) => [`₹${(v / 100000).toFixed(1)} L`]} />
                <Legend />
                <Bar dataKey="collected" fill={COLORS.primary}   name="Collected" radius={[4,4,0,0]} />
                <Bar dataKey="target"    fill={COLORS.secondary} name="Target"    radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ════════════ Defaulters Tab ════════════ */}
      {activeTab === 'defaulters' && (
        <div className="section-panel" id="defaulters-panel">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">warning</span>
            <h2>Fee Defaulters ({defaulters.length})</h2>
          </div>
          <table className="data-table" id="defaulters-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Pending Amount (₹)</th>
                <th>Due Date</th>
                <th>Days Overdue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {defaulters.map((d) => (
                <tr key={d.id} id={d.id}>
                  <td>{d.name}</td>
                  <td>{d.course}</td>
                  <td>Sem {d.semester}</td>
                  <td>₹{d.pending}</td>
                  <td>{d.dueDate}</td>
                  <td>{d.daysOverdue}</td>
                  <td>
                    <span className="chip chip--error">{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  )
}
