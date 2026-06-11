// ══════════════════════════════════════════════════════════════════════
// AccountantReportsPage.jsx — Financial Reports (tabbed)
// Data: GET /api/accountant/reports
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import Tabs from '../../components/Tabs'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import apiClient from '../../services/apiClient'

const COLORS = {
  primary:   '#a43700',
  container: '#cd4700',
  secondary: '#feb300',
  secDark:   '#7e5700',
  success:   '#2e7d32',
  error:     '#ba1a1a',
}
const PIE_COLORS = [COLORS.primary, COLORS.container, COLORS.secondary, COLORS.secDark]

const tabList = [
  { value: 'revenue',     label: 'Revenue',     icon: 'trending_up' },
  { value: 'collections', label: 'Collections', icon: 'pie_chart'   },
  { value: 'defaulters',  label: 'Defaulters',  icon: 'warning'     },
]

const formatINR = (v) => `₹${(v / 100000).toFixed(1)}L`

const noData = (msg = 'No data available yet — backend implementation pending.') => (
  <p style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-muted)' }}>{msg}</p>
)

export default function AccountantReportsPage() {
  const [activeTab, setActiveTab] = useState('revenue')
  const [report, setReport]       = useState(null)
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/accountant/reports')
      .then(res => { if (!cancelled) setReport(res.data ?? null) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const revenueStats    = report?.revenueStats       ?? []
  const monthlyRevenue  = report?.monthlyRevenue     ?? []
  const methodBreakdown = report?.methodBreakdown    ?? []
  const semCollection   = report?.semesterCollection ?? []
  const defaulters      = report?.defaulters         ?? []

  return (
    <DashboardLayout>
      <div className="page-header" id="reports-page-header">
        <h1>Financial Reports</h1>
        <p>Revenue analytics, collection insights, and defaulter tracking</p>
      </div>

      <Tabs tabs={tabList} activeTab={activeTab} onChange={setActiveTab} id="reports-tabs" />

      {/* ════ Revenue Tab ════ */}
      {activeTab === 'revenue' && (
        <>
          {/* Stat Cards */}
          <div className="stat-grid" id="revenue-stat-grid">
            {revenueStats.length === 0 ? (
              [
                { id: 'total-revenue', label: 'Total Revenue',  value: report?.totalRevenue  ?? '—', icon: 'account_balance', variant: 'primary'   },
                { id: 'monthly-avg',   label: 'Monthly Average',value: report?.monthlyAvg    ?? '—', icon: 'trending_up',     variant: 'secondary' },
                { id: 'yoy-growth',    label: 'YoY Growth',     value: report?.yoyGrowth     ?? '—', icon: 'show_chart',      variant: 'success'   },
              ].map(s => (
                <div className="stat-card" key={s.id} id={s.id}>
                  <div className={`stat-card__icon stat-card__icon--${s.variant}`}>
                    <span className="material-symbols-rounded">{s.icon}</span>
                  </div>
                  <div className="stat-card__info">
                    <span className="stat-card__label">{s.label}</span>
                    <span className="stat-card__value">{s.value}</span>
                  </div>
                </div>
              ))
            ) : revenueStats.map((s, i) => (
              <div className="stat-card" key={s.id ?? i} id={s.id ?? `rev-stat-${i}`}>
                <div className={`stat-card__icon stat-card__icon--${s.variant ?? 'primary'}`}>
                  <span className="material-symbols-rounded">{s.icon ?? 'payments'}</span>
                </div>
                <div className="stat-card__info">
                  <span className="stat-card__label">{s.label}</span>
                  <span className="stat-card__value">{s.value}</span>
                  {s.delta && <span className="stat-card__delta">{s.delta}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="section-panel" id="revenue-chart-panel">
            <div className="section-panel__header">
              <h2>Monthly Revenue</h2>
            </div>
            {loading ? noData('Loading…') : monthlyRevenue.length === 0 ? noData() : (
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
            )}
          </div>
        </>
      )}

      {/* ════ Collections Tab ════ */}
      {activeTab === 'collections' && (
        <div className="dashboard-grid" id="collections-grid">
          <div className="section-panel" id="method-breakdown-panel">
            <div className="section-panel__header"><h2>Collection by Method</h2></div>
            {loading ? noData('Loading…') : methodBreakdown.length === 0 ? noData() : (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={methodBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={110} paddingAngle={3} dataKey="value"
                    label={({ name, value }) => `${name} (${value}%)`}>
                    {methodBreakdown.map((_, i) => <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="section-panel" id="semester-collection-panel">
            <div className="section-panel__header"><h2>Semester-wise Collection vs Target</h2></div>
            {loading ? noData('Loading…') : semCollection.length === 0 ? noData() : (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={semCollection} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis tickFormatter={formatINR} />
                  <Tooltip formatter={(v) => [`₹${(v / 100000).toFixed(1)} L`]} />
                  <Legend />
                  <Bar dataKey="collected" fill={COLORS.primary}   name="Collected" radius={[4,4,0,0]} />
                  <Bar dataKey="target"    fill={COLORS.secondary} name="Target"    radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}

      {/* ════ Defaulters Tab ════ */}
      {activeTab === 'defaulters' && (
        <div className="section-panel" id="defaulters-panel">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">warning</span>
            <h2>Fee Defaulters ({defaulters.length})</h2>
          </div>
          {loading ? noData('Loading…') : defaulters.length === 0 ? noData('No defaulter records available yet.') : (
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
                {defaulters.map((d, i) => (
                  <tr key={d.id ?? i} id={`def-${i}`}>
                    <td>{d.name ?? d.studentName ?? '—'}</td>
                    <td>{d.course ?? d.courseName ?? '—'}</td>
                    <td>{d.semester ? `Sem ${d.semester}` : '—'}</td>
                    <td>₹{d.pending ?? d.pendingAmount ?? '—'}</td>
                    <td>{d.dueDate ?? '—'}</td>
                    <td>{d.daysOverdue ?? '—'}</td>
                    <td><span className="chip chip--error">{d.status ?? 'Overdue'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </DashboardLayout>
  )
}
