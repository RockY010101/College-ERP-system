// ══════════════════════════════════════════════════════════════════════
// FilterDropdown.jsx — Reusable dropdown filter
// ══════════════════════════════════════════════════════════════════════

import React from 'react'

function FilterDropdown({ label, options = [], value = '', onChange, id = 'filter-dropdown' }) {
  return (
    <div className="filter-dropdown" id={id}>
      {label && <span className="filter-dropdown__label">{label}</span>}
      <select
        className="filter-dropdown__select"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterDropdown
