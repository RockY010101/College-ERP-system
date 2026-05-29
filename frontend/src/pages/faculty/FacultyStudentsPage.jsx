// ══════════════════════════════════════════════════════════════════════
// FacultyStudentsPage.jsx — My Students listing with filters & stats
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import EmptyState from '../../components/EmptyState'

/* ── Static Data ─────────────────────────────────────────────────── */

const stats = [
  { id: 'total-students',      label: 'Total Students',       value: '156',   icon: 'groups',       variant: 'primary'  },
  { id: 'avg-attendance',      label: 'Avg Attendance',       value: '87.3%', icon: 'trending_up',  variant: 'success'  },
  { id: 'pending-evaluations', label: 'Pending Evaluations',  value: '23',    icon: 'rate_review',  variant: 'tertiary' },
]

const subjectOptions = [
  { value: '',   label: 'All Subjects' },
  { value: 'DS', label: 'Data Structures' },
  { value: 'OS', label: 'Operating Systems' },
  { value: 'DB', label: 'DBMS' },
  { value: 'CN', label: 'Computer Networks' },
]

const semesterOptions = [
  { value: '',  label: 'All Semesters' },
  { value: '3', label: 'Semester 3' },
  { value: '4', label: 'Semester 4' },
  { value: '5', label: 'Semester 5' },
  { value: '6', label: 'Semester 6' },
]

const students = [
  { id: 's1',  rollNo: 'CS21001', name: 'Ananya Sharma',      subject: 'Data Structures',    subjectKey: 'DS', semester: '3', attendance: 92,  marks: 34 },
  { id: 's2',  rollNo: 'CS21015', name: 'Rohan Mehta',        subject: 'Data Structures',    subjectKey: 'DS', semester: '3', attendance: 78,  marks: 28 },
  { id: 's3',  rollNo: 'CS21023', name: 'Priya Patel',        subject: 'Operating Systems',  subjectKey: 'OS', semester: '5', attendance: 88,  marks: 36 },
  { id: 's4',  rollNo: 'CS21008', name: 'Arjun Nair',         subject: 'DBMS',               subjectKey: 'DB', semester: '4', attendance: 71,  marks: 25 },
  { id: 's5',  rollNo: 'CS21037', name: 'Sneha Kulkarni',     subject: 'Computer Networks',  subjectKey: 'CN', semester: '6', attendance: 95,  marks: 38 },
  { id: 's6',  rollNo: 'CS21042', name: 'Vikram Desai',       subject: 'Data Structures',    subjectKey: 'DS', semester: '3', attendance: 83,  marks: 31 },
  { id: 's7',  rollNo: 'CS21019', name: 'Kavya Reddy',        subject: 'Operating Systems',  subjectKey: 'OS', semester: '5', attendance: 90,  marks: 35 },
  { id: 's8',  rollNo: 'CS21055', name: 'Amit Joshi',         subject: 'DBMS',               subjectKey: 'DB', semester: '4', attendance: 67,  marks: 22 },
  { id: 's9',  rollNo: 'CS21011', name: 'Neha Gupta',         subject: 'Computer Networks',  subjectKey: 'CN', semester: '6', attendance: 86,  marks: 33 },
  { id: 's10', rollNo: 'CS21028', name: 'Rahul Verma',        subject: 'Data Structures',    subjectKey: 'DS', semester: '3', attendance: 74,  marks: 26 },
  { id: 's11', rollNo: 'CS21033', name: 'Deepika Iyer',       subject: 'Operating Systems',  subjectKey: 'OS', semester: '5', attendance: 91,  marks: 37 },
  { id: 's12', rollNo: 'CS21047', name: 'Siddharth Menon',    subject: 'DBMS',               subjectKey: 'DB', semester: '4', attendance: 80,  marks: 29 },
]

/* ── Helpers ──────────────────────────────────────────────────────── */

function attendanceColor(pct) {
  if (pct >= 85) return '#2e7d32'
  if (pct >= 75) return '#e65100'
  return '#ba1a1a'
}

/* ── Component ───────────────────────────────────────────────────── */

export default function FacultyStudentsPage() {
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('')
  const [semFilter, setSemFilter] = useState('')

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase())
    const matchesSubject = !subjectFilter || s.subjectKey === subjectFilter
    const matchesSem = !semFilter || s.semester === semFilter
    return matchesSearch && matchesSubject && matchesSem
  })

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="page-header" id="faculty-students-header">
        <h1>My Students</h1>
        <p>View and manage students across your assigned subjects</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-grid" id="students-stat-grid">
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

      {/* ── Toolbar ── */}
      <div className="toolbar" id="students-toolbar">
        <SearchBar
          placeholder="Search by name or roll no…"
          value={search}
          onChange={setSearch}
          id="students-search"
        />
        <FilterDropdown
          label="Subject"
          options={subjectOptions}
          value={subjectFilter}
          onChange={setSubjectFilter}
          id="students-subject-filter"
        />
        <FilterDropdown
          label="Semester"
          options={semesterOptions}
          value={semFilter}
          onChange={setSemFilter}
          id="students-semester-filter"
        />
      </div>

      {/* ── Students Table ── */}
      <div className="section-panel" id="students-list-panel">
        <div className="section-panel__header">
          <span className="material-symbols-rounded">groups</span>
          <h2>Student List</h2>
          <span className="chip chip--neutral" style={{ marginLeft: 'auto' }}>
            {filtered.length} student{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="search_off"
            title="No students found"
            message="Try adjusting your search or filter criteria."
            id="students-empty"
          />
        ) : (
          <table className="data-table" id="students-data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Semester</th>
                <th>Attendance %</th>
                <th>Internal Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} id={s.id}>
                  <td>{s.rollNo}</td>
                  <td>{s.name}</td>
                  <td>{s.subject}</td>
                  <td><span className="chip chip--neutral">Sem {s.semester}</span></td>
                  <td>
                    <span style={{ fontWeight: 600, color: attendanceColor(s.attendance) }}>
                      {s.attendance}%
                    </span>
                  </td>
                  <td>{s.marks} / 40</td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn-icon" title="View Student" id={`view-${s.id}`}>
                        <span className="material-symbols-rounded">visibility</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  )
}
