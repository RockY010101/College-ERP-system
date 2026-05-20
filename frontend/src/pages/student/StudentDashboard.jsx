import DashboardLayout from '../../components/DashboardLayout';

const stats = [
  { id: 'cgpa',       icon: 'school',           label: 'Current CGPA',  value: '8.42',    delta: '+0.18 from last sem', variant: 'primary'   },
  { id: 'attendance', icon: 'event_available',   label: 'Attendance',    value: '91.2%',   delta: 'Above 75% cutoff',    variant: 'success'   },
  { id: 'fees',       icon: 'account_balance',   label: 'Pending Fees',  value: '₹12,500', delta: 'Due by 30 Jun',       variant: 'error'     },
  { id: 'semester',   icon: 'calendar_month',    label: 'Semester',      value: '5th',     delta: 'B.Tech CSE',          variant: 'secondary' },
];

const recentResults = [
  { id: 'r1', subject: 'Database Systems',          internal: 38, external: 54, total: 92, grade: 'O'  },
  { id: 'r2', subject: 'Operating Systems',         internal: 35, external: 48, total: 83, grade: 'A+' },
  { id: 'r3', subject: 'Computer Networks',         internal: 30, external: 42, total: 72, grade: 'A'  },
  { id: 'r4', subject: 'Software Engineering',      internal: 32, external: 50, total: 82, grade: 'A+' },
  { id: 'r5', subject: 'Discrete Mathematics',      internal: 28, external: 37, total: 65, grade: 'B+' },
];

const upcomingItems = [
  { id: 'u1', text: 'End-Semester Exams begin',               time: '02 Jun 2026', icon: 'edit_note'     },
  { id: 'u2', text: 'Tuition fee payment deadline',           time: '30 Jun 2026', icon: 'payments'      },
  { id: 'u3', text: 'Technical fest – CodeSprint 2026',       time: '15 Jul 2026', icon: 'emoji_events'  },
  { id: 'u4', text: 'Semester registration opens',            time: '20 Jul 2026', icon: 'app_registration' },
  { id: 'u5', text: 'Industry guest lecture – AI & Ethics',   time: '25 Jul 2026', icon: 'groups'        },
];

const gradeChipVariant = (grade) => {
  if (grade === 'O')                     return 'success';
  if (grade === 'A+' || grade === 'A')   return 'primary';
  return 'neutral';
};

export default function StudentDashboard() {
  return (
    <DashboardLayout>
      {/* ---------- Page header ---------- */}
      <div className="page-header" id="student-page-header">
        <h1>My Academic Portal</h1>
        <p>Track your progress, attendance, and fees</p>
      </div>

      {/* ---------- Stat cards ---------- */}
      <div className="stat-grid" id="student-stat-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.id} id={`stat-${s.id}`}>
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

      {/* ---------- Two-column grid ---------- */}
      <div className="dashboard-grid" id="student-dashboard-grid">

        {/* ---- Recent Results ---- */}
        <div className="section-panel" id="student-recent-results">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">assignment</span>
            <h2>Recent Results</h2>
          </div>

          <table className="data-table" id="student-results-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Internal</th>
                <th>External</th>
                <th>Total</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {recentResults.map((r) => (
                <tr key={r.id} id={`result-${r.id}`}>
                  <td>{r.subject}</td>
                  <td>{r.internal}</td>
                  <td>{r.external}</td>
                  <td>{r.total}</td>
                  <td>
                    <span className={`chip chip--${gradeChipVariant(r.grade)}`}>
                      {r.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---- Upcoming ---- */}
        <div className="section-panel" id="student-upcoming">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">upcoming</span>
            <h2>Upcoming</h2>
          </div>

          <div id="student-activity-feed">
            {upcomingItems.map((item) => (
              <div className="activity-item" key={item.id} id={`upcoming-${item.id}`}>
                <span className="activity-item__dot"></span>
                <span className="activity-item__text">
                  <span className="material-symbols-rounded">{item.icon}</span>
                  {item.text}
                </span>
                <span className="activity-item__time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Degree Progress ---------- */}
      <div className="section-panel" id="student-degree-progress">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">trending_up</span>
          <h2>Degree Progress</h2>
        </div>

        <p>5 of 8 semesters completed — 62%</p>
        <div className="progress-bar" id="degree-progress-bar">
          <div className="progress-bar__fill" style={{ width: '62%' }}></div>
        </div>
      </div>
    </DashboardLayout>
  );
}
