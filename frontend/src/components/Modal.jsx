// ══════════════════════════════════════════════════════════════════════
// Modal.jsx — Reusable modal overlay for forms
// ══════════════════════════════════════════════════════════════════════

import React, { useEffect } from 'react'

function Modal({ open, onClose, title, children, id = 'modal' }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="modal-overlay" id={`${id}-overlay`} onClick={onClose}>
      <div className="modal" id={id} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose} title="Close">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
