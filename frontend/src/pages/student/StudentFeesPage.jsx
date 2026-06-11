// ══════════════════════════════════════════════════════════════════════
// StudentFeesPage.jsx — Fee Payment View
// Data: GET /api/student/fees
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import apiClient from '../../services/apiClient'

const statusChip = (status) => {
  switch (status) {
    case 'Paid':    return 'success'
    case 'Partial': return 'neutral'
    case 'Pending': return 'error'
    default:        return 'neutral'
  }
}

const noDataRow = (cols, msg = 'No data available yet.') => (
  <tr><td colSpan={cols} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>{msg}</td></tr>
)

export default function StudentFeesPage() {
  const [feeSummary, setFeeSummary]     = useState(null)
  const [semFees, setSemFees]           = useState([])
  const [payHistory, setPayHistory]     = useState([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    let cancelled = false
    apiClient.get('/student/fees')
      .then(res => {
        if (!cancelled && res.data) {
          const d = res.data
          setFeeSummary(d.summary ?? null)
          setSemFees(Array.isArray(d.semesterFees) ? d.semesterFees : [])
          setPayHistory(Array.isArray(d.paymentHistory) ? d.paymentHistory : [])
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const pending = feeSummary?.pending ?? feeSummary?.pendingAmount ?? null

  return (
    <DashboardLayout>
      <div className="page-header" id="student-fees-header">
        <h1>Fee Details</h1>
        <p>View your fee structure, payment history, and outstanding dues</p>
      </div>

      {/* ── Fee Summary ── */}
      <div className="section-panel" id="fee-summary-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">account_balance</span>
          <h2>Fee Summary</h2>
        </div>
        {loading ? (
          <p style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>Loading…</p>
        ) : feeSummary ? (
          <>
            <div className="summary-row" id="summary-total-fee">
              <span className="summary-row__label">Total Fee</span>
              <span className="summary-row__value">{feeSummary.totalFee ?? feeSummary.total ?? '—'}</span>
            </div>
            <div className="summary-row" id="summary-paid">
              <span className="summary-row__label">Paid</span>
              <span className="summary-row__value summary-row__value--success">{feeSummary.paid ?? feeSummary.paidAmount ?? '—'}</span>
            </div>
            <div className="summary-row" id="summary-pending">
              <span className="summary-row__label">Pending</span>
              <span className="summary-row__value summary-row__value--error">{feeSummary.pending ?? feeSummary.pendingAmount ?? '—'}</span>
            </div>
            {(feeSummary.scholarship ?? feeSummary.scholarshipDiscount) && (
              <div className="summary-row" id="summary-scholarship">
                <span className="summary-row__label">Scholarship Discount</span>
                <span className="summary-row__value summary-row__value--primary">−{feeSummary.scholarship ?? feeSummary.scholarshipDiscount}</span>
              </div>
            )}
          </>
        ) : (
          <p style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>Fee summary not available yet.</p>
        )}
      </div>

      {/* ── Pay Now ── */}
      {pending && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
          <button className="btn btn-primary" id="btn-pay-now">
            <span className="material-symbols-rounded">payments</span>
            Pay Now {pending}
          </button>
        </div>
      )}

      {/* ── Semester-wise Breakdown ── */}
      <div className="section-panel" id="semester-fees-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">view_list</span>
          <h2>Semester-wise Breakdown</h2>
        </div>
        <table className="data-table" id="semester-fees-table">
          <thead>
            <tr>
              <th>Semester</th>
              <th>Tuition (₹)</th>
              <th>Lab (₹)</th>
              <th>Library (₹)</th>
              <th>Exam (₹)</th>
              <th>Total (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>Loading…</td></tr>
            ) : semFees.length === 0 ? noDataRow(7, 'No fee records available yet.') : (
              semFees.map((f, i) => (
                <tr key={f.id ?? f.feeId ?? i} id={`sf-${f.id ?? i}`}>
                  <td>{f.semester ?? `Semester ${i + 1}`}</td>
                  <td>{f.tuition ?? '—'}</td>
                  <td>{f.lab ?? f.labFee ?? '—'}</td>
                  <td>{f.library ?? f.libraryFee ?? '—'}</td>
                  <td>{f.exam ?? f.examFee ?? '—'}</td>
                  <td>{f.total ?? f.totalAmount ?? '—'}</td>
                  <td><span className={`chip chip--${statusChip(f.status)}`}>{f.status ?? '—'}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Payment History ── */}
      <div className="section-panel" id="payment-history-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">receipt_long</span>
          <h2>Payment History</h2>
        </div>
        <table className="data-table" id="payment-history-table">
          <thead>
            <tr>
              <th>Receipt No</th>
              <th>Amount (₹)</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Loading…</td></tr>
            ) : payHistory.length === 0 ? noDataRow(5, 'No payment history available yet.') : (
              payHistory.map((p, i) => (
                <tr key={p.id ?? p.receiptNo ?? i} id={`ph-${i}`}>
                  <td>{p.receipt ?? p.receiptNo ?? '—'}</td>
                  <td>{p.amount ?? p.amountPaid ?? '—'}</td>
                  <td>{p.date ?? p.paymentDate ?? '—'}</td>
                  <td>{p.method ?? p.paymentMethod ?? '—'}</td>
                  <td><span className={`chip chip--${statusChip(p.status ?? 'Paid')}`}>{p.status ?? '—'}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
