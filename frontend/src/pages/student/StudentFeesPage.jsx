// ══════════════════════════════════════════════════════════════════════
// StudentFeesPage.jsx — Fee Payment View
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'

/* ── Semester-wise Fee Breakdown ── */
const semesterFees = [
  { id: 'sf-1', semester: 'Semester 1', tuition: '25,000', lab: '5,000', library: '1,000', exam: '2,000', total: '33,000', status: 'Paid',    chip: 'success' },
  { id: 'sf-2', semester: 'Semester 2', tuition: '25,000', lab: '5,000', library: '1,000', exam: '2,000', total: '33,000', status: 'Paid',    chip: 'success' },
  { id: 'sf-3', semester: 'Semester 3', tuition: '25,000', lab: '5,000', library: '1,000', exam: '2,000', total: '33,000', status: 'Paid',    chip: 'success' },
  { id: 'sf-4', semester: 'Semester 4', tuition: '25,000', lab: '5,000', library: '1,000', exam: '2,000', total: '33,000', status: 'Partial', chip: 'neutral' },
  { id: 'sf-5', semester: 'Semester 5', tuition: '25,000', lab: '5,000', library: '1,000', exam: '2,000', total: '33,000', status: 'Pending', chip: 'error'   },
]

/* ── Payment History ── */
const paymentHistory = [
  { id: 'ph-1', receipt: 'REC-2026-0198', amount: '33,000',  date: '10 Jan 2026', method: 'UPI',           status: 'Completed', chip: 'success' },
  { id: 'ph-2', receipt: 'REC-2025-0856', amount: '33,000',  date: '05 Jul 2025', method: 'Bank Transfer', status: 'Completed', chip: 'success' },
  { id: 'ph-3', receipt: 'REC-2025-0412', amount: '33,000',  date: '12 Jan 2025', method: 'UPI',           status: 'Completed', chip: 'success' },
  { id: 'ph-4', receipt: 'REC-2024-0891', amount: '25,000',  date: '08 Jul 2024', method: 'Cash',          status: 'Completed', chip: 'success' },
  { id: 'ph-5', receipt: 'REC-2024-0890', amount: '8,000',   date: '15 Aug 2024', method: 'UPI',           status: 'Completed', chip: 'success' },
  { id: 'ph-6', receipt: 'REC-2024-0320', amount: '5,500',   date: '20 Jan 2024', method: 'Credit Card',   status: 'Failed',    chip: 'error'   },
]

export default function StudentFeesPage() {
  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
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
        <div className="summary-row" id="summary-total-fee">
          <span className="summary-row__label">Total Fee</span>
          <span className="summary-row__value">₹1,25,000</span>
        </div>
        <div className="summary-row" id="summary-paid">
          <span className="summary-row__label">Paid</span>
          <span className="summary-row__value summary-row__value--success">₹1,12,500</span>
        </div>
        <div className="summary-row" id="summary-pending">
          <span className="summary-row__label">Pending</span>
          <span className="summary-row__value summary-row__value--error">₹12,500</span>
        </div>
        <div className="summary-row" id="summary-scholarship">
          <span className="summary-row__label">Scholarship Discount</span>
          <span className="summary-row__value summary-row__value--primary">−₹25,000</span>
        </div>
      </div>

      {/* ── Pay Now Button ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button className="btn btn-primary" id="btn-pay-now">
          <span className="material-symbols-rounded">payments</span>
          Pay Now ₹12,500
        </button>
      </div>

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
            {semesterFees.map((f) => (
              <tr key={f.id} id={f.id}>
                <td>{f.semester}</td>
                <td>₹{f.tuition}</td>
                <td>₹{f.lab}</td>
                <td>₹{f.library}</td>
                <td>₹{f.exam}</td>
                <td>₹{f.total}</td>
                <td>
                  <span className={`chip chip--${f.chip}`}>{f.status}</span>
                </td>
              </tr>
            ))}
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
            {paymentHistory.map((p) => (
              <tr key={p.id} id={p.id}>
                <td>{p.receipt}</td>
                <td>₹{p.amount}</td>
                <td>{p.date}</td>
                <td>{p.method}</td>
                <td>
                  <span className={`chip chip--${p.chip}`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
