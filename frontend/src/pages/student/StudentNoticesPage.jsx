// ══════════════════════════════════════════════════════════════════════
// StudentNoticesPage.jsx — Notice Board
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import EmptyState from '../../components/EmptyState'

/* ── Category Options ── */
const categoryOptions = [
  { value: '',            label: 'All Categories' },
  { value: 'Academic',    label: 'Academic' },
  { value: 'Examination', label: 'Examination' },
  { value: 'Event',       label: 'Event' },
  { value: 'General',     label: 'General' },
  { value: 'Placement',   label: 'Placement' },
]

/* ── Category → Chip Variant ── */
const categoryChip = (cat) => {
  switch (cat) {
    case 'Academic':    return 'primary'
    case 'Examination': return 'error'
    case 'Event':       return 'success'
    case 'Placement':   return 'neutral'
    case 'General':     return 'neutral'
    default:            return 'neutral'
  }
}

/* ── Notices Data ── */
const notices = [
  {
    id: 'notice-1',
    title: 'End Semester Examination Schedule Published',
    category: 'Examination',
    date: '28 May 2026',
    body: 'The end-semester examination schedule for all undergraduate and postgraduate programmes has been published. Students are advised to check the examination portal for their individual timetables and report any conflicts within 3 working days.',
  },
  {
    id: 'notice-2',
    title: 'Summer Internship Registration Open',
    category: 'Placement',
    date: '25 May 2026',
    body: 'Registrations for the Summer Internship Programme 2026 are now open. Students from 3rd year and above can apply through the placement cell portal. Last date for registration is 10 June 2026.',
  },
  {
    id: 'notice-3',
    title: 'Library Books Return Deadline Extended',
    category: 'Academic',
    date: '22 May 2026',
    body: 'Due to the upcoming examination period, the library book return deadline has been extended to 15 June 2026. Students with overdue books are requested to return them at the earliest to avoid penalties.',
  },
  {
    id: 'notice-4',
    title: 'Annual Sports Meet – Registration',
    category: 'Event',
    date: '20 May 2026',
    body: 'The Annual Sports Meet 2026 will be held from 10-12 July. Students interested in participating in athletics, cricket, basketball, and other sports events can register through their respective department sports coordinators.',
  },
  {
    id: 'notice-5',
    title: 'Scholarship Application for Merit Students',
    category: 'Academic',
    date: '18 May 2026',
    body: 'Applications are invited from students with CGPA 8.5 and above for the Merit Scholarship Programme. The scholarship covers up to 50% of tuition fees. Apply online through the student portal by 30 June 2026.',
  },
  {
    id: 'notice-6',
    title: 'Campus WiFi Maintenance Notice',
    category: 'General',
    date: '15 May 2026',
    body: 'The campus WiFi network will undergo scheduled maintenance on 1 June 2026 from 6:00 AM to 12:00 PM. Internet services may be intermittent during this period. We apologise for any inconvenience caused.',
  },
]

export default function StudentNoticesPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const filtered = notices.filter((n) => {
    if (categoryFilter && n.category !== categoryFilter) return false
    if (search && !n.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="page-header" id="notices-page-header">
        <h1>Notices &amp; Announcements</h1>
        <p>Stay updated with the latest campus notices and announcements</p>
      </div>

      {/* ── Toolbar ── */}
      <div className="toolbar" id="notices-toolbar">
        <SearchBar
          placeholder="Search notices…"
          value={search}
          onChange={setSearch}
          id="notices-search"
        />
        <FilterDropdown
          label="Category"
          options={categoryOptions}
          value={categoryFilter}
          onChange={setCategoryFilter}
          id="filter-category"
        />
      </div>

      {/* ── Notice Cards ── */}
      <div id="notices-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.length === 0 && (
          <EmptyState
            icon="notifications_off"
            title="No notices found"
            message="Try adjusting your search or filter criteria."
            id="notices-empty"
          />
        )}
        {filtered.map((n) => (
          <div className="notice-card" key={n.id} id={n.id}>
            <div className="notice-card__header">
              <span className="notice-card__title">{n.title}</span>
              <span className="notice-card__date">{n.date}</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span className={`chip chip--${categoryChip(n.category)}`}>{n.category}</span>
            </div>
            <div className="notice-card__body">{n.body}</div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
