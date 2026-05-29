// ══════════════════════════════════════════════════════════════════════
// FacultyAttendancePage.jsx — Mark & review attendance
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'

/* ── Helpers ──────────────────────────────────────────────────────── */

function formatDate(d) {
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

const today = new Date()
const todayStr = formatDate(today)

/* ── Static Data ─────────────────────────────────────────────────── */

const subjectOptions = [
  { value: 'DS', label: 'Data Structures — CS301' },
  { value: 'OS', label: 'Operating Systems — CS501' },
  { value: 'DB', label: 'Database Management — CS401' },
  { value: 'CN', label: 'Computer Networks Lab — CS601' },
]

const dateOptions = [
  { value: 'today', label: `Today — ${todayStr}` },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'custom', label: 'Select Date…' },
]

const initialStudents = [
  { id: 'a1',  rollNo: 'CS21001', name: 'Ananya Sharma',      status: 'present' },
  { id: 'a2',  rollNo: 'CS21003', name: 'Bhavesh Kumar',      status: 'present' },
  { id: 'a3',  rollNo: 'CS21005', name: 'Chandni Desai',      status: 'present' },
  { id: 'a4',  rollNo: 'CS21008', name: 'Dhruv Patel',        status: 'absent'  },
  { id: 'a5',  rollNo: 'CS21011', name: 'Esha Reddy',         status: 'present' },
  { id: 'a6',  rollNo: 'CS21014', name: 'Farhan Sheikh',      status: 'present' },
  { id: 'a7',  rollNo: 'CS21015', name: 'Gauri Nair',         status: 'present' },
  { id: 'a8',  rollNo: 'CS21019', name: 'Harish Joshi',       status: 'absent'  },
  { id: 'a9',  rollNo: 'CS21021', name: 'Ishita Gupta',       status: 'present' },
  { id: 'a10', rollNo: 'CS21023', name: 'Jayesh Menon',       status: 'present' },
  { id: 'a11', rollNo: 'CS21026', name: 'Kavya Iyer',         status: 'present' },
  { id: 'a12', rollNo: 'CS21028', name: 'Lakshmi Verma',      status: 'present' },
  { id: 'a13', rollNo: 'CS21031', name: 'Manish Tiwari',      status: 'absent'  },
  { id: 'a14', rollNo: 'CS21035', name: 'Nikita Kulkarni',    status: 'present' },
  { id: 'a15', rollNo: 'CS21037', name: 'Om Prakash Singh',   status: 'present' },
]

const attendanceHistory = [
  { id: 'h1',  date: '28 May 2026', subject: 'Data Structures',       present: 40, absent: 2,  pct: 95.2 },
  { id: 'h2',  date: '27 May 2026', subject: 'Data Structures',       present: 38, absent: 4,  pct: 90.5 },
  { id: 'h3',  date: '26 May 2026', subject: 'Operating Systems',     present: 35, absent: 3,  pct: 92.1 },
  { id: 'h4',  date: '25 May 2026', subject: 'Database Management',   present: 42, absent: 3,  pct: 93.3 },
  { id: 'h5',  date: '23 May 2026', subject: 'Data Structures',       present: 39, absent: 3,  pct: 92.9 },
  { id: 'h6',  date: '22 May 2026', subject: 'Computer Networks Lab', present: 28, absent: 3,  pct: 90.3 },
  { id: 'h7',  date: '21 May 2026', subject: 'Operating Systems',     present: 34, absent: 4,  pct: 89.5 },
  { id: 'h8',  date: '20 May 2026', subject: 'Database Management',   present: 43, absent: 2,  pct: 95.6 },
  { id: 'h9',  date: '19 May 2026', subject: 'Data Structures',       present: 37, absent: 5,  pct: 88.1 },
  { id: 'h10', date: '18 May 2026', subject: 'Computer Networks Lab', present: 29, absent: 2,  pct: 93.5 },
]

/* ── Component ───────────────────────────────────────────────────── */

