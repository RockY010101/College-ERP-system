// ══════════════════════════════════════════════════════════════════════
// AccountantDashboard.jsx — Financial Overview
// Data: GET /api/accountant/dashboard
// ══════════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import apiClient from '../../services/apiClient'

const statusChip = (s) => s === 'Completed' ? 'success' : s === 'Failed' ? 'error' : 'neutral'

const noData = (msg = 'No data available yet.') => (
  <p style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>{msg}</p>
)

export default function AccountantDashboard() {
  const [summary, setSummary]       = useState(null)
  const [payments, setPayments]     = useState([])
  const [feeProgress, setFeeProgress] = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/accountant/dashboard')
      .then(res => {
        if (!cancelled && res.data) {
          const d = res.data
          setSummary(d.summary ?? null)
          setPayments(Array.isArray(d.recentPayments) ? d.recentPayments : [])
          setFeeProgress(Array.isArray(d.feeCollectionProgress) ? d.feeCollectionProgress : [])
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const statCards = [
    { id: 'total-revenue',   label: 'Total Revenue',   value: summary?.totalRevenue   ?? '—', delta: '', icon: 'account_balance', variant: 'primary'   },
    { id: 'pending-fees',    label: 'Pending Fees',     value: summary?.pendingFees    ?? '—', delta: '', icon: 'pending_actions', variant: 'secondary' },
    { id: 'collected-today', label: 'Collected Today',  value: summary?.collectedToday ?? '—', delta: '', icon: 'payments',        variant: 'success'   },
    { id: 'defaulters',      label: 'Defaulters',       value: summary?.defaulters     ?? '—', delta: '', icon: 'warning',         variant: 'error'     },
  ]

  return (
    <DashboardLayout>
      <div className="page-header" id="accountant-page-header">
        <h1>Financial Overview</h1>
        <p>Fee collection, payments, and financial reports</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-grid" id="accountant-stat-grid">
        {statCards.map((card) => (
          <div className="stat-card" key={card.id} id={card.id}>
            <div className={`stat-card__icon stat-card__icon--${card.variant}`}>
              <span className="material-symbols-rounded">{card.icon}</span>
            </div>
            <div className="stat-card__info">
              <span className="stat-card__label">{card.label}</span>
              <span className="stat-card__value">{card.value}</span>
              {card.delta && <span className="stat-card__delta">{card.delta}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid" id="accountant-dashboard-grid">
        {/* Recent Payments */}
        <div className="section-panel" id="recent-payments-panel">
          <div className="section-panel__header">
            <h2>Recent Payments</h2>
          </div>
          {loading ? noData('Loading…') : payments.length === 0 ? noData('No payment records available yet.') : (
            <table className="data-table" id="recent-payments-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr key={p.id ?? p.receiptNo ?? i} id={`pay-${i}`}>
                    <td>{p.student ?? p.studentName ?? '—'}</td>
                    <td>{p.amount ?? p.amountPaid ?? '—'}</td>
                    <td>{p.date ?? p.paymentDate ?? '—'}</td>
                    <td>{p.method ?? p.paymentMethod ?? '—'}</td>
                    <td><span className={`chip chip--${statusChip(p.status)}`}>{p.status ?? '—'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Fee Collection Progress */}
        <div className="section-panel" id="fee-collection-panel">
          <div className="section-panel__header">
            <h2>Fee Collection Progress</h2>
          </div>
          {loading ? noData('Loading…') : feeProgress.length === 0 ? noData('No collection progress data available yet.') : (
            <div id="fee-progress-list">
              {feeProgress.map((sem, i) => (
                <div key={sem.id ?? i} id={`sem-prog-${i}`} style={{ marginBottom: '1.25rem' }}>
                  <div className="stat-card__label" style={{ marginBottom: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{sem.label ?? sem.semester ?? `Semester ${i + 1}`}</span>
                    <span>{sem.percent ?? sem.percentage ?? 0}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar__fill" style={{ width: `${sem.percent ?? sem.percentage ?? 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
