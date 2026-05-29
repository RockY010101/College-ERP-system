// ══════════════════════════════════════════════════════════════════════
// AccountantFeesPage.jsx — Fee Structure Management
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import FilterDropdown from '../../components/FilterDropdown'
import Modal from '../../components/Modal'

/* ── Static Data ── */
const courseOptions = [
  { value: '',      label: 'All Courses' },
  { value: 'btech', label: 'B.Tech' },
  { value: 'mba',   label: 'MBA' },
  { value: 'bsc',   label: 'B.Sc' },
  { value: 'bcom',  label: 'B.Com' },
  { value: 'mtech', label: 'M.Tech' },
]

const semesterOptions = [
  { value: '',  label: 'All Semesters' },
  { value: '1', label: 'Semester 1' },
  { value: '2', label: 'Semester 2' },
  { value: '3', label: 'Semester 3' },
  { value: '4', label: 'Semester 4' },
  { value: '5', label: 'Semester 5' },
  { value: '6', label: 'Semester 6' },
  { value: '7', label: 'Semester 7' },
  { value: '8', label: 'Semester 8' },
]

const feeHeads = [
  { id: 'fh-1',  name: 'Tuition Fee',           course: 'B.Tech', courseKey: 'btech', semester: '1', amount: '75,000',  dueDate: '15 Jul 2026', status: 'Active' },
  { id: 'fh-2',  name: 'Lab Fee',               course: 'B.Tech', courseKey: 'btech', semester: '1', amount: '12,500',  dueDate: '15 Jul 2026', status: 'Active' },
  { id: 'fh-3',  name: 'Library Fee',           course: 'B.Tech', courseKey: 'btech', semester: '1', amount: '3,000',   dueDate: '15 Jul 2026', status: 'Active' },
  { id: 'fh-4',  name: 'Examination Fee',       course: 'B.Tech', courseKey: 'btech', semester: '3', amount: '5,500',   dueDate: '01 Aug 2026', status: 'Active' },
  { id: 'fh-5',  name: 'Hostel Fee',            course: 'MBA',    courseKey: 'mba',   semester: '2', amount: '45,000',  dueDate: '20 Jul 2026', status: 'Active' },
  { id: 'fh-6',  name: 'Sports & Activity Fee', course: 'B.Sc',   courseKey: 'bsc',   semester: '1', amount: '2,500',   dueDate: '15 Jul 2026', status: 'Active' },
  { id: 'fh-7',  name: 'Development Fee',       course: 'B.Com',  courseKey: 'bcom',  semester: '4', amount: '8,000',   dueDate: '01 Sep 2026', status: 'Inactive' },
  { id: 'fh-8',  name: 'Internet & IT Fee',     course: 'M.Tech', courseKey: 'mtech', semester: '2', amount: '4,000',   dueDate: '20 Jul 2026', status: 'Active' },
  { id: 'fh-9',  name: 'Transport Fee',         course: 'B.Tech', courseKey: 'btech', semester: '5', amount: '18,000',  dueDate: '15 Jul 2026', status: 'Inactive' },
  { id: 'fh-10', name: 'Placement Training Fee',course: 'MBA',    courseKey: 'mba',   semester: '3', amount: '10,000',  dueDate: '01 Aug 2026', status: 'Active' },
]

export default function AccountantFeesPage() {
  const [courseFilter, setCourseFilter] = useState('')
  const [semFilter, setSemFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = feeHeads.filter((f) => {
    if (courseFilter && f.courseKey !== courseFilter) return false
    if (semFilter && f.semester !== semFilter) return false
    return true
  })

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="page-header" id="fees-page-header">
        <h1>Fee Structure</h1>
        <p>Manage fee heads, amounts, and due dates across courses</p>
      </div>

      {/* ── Toolbar ── */}
      <div className="toolbar" id="fees-toolbar">
        <FilterDropdown
          label="Course"
          options={courseOptions}
          value={courseFilter}
          onChange={setCourseFilter}
          id="filter-course"
        />
        <FilterDropdown
          label="Semester"
          options={semesterOptions}
          value={semFilter}
          onChange={setSemFilter}
          id="filter-semester"
        />
        <button
          className="btn btn-primary"
          id="btn-add-fee-head"
          onClick={() => setModalOpen(true)}
        >
          <span className="material-symbols-rounded">add</span>
          Add Fee Head
        </button>
      </div>

      {/* ── Fee Heads Table ── */}
      <div className="section-panel" id="fee-heads-panel">
        <div className="section-panel__header">
          <h2>Fee Heads ({filtered.length})</h2>
        </div>
        <table className="data-table" id="fee-heads-table">
          <thead>
            <tr>
              <th>Fee Head</th>
              <th>Course</th>
              <th>Semester</th>
              <th>Amount (₹)</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id} id={f.id}>
                <td>{f.name}</td>
                <td>{f.course}</td>
                <td>Sem {f.semester}</td>
                <td>₹{f.amount}</td>
                <td>{f.dueDate}</td>
                <td>
                  <span className={`chip chip--${f.status === 'Active' ? 'success' : 'neutral'}`}>
                    {f.status}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="btn-icon" title="Edit">
                      <span className="material-symbols-rounded">edit</span>
                    </button>
                    <button className="btn-icon btn-icon--danger" title="Delete">
                      <span className="material-symbols-rounded">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Add Fee Head Modal ── */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Fee Head" id="add-fee-head-modal">
        <form onSubmit={(e) => { e.preventDefault(); setModalOpen(false) }}>
          <div className="form-grid">
            <div className="form-group form-group--full">
              <label htmlFor="fee-name">Fee Head Name</label>
              <input type="text" id="fee-name" placeholder="e.g. Tuition Fee" />
            </div>
            <div className="form-group">
              <label htmlFor="fee-course">Course</label>
              <select id="fee-course">
                <option value="">Select Course</option>
                <option value="btech">B.Tech</option>
                <option value="mba">MBA</option>
                <option value="bsc">B.Sc</option>
                <option value="bcom">B.Com</option>
                <option value="mtech">M.Tech</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fee-semester">Semester</label>
              <select id="fee-semester">
                {[1,2,3,4,5,6,7,8].map((s) => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fee-amount">Amount (₹)</label>
              <input type="number" id="fee-amount" placeholder="e.g. 75000" />
            </div>
            <div className="form-group">
              <label htmlFor="fee-due-date">Due Date</label>
              <input type="date" id="fee-due-date" />
            </div>
            <div className="form-group form-group--full">
              <label htmlFor="fee-description">Description</label>
              <textarea id="fee-description" rows={3} placeholder="Brief description of the fee head…" />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Fee Head</button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}
