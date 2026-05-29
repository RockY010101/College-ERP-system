// ══════════════════════════════════════════════════════════════════════
// SearchBar.jsx — Reusable search input with icon & clear button
// ══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react'

function SearchBar({ placeholder = 'Search…', value = '', onChange, id = 'search-bar' }) {
  const [internal, setInternal] = useState(value)
  const timerRef = useRef(null)

  useEffect(() => { setInternal(value) }, [value])

  const handleChange = (e) => {
    const v = e.target.value
    setInternal(v)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onChange?.(v), 250)
  }

  const handleClear = () => {
    setInternal('')
    onChange?.('')
  }

  return (
    <div className="search-bar" id={id}>
      <span className="material-symbols-rounded search-bar__icon">search</span>
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={internal}
        onChange={handleChange}
      />
      {internal && (
        <button className="search-bar__clear" onClick={handleClear} title="Clear search">
          <span className="material-symbols-rounded">close</span>
        </button>
      )}
    </div>
  )
}

export default SearchBar