export default function FacultyAttendancePage() {
  const [selectedSubject, setSelectedSubject] = useState('DS')
  const [selectedDate, setSelectedDate] = useState('today')
  const [attendanceData, setAttendanceData] = useState(initialStudents)

  const toggleStatus = (id) => {
    setAttendanceData((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s
      )
    )
  }

  const resetAll = () => {
    setAttendanceData(initialStudents)
  }

  const presentCount = attendanceData.filter((s) => s.status === 'present').length
  const absentCount = attendanceData.filter((s) => s.status === 'absent').length

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="page-header" id="faculty-attendance-header">
        <h1>Mark Attendance</h1>
        <p>Record daily attendance for your classes</p>
      </div>

      {/* ── Toolbar ── */}
      <div className="toolbar" id="attendance-toolbar">
        <FilterDropdown
          label="Subject"
          options={subjectOptions}
          value={selectedSubject}
          onChange={setSelectedSubject}
          id="attendance-subject-filter"
        />
        <FilterDropdown
          label="Date"
          options={dateOptions}
          value={selectedDate}
          onChange={setSelectedDate}
          id="attendance-date-filter"
        />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span className="chip chip--success">
            <span className="material-symbols-rounded" style={{ fontSize: 14 }}>check_circle</span>
            Present: {presentCount}
          </span>
          <span className="chip chip--error">
            <span className="material-symbols-rounded" style={{ fontSize: 14 }}>cancel</span>
            Absent: {absentCount}
          </span>
        </div>
      </div>

      {/* ── Mark Attendance Panel ── */}
      <div className="section-panel" id="mark-attendance-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">fact_check</span>
          <h2>Mark Attendance</h2>
        </div>

        <table className="data-table" id="mark-attendance-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>#</th>
              <th>Roll No</th>
              <th>Name</th>
              <th style={{ textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((s, idx) => (
              <tr key={s.id} id={s.id}>
                <td>{idx + 1}</td>
                <td>{s.rollNo}</td>
                <td>{s.name}</td>
                <td style={{ textAlign: 'center' }}>
                  <div className="attendance-toggle" id={`toggle-${s.id}`}>
                    <button
                      className={`attendance-toggle__btn ${s.status === 'present' ? 'attendance-toggle__btn--active-present' : ''}`}
                      onClick={() => toggleStatus(s.id)}
                    >
                      Present
                    </button>
                    <button
                      className={`attendance-toggle__btn ${s.status === 'absent' ? 'attendance-toggle__btn--active-absent' : ''}`}
                      onClick={() => toggleStatus(s.id)}
                    >
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-actions" id="attendance-form-actions">
          <button className="btn-secondary" id="reset-attendance-btn" onClick={resetAll}>
            <span className="material-symbols-rounded">restart_alt</span>
            Reset
          </button>
          <button className="btn-primary" id="submit-attendance-btn">
            <span className="material-symbols-rounded">check</span>
            Submit Attendance
          </button>
        </div>
      </div>

      {/* ── Attendance History Panel ── */}
      <div className="section-panel" id="attendance-history-panel" style={{ marginTop: '1.5rem' }}>
        <div className="section-panel__header">
          <span className="material-symbols-rounded">history</span>
          <h2>Attendance History</h2>
        </div>

        <table className="data-table" id="attendance-history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {attendanceHistory.map((h) => (
              <tr key={h.id} id={h.id}>
                <td>{h.date}</td>
                <td>{h.subject}</td>
                <td>
                  <span style={{ color: '#2e7d32', fontWeight: 600 }}>{h.present}</span>
                </td>
                <td>
                  <span style={{ color: '#ba1a1a', fontWeight: 600 }}>{h.absent}</span>
                </td>
                <td>
                  <span
                    className={`chip ${h.pct >= 90 ? 'chip--success' : h.pct >= 80 ? 'chip--primary' : 'chip--error'}`}
                  >
                    {h.pct}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
