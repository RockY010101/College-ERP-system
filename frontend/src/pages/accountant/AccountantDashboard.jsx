import DashboardLayout from '../../components/DashboardLayout';

const statCards = [
  { id: 'total-revenue',   label: 'Total Revenue',   value: '₹24,56,000', delta: '+12% this month',  icon: 'account_balance',  variant: 'primary'   },
  { id: 'pending-fees',    label: 'Pending Fees',     value: '₹8,32,000',  delta: '142 students',     icon: 'pending_actions',  variant: 'secondary' },
  { id: 'collected-today', label: 'Collected Today',  value: '₹1,45,000',  delta: '+18% vs yesterday',icon: 'payments',         variant: 'success'   },
  { id: 'defaulters',      label: 'Defaulters',       value: '34',          delta: '-3 this week',     icon: 'warning',          variant: 'error'     },
];

const recentPayments = [
  { id: 'pay-1', student: 'Aarav Sharma',   amount: '₹52,000', date: '20 May 2026', method: 'UPI',             status: 'Completed', statusChip: 'success' },
  { id: 'pay-2', student: 'Diya Patel',     amount: '₹48,500', date: '20 May 2026', method: 'Bank Transfer',   status: 'Completed', statusChip: 'success' },
  { id: 'pay-3', student: 'Rohan Mehta',    amount: '₹25,000', date: '19 May 2026', method: 'Cash',            status: 'Completed', statusChip: 'success' },
  { id: 'pay-4', student: 'Sneha Iyer',     amount: '₹52,000', date: '19 May 2026', method: 'Credit Card',     status: 'Failed',    statusChip: 'error'   },
  { id: 'pay-5', student: 'Kabir Singh',    amount: '₹30,000', date: '18 May 2026', method: 'UPI',             status: 'Completed', statusChip: 'success' },
];

const feeProgress = [
  { id: 'sem-1', label: 'Semester 1', percent: 92 },
  { id: 'sem-2', label: 'Semester 2', percent: 78 },
  { id: 'sem-3', label: 'Semester 3', percent: 65 },
  { id: 'sem-4', label: 'Semester 4', percent: 45 },
];

export default function AccountantDashboard() {
  return (
    <DashboardLayout>
      {/* ---- Page Header ---- */}
      <div className="page-header" id="accountant-page-header">
        <h1>Financial Overview</h1>
        <p>Fee collection, payments, and financial reports</p>
      </div>

      {/* ---- Stat Cards ---- */}
      <div className="stat-grid" id="accountant-stat-grid">
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

      {/* ---- Two-Column Sections ---- */}
      <div className="dashboard-grid" id="accountant-dashboard-grid">

        {/* Recent Payments Table */}
        <div className="section-panel" id="recent-payments-panel">
          <div className="section-panel__header">
            <h2>Recent Payments</h2>
          </div>
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
              {recentPayments.map((p) => (
                <tr key={p.id} id={p.id}>
                  <td>{p.student}</td>
                  <td>{p.amount}</td>
                  <td>{p.date}</td>
                  <td>{p.method}</td>
                  <td>
                    <span className={`chip chip--${p.statusChip}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fee Collection Progress */}
        <div className="section-panel" id="fee-collection-panel">
          <div className="section-panel__header">
            <h2>Fee Collection Progress</h2>
          </div>
          <div id="fee-progress-list">
            {feeProgress.map((sem) => (
              <div key={sem.id} id={sem.id} style={{ marginBottom: '1.25rem' }}>
                <div className="stat-card__label" style={{ marginBottom: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{sem.label}</span>
                  <span>{sem.percent}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar__fill"
                    style={{ width: `${sem.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
