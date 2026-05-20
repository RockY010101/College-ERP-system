import DashboardLayout from '../../components/DashboardLayout';

const stats = [
  { id: 'total-students', icon: 'school', label: 'Total Students', value: '1,247', delta: '+38 this semester', variant: 'primary' },
  { id: 'total-faculty', icon: 'groups', label: 'Total Faculty', value: '86', delta: '+4 new hires', variant: 'secondary' },
  { id: 'active-courses', icon: 'menu_book', label: 'Active Courses', value: '32', delta: '6 starting soon', variant: 'tertiary' },
  { id: 'departments', icon: 'apartment', label: 'Departments', value: '8', delta: 'All active', variant: 'success' },
];

const enrollments = [
  { id: 'enr-1', name: 'Aarav Sharma', course: 'B.Tech Computer Science', semester: 'Sem 4', date: '18 May 2026', status: 'Confirmed' },
  { id: 'enr-2', name: 'Priya Patel', course: 'MBA Finance', semester: 'Sem 2', date: '17 May 2026', status: 'Pending' },
  { id: 'enr-3', name: 'Rohan Mehta', course: 'B.Sc Physics', semester: 'Sem 6', date: '16 May 2026', status: 'Confirmed' },
  { id: 'enr-4', name: 'Sneha Iyer', course: 'B.Com Accounting', semester: 'Sem 2', date: '15 May 2026', status: 'Waitlisted' },
  { id: 'enr-5', name: 'Karan Desai', course: 'M.Tech AI & ML', semester: 'Sem 1', date: '14 May 2026', status: 'Confirmed' },
];

const activities = [
  { id: 'act-1', text: 'Faculty Dr. Nair uploaded grades for CS301 — Data Structures.', time: '10 minutes ago' },
  { id: 'act-2', text: 'New student batch (2026–30) registration window opened.', time: '1 hour ago' },
  { id: 'act-3', text: 'Library module updated: 240 new e-books catalogued.', time: '3 hours ago' },
  { id: 'act-4', text: 'Exam schedule for Semester 4 published by Controller of Exams.', time: '5 hours ago' },
  { id: 'act-5', text: 'Hostel block-C maintenance request approved by Admin Office.', time: 'Yesterday' },
];

const chipVariant = (status) => {
  switch (status) {
    case 'Confirmed': return 'chip chip--success';
    case 'Pending': return 'chip chip--primary';
    case 'Waitlisted': return 'chip chip--neutral';
    default: return 'chip';
  }
};

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div id="admin-dashboard">
        <div className="page-header">
          <h1>Administration Hub</h1>
          <p>Manage students, faculty, courses, and institutional operations at a glance.</p>
        </div>

        <div className="stat-grid" id="admin-stat-grid">
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

        <div className="dashboard-grid" id="admin-dashboard-grid">
          <div className="section-panel" id="recent-enrollments-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">how_to_reg</span>
              <h2>Recent Enrollments</h2>
            </div>
            <table className="data-table" id="enrollments-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((e) => (
                  <tr key={e.id} id={e.id}>
                    <td>{e.name}</td>
                    <td>{e.course}</td>
                    <td>{e.semester}</td>
                    <td>{e.date}</td>
                    <td><span className={chipVariant(e.status)}>{e.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section-panel" id="recent-activity-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">timeline</span>
              <h2>Recent Activity</h2>
            </div>
            <div id="admin-activity-feed">
              {activities.map((a) => (
                <div className="activity-item" key={a.id} id={a.id}>
                  <span className="activity-item__dot"></span>
                  <span className="activity-item__text">{a.text}</span>
                  <span className="activity-item__time">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
