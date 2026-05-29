// ══════════════════════════════════════════════════════════════════════
// AccountantPaymentsPage.jsx — Payment Transactions
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'

/* ── Stat Cards ── */
const statCards = [
  { id: 'today-collection',    label: "Today's Collection",  value: '₹1,45,000', delta: '+18% vs yesterday', icon: 'payments',         variant: 'success'   },
  { id: 'pending-amount',      label: 'Pending Amount',      value: '₹8,32,000', delta: '142 students',      icon: 'pending_actions',  variant: 'error'     },
  { id: 'total-receipts',      label: 'Total Receipts',      value: '342',        delta: 'This semester',     icon: 'receipt_long',     variant: 'primary'   },
  { id: 'failed-transactions', label: 'Failed Transactions', value: '5',          delta: 'Needs attention',   icon: 'error_outline',    variant: 'secondary' },
]

/* ── Filter Options ── */
const dateRangeOptions = [
  { value: '',          label: 'All Time' },
  { value: 'today',     label: 'Today' },
  { value: 'week',      label: 'This Week' },
  { value: 'month',     label: 'This Month' },
  { value: 'semester',  label: 'This Semester' },
]

const methodOptions = [
  { value: '',              label: 'All Methods' },
  { value: 'UPI',           label: 'UPI' },
  { value: 'Bank Transfer', label: 'Bank Transfer' },
  { value: 'Cash',          label: 'Cash' },
  { value: 'Credit Card',   label: 'Credit Card' },
]

const statusOptions = [
  { value: '',          label: 'All Status' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Pending',   label: 'Pending' },
  { value: 'Failed',    label: 'Failed' },
]

/* ── Payment Data ── */
const payments = [
  { id: 'txn-1',  receipt: 'REC-2026-0342', student: 'Aarav Sharma',     course: 'B.Tech CSE',  amount: '52,000',  date: '29 May 2026', method: 'UPI',           status: 'Completed', chip: 'success' },
  { id: 'txn-2',  receipt: 'REC-2026-0341', student: 'Diya Patel',       course: 'MBA',         amount: '48,500',  date: '29 May 2026', method: 'Bank Transfer', status: 'Completed', chip: 'success' },
  { id: 'txn-3',  receipt: 'REC-2026-0340', student: 'Rohan Mehta',      course: 'B.Tech ECE',  amount: '25,000',  date: '28 May 2026', method: 'Cash',          status: 'Completed', chip: 'success' },
  { id: 'txn-4',  receipt: 'REC-2026-0339', student: 'Sneha Iyer',       course: 'B.Tech CSE',  amount: '52,000',  date: '28 May 2026', method: 'Credit Card',   status: 'Failed',    chip: 'error'   },
  { id: 'txn-5',  receipt: 'REC-2026-0338', student: 'Kabir Singh',      course: 'B.Sc Physics',amount: '30,000',  date: '27 May 2026', method: 'UPI',           status: 'Completed', chip: 'success' },
  { id: 'txn-6',  receipt: 'REC-2026-0337', student: 'Ananya Reddy',     course: 'B.Com',       amount: '22,500',  date: '27 May 2026', method: 'Bank Transfer', status: 'Pending',   chip: 'neutral' },
  { id: 'txn-7',  receipt: 'REC-2026-0336', student: 'Vivaan Gupta',     course: 'M.Tech',      amount: '65,000',  date: '26 May 2026', method: 'UPI',           status: 'Completed', chip: 'success' },
  { id: 'txn-8',  receipt: 'REC-2026-0335', student: 'Priya Nair',       course: 'MBA',         amount: '48,500',  date: '26 May 2026', method: 'Cash',          status: 'Completed', chip: 'success' },
  { id: 'txn-9',  receipt: 'REC-2026-0334', student: 'Arjun Das',        course: 'B.Tech ME',   amount: '52,000',  date: '25 May 2026', method: 'Credit Card',   status: 'Failed',    chip: 'error'   },
  { id: 'txn-10', receipt: 'REC-2026-0333', student: 'Meera Joshi',      course: 'B.Sc Chem',   amount: '28,000',  date: '25 May 2026', method: 'UPI',           status: 'Completed', chip: 'success' },
  { id: 'txn-11', receipt: 'REC-2026-0332', student: 'Ishaan Verma',     course: 'B.Tech CSE',  amount: '52,000',  date: '24 May 2026', method: 'Bank Transfer', status: 'Pending',   chip: 'neutral' },
  { id: 'txn-12', receipt: 'REC-2026-0331', student: 'Kavya Pillai',     course: 'B.Com',       amount: '22,500',  date: '24 May 2026', method: 'UPI',           status: 'Completed', chip: 'success' },
]

export default function AccountantPaymentsPage() {
  const [search, setSearch] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [methodFilter, setMethodFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = payments.filter((p) => {
    if (search) {
      const q = search.toLowerCase()
      if (!p.student.toLowerCase().includes(q) && !p.receipt.toLowerCase().includes(q)) return false
    }
    if (methodFilter && p.method !== methodFilter) return false
    if (statusFilter && p.status !== statusFilter) return false
    return true
  })

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="page-header" id="payments-page-header">
        <h1>Payment Transactions</h1>
        <p>Track all fee payments, receipts, and transaction statuses</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-grid" id="payments-stat-grid">
        {statCards.map((card) => (
          <div className="stat-card" key={card.id} id={card.id}>
            <div className={`stat-card__icon stat-card__icon--${card.variant}`}>
              <span className="material-symbols-rounded">{card.icon}</span>
            </div>
            <div className="stat-card__info">
              <span className="stat-card__label">{card.label}</span>
              <span className="stat-card__value">{card.value}</span>
              <span className="stat-card__delta">{card.delta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="toolbar" id="payments-toolbar">
        <SearchBar
          placeholder="Search by student name or receipt…"
          value={search}
          onChange={setSearch}
          id="payments-search"
        />
        <FilterDropdown
          label="Period"
          options={dateRangeOptions}
          value={dateRange}
          onChange={setDateRange}
          id="filter-date-range"
        />
        <FilterDropdown
          label="Method"
          options={methodOptions}
          value={methodFilter}
          onChange={setMethodFilter}
          id="filter-method"
        />
        <FilterDropdown
          label="Status"
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          id="filter-status"
        />
      </div>

      {/* ── Payments Table ── */}
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
            {filtered.map((p) => (
              <tr key={p.id} id={p.id}>
                <td>{p.receipt}</td>
                <td>{p.student}</td>
                <td>{p.course}</td>
                <td>₹{p.amount}</td>
                <td>{p.date}</td>
                <td>{p.method}</td>
                <td>
                  <span className={`chip chip--${p.chip}`}>{p.status}</span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="btn-icon" title="View Details">
                      <span className="material-symbols-rounded">visibility</span>
                    </button>
                    <button className="btn-icon" title="Print Receipt">
                      <span className="material-symbols-rounded">print</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
