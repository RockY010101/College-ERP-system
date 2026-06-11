// ══════════════════════════════════════════════════════════════════════
// StudentNoticesPage.jsx — Notice Board
// Data: GET /api/student/notices
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import EmptyState from '../../components/EmptyState'
import apiClient from '../../services/apiClient'

const categoryChip = (cat) => {
  switch (cat) {
    case 'Academic':    return 'primary'
    case 'Examination': return 'error'
    case 'Event':       return 'success'
    case 'Placement':   return 'neutral'
    default:            return 'neutral'
  }
}

export default function StudentNoticesPage() {
  const [notices, setNotices]             = useState([])
  const [loading, setLoading]             = useState(true)
  const [search, setSearch]               = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => {
    let cancelled = false
    apiClient.get('/student/notices')
      .then(res => { if (!cancelled) setNotices(Array.isArray(res.data) ? res.data : []) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Build category options dynamically
  const categoryOptions = useMemo(() => {
    const cats = [...new Set(notices.map(n => n.category).filter(Boolean))]
    return [{ value: '', label: 'All Categories' }, ...cats.map(c => ({ value: c, label: c }))]
  }, [notices])

  const filtered = useMemo(() => {
    return notices.filter((n) => {
      const title = (n.title ?? n.heading ?? '').toLowerCase()
      if (categoryFilter && n.category !== categoryFilter) return false
      if (search && !title.includes(search.toLowerCase())) return false
      return true
    })
  }, [notices, search, categoryFilter])

  return (
    <DashboardLayout>
      <div className="page-header" id="notices-page-header">
        <h1>Notices &amp; Announcements</h1>
        <p>Stay updated with the latest campus notices and announcements</p>
      </div>

      <div className="toolbar" id="notices-toolbar">
        <SearchBar placeholder="Search notices…" value={search} onChange={setSearch} id="notices-search" />
        <FilterDropdown label="Category" options={categoryOptions} value={categoryFilter} onChange={setCategoryFilter} id="filter-category" />
      </div>

      <div id="notices-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading notices…</p>
        ) : filtered.length === 0 ? (
          <EmptyState icon="notifications_off" title="No notices found" message="No notices available yet." id="notices-empty" />
        ) : (
          filtered.map((n, i) => (
            <div className="notice-card" key={n.id ?? n.noticeId ?? i} id={`notice-${n.id ?? i}`}>
              <div className="notice-card__header">
                <span className="notice-card__title">{n.title ?? n.heading ?? '—'}</span>
                <span className="notice-card__date">{n.date ?? n.publishedAt ?? ''}</span>
              </div>
              {n.category && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className={`chip chip--${categoryChip(n.category)}`}>{n.category}</span>
                </div>
              )}
              <div className="notice-card__body">{n.body ?? n.content ?? n.description ?? ''}</div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  )
}
