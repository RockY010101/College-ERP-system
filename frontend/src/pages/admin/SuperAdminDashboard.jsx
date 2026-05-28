import DashboardLayout from '../../components/DashboardLayout';

const stats = [
  { id: 'total-users', icon: 'group', label: 'Total Users', value: '1,456', delta: '+62 this month', variant: 'primary' },
  { id: 'system-uptime', icon: 'timer', label: 'System Uptime', value: '99.7%', delta: '30-day average', variant: 'success' },
  { id: 'active-sessions', icon: 'devices', label: 'Active Sessions', value: '342', delta: '↑ 18% from yesterday', variant: 'secondary' },
  { id: 'pending-approvals', icon: 'pending_actions', label: 'Pending Approvals', value: '12', delta: '3 urgent', variant: 'error' },
];

const departments = [
  { id: 'dept-1', name: 'Computer Science', head: 'Dr. Ramesh Kumar', students: 310, faculty: 18, status: 'Active' },
  { id: 'dept-2', name: 'Mechanical Engineering', head: 'Dr. Sunita Verma', students: 275, faculty: 15, status: 'Active' },
  { id: 'dept-3', name: 'Business Administration', head: 'Prof. Ajay Nair', students: 198, faculty: 12, status: 'Active' },
  { id: 'dept-4', name: 'Physics', head: 'Dr. Kavita Joshi', students: 142, faculty: 10, status: 'Under Review' },
  { id: 'dept-5', name: 'Mathematics', head: 'Dr. Sanjay Rao', students: 120, faculty: 9, status: 'Active' },
];

const systemLogs = [
  { id: 'log-1', text: 'Database backup completed successfully — 2.4 GB archived.', time: '5 minutes ago' },
  { id: 'log-2', text: 'User role updated: priya.patel@college.edu promoted to Department Admin.', time: '25 minutes ago' },
  { id: 'log-3', text: 'Security patch v3.8.1 applied to authentication module.', time: '2 hours ago' },
  { id: 'log-4', text: 'Scheduled maintenance window configured for 22 May, 02:00–04:00 IST.', time: '4 hours ago' },
  { id: 'log-5', text: 'Failed login attempt detected from IP 192.168.14.22 — account locked.', time: '6 hours ago' },
];

const chipVariant = (status) => {
  switch (status) {
    case 'Active': return 'chip chip--success';
    case 'Under Review': return 'chip chip--primary';
    case 'Inactive': return 'chip chip--error';
    default: return 'chip chip--neutral';
  }
};

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout>
      <div id="super-admin-dashboard">
        <div className="page-header">
          <h1>System Overview</h1>
          <p>Monitor platform health, manage departments, and review system-wide operations.</p>
        </div>

        <div className="stat-grid" id="super-admin-stat-grid">
          {stats.map((s) => (
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

        <div className="dashboard-grid" id="super-admin-dashboard-grid">
          <div className="section-panel" id="department-summary-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">domain</span>
              <h2>Department Summary</h2>
            </div>
            <table className="data-table" id="department-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Head</th>
                  <th>Students</th>
                  <th>Faculty</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d) => (
                  <tr key={d.id} id={d.id}>
                    <td>{d.name}</td>
                    <td>{d.head}</td>
                    <td>{d.students}</td>
                    <td>{d.faculty}</td>
                    <td><span className={chipVariant(d.status)}>{d.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section-panel" id="system-logs-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">terminal</span>
              <h2>System Logs</h2>
            </div>
            <div id="system-logs-feed">
              {systemLogs.map((log) => (
                <div className="activity-item" key={log.id} id={log.id}>
                  <span className="activity-item__dot"></span>
                  <span className="activity-item__text">{log.text}</span>
                  <span className="activity-item__time">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
