// ══════════════════════════════════════════════════════════════════════
// Tabs.jsx — Reusable tab navigation component
// ══════════════════════════════════════════════════════════════════════

import React from 'react'

function Tabs({ tabs = [], activeTab, onChange, id = 'tabs' }) {
  return (
    <div className="tabs" id={id}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`tabs__tab ${activeTab === tab.value ? 'tabs__tab--active' : ''}`}
          onClick={() => onChange?.(tab.value)}
          id={`tab-${tab.value}`}
        >
          {tab.icon && <span className="material-symbols-rounded">{tab.icon}</span>}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export default Tabs
