import DashboardLayout from '../../components/DashboardLayout';

const stats = [
  { id: 'my-students',    label: 'My Students',         value: '156',    icon: 'groups',        variant: 'primary'   },
  { id: 'classes-today',  label: 'Classes Today',       value: '4',      icon: 'calendar_today', variant: 'secondary' },
  { id: 'pending-evals',  label: 'Pending Evaluations', value: '23',     icon: 'rate_review',    variant: 'tertiary'  },
  { id: 'avg-attendance', label: 'Avg Attendance',      value: '87.3%',  icon: 'trending_up',    variant: 'success'   },
];

const todaySchedule = [
  { id: 'cls-1', time: '09:00 – 10:00 AM', subject: 'Data Structures',          semester: 'Sem 3', room: 'LH-201', students: 42 },
  { id: 'cls-2', time: '10:15 – 11:15 AM', subject: 'Operating Systems',        semester: 'Sem 5', room: 'LH-305', students: 38 },
  { id: 'cls-3', time: '01:00 – 02:00 PM', subject: 'Database Management',      semester: 'Sem 4', room: 'LH-102', students: 45 },
  { id: 'cls-4', time: '03:00 – 04:00 PM', subject: 'Computer Networks Lab',    semester: 'Sem 6', room: 'Lab-3',  students: 31 },
];

const recentSubmissions = [
  { id: 'sub-1', text: 'Ananya Sharma submitted Assignment 3 – Data Structures',        time: '10 min ago' },
  { id: 'sub-2', text: 'Rohan Mehta submitted Lab Report 5 – Operating Systems',        time: '25 min ago' },
  { id: 'sub-3', text: 'Priya Patel submitted Mini Project Proposal – DBMS',            time: '1 hour ago' },
  { id: 'sub-4', text: 'Arjun Nair submitted Assignment 2 – Computer Networks',         time: '2 hours ago' },
  { id: 'sub-5', text: 'Sneha Kulkarni submitted Seminar Report – Cloud Computing',     time: '3 hours ago' },
];

export default function FacultyDashboard() {
  return (
    <DashboardLayout>
      {/* ---- Page Header ---- */}
      <div className="page-header" id="faculty-page-header">
        <h1>Faculty Portal</h1>
        <p>Manage your classes, attendance, and student performance</p>
      </div>

      {/* ---- Stat Cards ---- */}
      <div className="stat-grid" id="faculty-stat-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.id} id={s.id}>
            <div className={`stat-card__icon stat-card__icon--${s.variant}`}>
              <span className="material-symbols-rounded">{s.icon}</span>
            </div>
            <div className="stat-card__info">
              <span className="stat-card__label">{s.label}</span>
              <span className="stat-card__value">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ---- Two-Column Grid ---- */}
      <div className="dashboard-grid" id="faculty-dashboard-grid">
        {/* Today's Schedule */}
        <div className="section-panel" id="todays-schedule-panel">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">schedule</span>
            <h2>Today&#39;s Schedule</h2>
          </div>
          <table className="data-table" id="todays-schedule-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Subject</th>
                <th>Semester</th>
                <th>Room</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              {todaySchedule.map((cls) => (
                <tr key={cls.id} id={cls.id}>
                  <td>{cls.time}</td>
                  <td>{cls.subject}</td>
                  <td><span className="chip chip--neutral">{cls.semester}</span></td>
                  <td>{cls.room}</td>
                  <td>{cls.students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Submissions */}
        <div className="section-panel" id="recent-submissions-panel">
          <div className="section-panel__header">
            <span className="material-symbols-rounded">assignment_turned_in</span>
            <h2>Recent Submissions</h2>
          </div>
          <div id="recent-submissions-feed">
            {recentSubmissions.map((item) => (
              <div className="activity-item" key={item.id} id={item.id}>
                <span className="activity-item__dot"></span>
                <span className="activity-item__text">{item.text}</span>
                <span className="activity-item__time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Semester Progress ---- */}
      <div className="section-panel" id="semester-progress-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">trending_up</span>
          <h2>Semester Progress</h2>
        </div>
        <p>65% of the semester completed</p>
        <div className="progress-bar" id="semester-progress-bar">
          <div className="progress-bar__fill" style={{ width: '65%' }}></div>
        </div>
      </div>
    </DashboardLayout>
  );
}
