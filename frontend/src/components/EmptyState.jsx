// ══════════════════════════════════════════════════════════════════════
// EmptyState.jsx — "No data" placeholder component
// ══════════════════════════════════════════════════════════════════════

import React from 'react'

function EmptyState({ icon = 'inbox', title = 'No data found', message = '', id = 'empty-state' }) {
  return (
    <div className="empty-state" id={id}>
      <span className="material-symbols-rounded empty-state__icon">{icon}</span>
      <h3 className="empty-state__title">{title}</h3>
      {message && <p className="empty-state__message">{message}</p>}
    </div>
  )
}

export default EmptyState
