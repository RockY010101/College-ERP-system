// ══════════════════════════════════════════════════════════════════════
// FacultySubjectsPage.jsx — Faculty's assigned subjects & schedule
// ══════════════════════════════════════════════════════════════════════

import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'

/* ── Static Data ─────────────────────────────────────────────────── */

const subjects = [
  {
    id: 'sub-ds',
    name: 'Data Structures',
    code: 'CS301',
    icon: 'account_tree',
    iconVariant: 'primary',
    semester: 3,
    students: 42,
    schedule: 'MWF 9–10 AM',
    room: 'LH-201',
    progress: 72,
  },
  {
    id: 'sub-os',
    name: 'Operating Systems',
    code: 'CS501',
    icon: 'memory',
    iconVariant: 'secondary',
    semester: 5,
    students: 38,
    schedule: 'TTh 10–11:30 AM',
    room: 'LH-305',
    progress: 65,
  },
  {
    id: 'sub-db',
    name: 'Database Management',
    code: 'CS401',
    icon: 'database',
    iconVariant: 'tertiary',
    semester: 4,
    students: 45,
    schedule: 'MWF 1–2 PM',
    room: 'LH-102',
    progress: 58,
  },
  {
    id: 'sub-cn',
    name: 'Computer Networks Lab',
    code: 'CS601',
    icon: 'lan',
    iconVariant: 'success',
    semester: 6,
    students: 31,
    schedule: 'Th 3–5 PM',
    room: 'Lab-3',
    progress: 45,
  },
]

const weeklySchedule = [
  { id: 'ws1',  day: 'Monday',    time: '09:00 – 10:00 AM',  subject: 'Data Structures',       room: 'LH-201', batch: 'CS Sem 3 — Batch A' },
  { id: 'ws2',  day: 'Monday',    time: '01:00 – 02:00 PM',  subject: 'Database Management',   room: 'LH-102', batch: 'CS Sem 4 — All' },
  { id: 'ws3',  day: 'Tuesday',   time: '10:00 – 11:30 AM',  subject: 'Operating Systems',     room: 'LH-305', batch: 'CS Sem 5 — All' },
  { id: 'ws4',  day: 'Wednesday', time: '09:00 – 10:00 AM',  subject: 'Data Structures',       room: 'LH-201', batch: 'CS Sem 3 — Batch A' },
  { id: 'ws5',  day: 'Wednesday', time: '01:00 – 02:00 PM',  subject: 'Database Management',   room: 'LH-102', batch: 'CS Sem 4 — All' },
  { id: 'ws6',  day: 'Thursday',  time: '10:00 – 11:30 AM',  subject: 'Operating Systems',     room: 'LH-305', batch: 'CS Sem 5 — All' },
  { id: 'ws7',  day: 'Thursday',  time: '03:00 – 05:00 PM',  subject: 'Computer Networks Lab', room: 'Lab-3',  batch: 'CS Sem 6 — Batch B' },
  { id: 'ws8',  day: 'Friday',    time: '09:00 – 10:00 AM',  subject: 'Data Structures',       room: 'LH-201', batch: 'CS Sem 3 — Batch A' },
  { id: 'ws9',  day: 'Friday',    time: '01:00 – 02:00 PM',  subject: 'Database Management',   room: 'LH-102', batch: 'CS Sem 4 — All' },
]

/* ── Component ───────────────────────────────────────────────────── */

export default function FacultySubjectsPage() {
  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="page-header" id="faculty-subjects-header">
        <h1>My Subjects</h1>
        <p>Subjects assigned to you this semester along with your weekly timetable</p>
      </div>

      {/* ── Subject Cards ── */}
      <div className="card-grid" id="subjects-card-grid">
        {subjects.map((sub) => (
          <div className="module-card" key={sub.id} id={sub.id}>
            {/* Card Header */}
            <div className="module-card__header">
              <div className={`module-card__icon module-card__icon--${sub.iconVariant}`}>
                <span className="material-symbols-rounded">{sub.icon}</span>
              </div>
              <div>
                <div className="module-card__title">{sub.name}</div>
                <div className="module-card__subtitle">{sub.code}</div>
              </div>
            </div>

            {/* Meta */}
            <div className="module-card__meta">
              <span className="module-card__meta-item">
                <span className="material-symbols-rounded">school</span>
                Sem {sub.semester}
              </span>
              <span className="module-card__meta-item">
                <span className="material-symbols-rounded">groups</span>
                {sub.students} students
              </span>
              <span className="module-card__meta-item">
                <span className="material-symbols-rounded">schedule</span>
                {sub.schedule}
              </span>
              <span className="module-card__meta-item">
                <span className="material-symbols-rounded">meeting_room</span>
                {sub.room}
              </span>
            </div>

            {/* Syllabus Progress */}
            <div className="subject-progress">
              <div className="subject-progress__label">
                <span>Syllabus Progress</span>
                <span>{sub.progress}%</span>
              </div>
              <div className="progress-bar" id={`progress-${sub.id}`}>
                <div className="progress-bar__fill" style={{ width: `${sub.progress}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Weekly Schedule ── */}
      <div className="section-panel" id="weekly-schedule-panel" style={{ marginTop: '1.5rem' }}>
        <div className="section-panel__header">
          <span className="material-symbols-rounded">calendar_month</span>
          <h2>Weekly Schedule</h2>
        </div>

        <table className="data-table" id="weekly-schedule-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Room</th>
              <th>Batch</th>
            </tr>
          </thead>
          <tbody>
            {weeklySchedule.map((s) => (
              <tr key={s.id} id={s.id}>
                <td style={{ fontWeight: 600 }}>{s.day}</td>
                <td>{s.time}</td>
                <td>{s.subject}</td>
                <td><span className="chip chip--neutral">{s.room}</span></td>
                <td>{s.batch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
