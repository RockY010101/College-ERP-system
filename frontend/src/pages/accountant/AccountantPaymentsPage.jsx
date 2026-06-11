// ══════════════════════════════════════════════════════════════════════
// AccountantPaymentsPage.jsx — Payment Transactions
// Data: GET /api/accountant/payments
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import apiClient from '../../services/apiClient'

const dateRangeOptions = [
  { value: '',         label: 'All Time'      },
  { value: 'today',    label: 'Today'         },
  { value: 'week',     label: 'This Week'     },
  { value: 'month',    label: 'This Month'    },
  { value: 'semester', label: 'This Semester' },
]
const statusOptions = [
  { value: '',          label: 'All Status'  },
  { value: 'Completed', label: 'Completed'   },
  { value: 'Pending',   label: 'Pending'     },
  { value: 'Failed',    label: 'Failed'      },
]

const statusChip = (s) => s === 'Completed' ? 'success' : s === 'Failed' ? 'error' : 'neutral'

export default function AccountantPaymentsPage() {
  const [payments, setPayments]         = useState([])
  const [summary, setSummary]           = useState(null)
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [dateRange, setDateRange]       = useState('')
  const [methodFilter, setMethodFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    let cancelled = false
    apiClient.get('/accountant/payments')
      .then(res => {
        if (!cancelled) {
          const d = res.data
          if (Array.isArray(d)) {
            setPayments(d)
          } else if (d && typeof d === 'object') {
            setPayments(Array.isArray(d.payments) ? d.payments : [])
            setSummary(d.summary ?? null)
          }
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Build method options dynamically
  const methodOptions = useMemo(() => {
    const methods = [...new Set(payments.map(p => p.method ?? p.paymentMethod).filter(Boolean))]
    return [{ value: '', label: 'All Methods' }, ...methods.map(m => ({ value: m, label: m }))]
  }, [payments])

  const filtered = useMemo(() => payments.filter(p => {
    const name = (p.student ?? p.studentName ?? '').toLowerCase()
    const receipt = (p.receipt ?? p.receiptNo ?? '').toLowerCase()
    if (search && !name.includes(search.toLowerCase()) && !receipt.includes(search.toLowerCase())) return false
    if (methodFilter && (p.method ?? p.paymentMethod) !== methodFilter) return false
    if (statusFilter && p.status !== statusFilter) return false
    return true
  }), [payments, search, methodFilter, statusFilter])

  const statCards = [
    { id: 'today-collection',    label: "Today's Collection",  value: summary?.todayCollection    ?? '—', delta: '', icon: 'payments',        variant: 'success'   },
    { id: 'pending-amount',      label: 'Pending Amount',      value: summary?.pendingAmount       ?? '—', delta: '', icon: 'pending_actions', variant: 'error'     },
    { id: 'total-receipts',      label: 'Total Receipts',      value: summary?.totalReceipts       ?? '—', delta: '', icon: 'receipt_long',    variant: 'primary'   },
    { id: 'failed-transactions', label: 'Failed Transactions', value: summary?.failedTransactions  ?? '—', delta: '', icon: 'error_outline',   variant: 'secondary' },
  ]

  return (
    <DashboardLayout>
      <div className="page-header" id="payments-page-header">
        <h1>Payment Transactions</h1>
        <p>Track all fee payments, receipts, and transaction statuses</p>
      </div>

      <div className="stat-grid" id="payments-stat-grid">
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

      <div className="toolbar" id="payments-toolbar">
        <SearchBar placeholder="Search by student name or receipt…" value={search} onChange={setSearch} id="payments-search" />
        <FilterDropdown label="Period" options={dateRangeOptions} value={dateRange} onChange={setDateRange} id="filter-date-range" />
        <FilterDropdown label="Method" options={methodOptions} value={methodFilter} onChange={setMethodFilter} id="filter-method" />
        <FilterDropdown label="Status" options={statusOptions} value={statusFilter} onChange={setStatusFilter} id="filter-status" />
      </div>

      <div className="section-panel" id="payments-table-panel">
        <div className="section-panel__header">
          <h2>Transactions ({filtered.length})</h2>
        </div>
        <table className="data-table" id="payments-table">
          <thead>
            <tr>
              <th>Receipt No</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Amount (₹)</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>No transaction records available yet.</td></tr>
            ) : (
              filtered.map((p, i) => (
                <tr key={p.id ?? p.receiptNo ?? i} id={`txn-${i}`}>
                  <td>{p.receipt ?? p.receiptNo ?? '—'}</td>
                  <td>{p.student ?? p.studentName ?? '—'}</td>
                  <td>{p.course ?? p.courseName ?? '—'}</td>
                  <td>{p.amount ?? p.amountPaid ?? '—'}</td>
                  <td>{p.date ?? p.paymentDate ?? '—'}</td>
                  <td>{p.method ?? p.paymentMethod ?? '—'}</td>
                  <td><span className={`chip chip--${statusChip(p.status ?? '')}`}>{p.status ?? '—'}</span></td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn-icon" title="View Details" id={`view-txn-${i}`}>
                        <span className="material-symbols-rounded">visibility</span>
                      </button>
                      <button className="btn-icon" title="Print Receipt" id={`print-txn-${i}`}>
                        <span className="material-symbols-rounded">print</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
