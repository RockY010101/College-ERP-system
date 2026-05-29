// ══════════════════════════════════════════════════════════════════════
// SuperAdminSettingsPage.jsx — System Settings for Super Admin
// ══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import Tabs from '../../components/Tabs'

/* ── Tabs config ── */
const settingsTabs = [
  { value: 'general', label: 'General', icon: 'settings' },
  { value: 'academic', label: 'Academic', icon: 'school' },
  { value: 'permissions', label: 'Permissions', icon: 'admin_panel_settings' },
  { value: 'preferences', label: 'Preferences', icon: 'tune' },
]

/* ── Permissions matrix ── */
const roles = ['Super Admin', 'Admin', 'Faculty', 'Accountant', 'Student']
const permissions = [
  { key: 'manage_users', label: 'Manage Users',       access: [true, true, false, false, false] },
  { key: 'manage_depts', label: 'Manage Departments', access: [true, true, false, false, false] },
  { key: 'view_reports', label: 'View Reports',       access: [true, true, true, true, false] },
  { key: 'manage_fees', label: 'Manage Fees',         access: [true, true, false, true, false] },
  { key: 'mark_attendance', label: 'Mark Attendance',  access: [true, true, true, false, false] },
]

export default function SuperAdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  /* ── Preferences toggles ── */
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)

  return (
    <DashboardLayout>
      <div id="super-admin-settings-page">
        {/* ── Page Header ── */}
        <div className="page-header" id="settings-page-header">
          <h1>System Settings</h1>
          <p>Configure institution details, academic parameters, role permissions, and system preferences.</p>
        </div>

        {/* ── Tabs ── */}
        <Tabs
          tabs={settingsTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          id="settings-tabs"
        />

        {/* ═══ General Tab ═══ */}
        {activeTab === 'general' && (
          <div className="section-panel" id="settings-general-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">apartment</span>
              <h2>Institution Information</h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="form-group form-group--full">
                  <label htmlFor="inst-name">College Name</label>
                  <input type="text" id="inst-name" defaultValue="National Institute of Technology, Surathkal" />
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="inst-address">Address</label>
                  <textarea id="inst-address" rows={3} defaultValue="NH 66, Srinivasnagar, Surathkal, Mangalore, Karnataka 575025" />
                </div>
                <div className="form-group">
                  <label htmlFor="inst-phone">Phone</label>
                  <input type="tel" id="inst-phone" defaultValue="+91 824 2474 000" />
                </div>
                <div className="form-group">
                  <label htmlFor="inst-email">Email</label>
                  <input type="email" id="inst-email" defaultValue="info@nitk.edu.in" />
                </div>
                <div className="form-group">
                  <label htmlFor="inst-website">Website</label>
                  <input type="url" id="inst-website" defaultValue="https://www.nitk.ac.in" />
                </div>
                <div className="form-group">
                  <label htmlFor="inst-logo">Logo</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 'var(--radius-lg)',
                      background: 'var(--color-surface-container-high)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--color-text-muted)',
                    }}>
                      <span className="material-symbols-rounded">image</span>
                    </div>
                    <button type="button" className="btn" id="upload-logo-btn">Upload Logo</button>
                  </div>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn">Reset</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        )}

        {/* ═══ Academic Tab ═══ */}
        {activeTab === 'academic' && (
          <div className="section-panel" id="settings-academic-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">calendar_month</span>
              <h2>Academic Configuration</h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="acad-year">Current Academic Year</label>
                  <input type="text" id="acad-year" defaultValue="2025-26" />
                </div>
                <div className="form-group">
                  <label htmlFor="acad-system">Semester System</label>
                  <select id="acad-system" defaultValue="semester">
                    <option value="semester">Semester</option>
                    <option value="trimester">Trimester</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="acad-current-sem">Current Semester</label>
                  <select id="acad-current-sem" defaultValue="2">
                    {Array.from({ length: 8 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="acad-exam-type">Exam Type</label>
                  <select id="acad-exam-type" defaultValue="internal-external">
                    <option value="internal-external">Internal + External</option>
                    <option value="continuous">Continuous Assessment</option>
                    <option value="external-only">External Only</option>
                  </select>
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="acad-grading">Grading System</label>
                  <select id="acad-grading" defaultValue="10-point">
                    <option value="10-point">10-Point CGPA</option>
                    <option value="4-point">4-Point GPA</option>
                    <option value="percentage">Percentage</option>
                    <option value="letter">Letter Grade</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn">Reset</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        )}

        {/* ═══ Permissions Tab ═══ */}
        {activeTab === 'permissions' && (
          <div className="section-panel" id="settings-permissions-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">shield_person</span>
              <h2>Role Permissions Matrix</h2>
            </div>
            <table className="data-table" id="permissions-matrix-table">
              <thead>
                <tr>
                  <th>Permission</th>
                  {roles.map((role) => (
                    <th key={role} style={{ textAlign: 'center' }}>{role}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm) => (
                  <tr key={perm.key} id={`perm-${perm.key}`}>
                    <td style={{ fontWeight: 600 }}>{perm.label}</td>
                    {perm.access.map((hasAccess, idx) => (
                      <td key={idx} style={{ textAlign: 'center' }}>
                        {hasAccess ? (
                          <span className="material-symbols-rounded" style={{ color: '#2e7d32', fontSize: 20 }}>
                            check_circle
                          </span>
                        ) : (
                          <span className="material-symbols-rounded" style={{ color: 'var(--color-outline-variant)', fontSize: 20 }}>
                            cancel
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ═══ Preferences Tab ═══ */}
        {activeTab === 'preferences' && (
          <div className="section-panel" id="settings-preferences-panel">
            <div className="section-panel__header">
              <span className="material-symbols-rounded">tune</span>
              <h2>System Preferences</h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="pref-timezone">Timezone</label>
                  <select id="pref-timezone" defaultValue="IST">
                    <option value="IST">Asia/Kolkata (IST, +05:30)</option>
                    <option value="UTC">UTC (+00:00)</option>
                    <option value="EST">America/New_York (EST, −05:00)</option>
                    <option value="PST">America/Los_Angeles (PST, −08:00)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="pref-date-format">Date Format</label>
                  <select id="pref-date-format" defaultValue="DD/MM/YYYY">
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="pref-language">Language</label>
                  <select id="pref-language" defaultValue="en">
                    <option value="en">English</option>
                    <option value="hi">Hindi (हिन्दी)</option>
                    <option value="kn">Kannada (ಕನ್ನಡ)</option>
                    <option value="ta">Tamil (தமிழ்)</option>
                  </select>
                </div>

                {/* ── Toggle-style checkboxes ── */}
                <div className="form-group form-group--full">
                  <div className="settings-section">
                    <h3 className="settings-section__title">Notifications</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      {/* Email Notifications */}
                      <label
                        htmlFor="pref-email-notif"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: 'var(--space-3) var(--space-4)',
                          background: 'var(--color-surface-container-low)',
                          borderRadius: 'var(--radius-lg)', cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                          <span className="material-symbols-rounded" style={{ color: 'var(--color-text-muted)', fontSize: 20 }}>mail</span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Email Notifications</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Receive system alerts and updates via email</div>
                          </div>
                        </div>
                        <div
                          onClick={() => setEmailNotifications(!emailNotifications)}
                          style={{
                            width: 44, height: 24, borderRadius: 12,
                            background: emailNotifications ? '#2e7d32' : 'var(--color-outline-variant)',
                            position: 'relative', transition: 'background 0.2s', cursor: 'pointer',
                          }}
                        >
                          <div style={{
                            width: 18, height: 18, borderRadius: '50%', background: '#fff',
                            position: 'absolute', top: 3,
                            left: emailNotifications ? 23 : 3,
                            transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                          }} />
                        </div>
                        <input
                          type="checkbox"
                          id="pref-email-notif"
                          checked={emailNotifications}
                          onChange={() => setEmailNotifications(!emailNotifications)}
                          style={{ display: 'none' }}
                        />
                      </label>

                      {/* SMS Alerts */}
                      <label
                        htmlFor="pref-sms-alerts"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: 'var(--space-3) var(--space-4)',
                          background: 'var(--color-surface-container-low)',
                          borderRadius: 'var(--radius-lg)', cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                          <span className="material-symbols-rounded" style={{ color: 'var(--color-text-muted)', fontSize: 20 }}>sms</span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>SMS Alerts</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Receive critical alerts via SMS to registered mobile</div>
                          </div>
                        </div>
                        <div
                          onClick={() => setSmsAlerts(!smsAlerts)}
                          style={{
                            width: 44, height: 24, borderRadius: 12,
                            background: smsAlerts ? '#2e7d32' : 'var(--color-outline-variant)',
                            position: 'relative', transition: 'background 0.2s', cursor: 'pointer',
                          }}
                        >
                          <div style={{
                            width: 18, height: 18, borderRadius: '50%', background: '#fff',
                            position: 'absolute', top: 3,
                            left: smsAlerts ? 23 : 3,
                            transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                          }} />
                        </div>
                        <input
                          type="checkbox"
                          id="pref-sms-alerts"
                          checked={smsAlerts}
                          onChange={() => setSmsAlerts(!smsAlerts)}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn">Reset</button>
                <button type="submit" className="btn btn-primary">Save Preferences</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
