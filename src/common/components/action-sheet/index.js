import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-action-sheet'
const FOCUSABLE = 'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'

const getFocusable = (container) => (container
  ? Array.from(container.querySelectorAll(FOCUSABLE)).filter((el) => !el.hasAttribute('disabled'))
  : [])

const ActionSheet = ({
  open, title, description, actions, onClose,
}) => {
  const sheetRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }
    previousFocusRef.current = document.activeElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = getFocusable(sheetRef.current)
    if (focusables[0]) {
      focusables[0].focus()
    }

    const handleKeydown = (e) => {
      if (e.key === 'Escape' && onClose) {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') {
        return
      }
      const nodes = getFocusable(sheetRef.current)
      if (!nodes.length) {
        e.preventDefault()
        return
      }
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = originalOverflow
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus()
      }
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return createPortal(
    <div className={classNames({ blk })} role="dialog" aria-modal="true" aria-label={title || 'Actions'}>
      <button type="button" className={classNames({ blk, elt: 'backdrop' })} aria-label="Close actions" onClick={onClose} />
      <div ref={sheetRef} className={classNames({ blk, elt: 'sheet' })}>
        <div className={classNames({ blk, elt: 'handle' })} aria-hidden="true" />
        {(title || description) && (
          <div className={classNames({ blk, elt: 'head' })}>
            {title && <div className={classNames({ blk, elt: 'title' })}>{title}</div>}
            {description && <div className={classNames({ blk, elt: 'description' })}>{description}</div>}
          </div>
        )}
        <div className={classNames({ blk, elt: 'actions' })}>
          {actions.map((action) => (
            <button
              key={action.key || action.label}
              type="button"
              className={classNames({ blk, elt: 'action', mods: [action.danger && 'danger'] })}
              onClick={() => {
                if (action.disabled) {
                  return
                }
                if (action.onClick) {
                  action.onClick()
                }
                if (onClose) {
                  onClose()
                }
              }}
              disabled={action.disabled}
            >
              <span className={classNames({ blk, elt: 'action-label' })}>{action.label}</span>
              {action.helper && <span className={classNames({ blk, elt: 'action-helper' })}>{action.helper}</span>}
            </button>
          ))}
        </div>
        <button type="button" className={classNames({ blk, elt: 'cancel' })} onClick={onClose}>Cancel</button>
      </div>
    </div>,
    document.querySelector('#modal'),
  )
}

ActionSheet.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string.isRequired,
    helper: PropTypes.string,
    onClick: PropTypes.func,
    danger: PropTypes.bool,
    disabled: PropTypes.bool,
  })),
  onClose: PropTypes.func,
}

ActionSheet.defaultProps = {
  open: false,
  title: '',
  description: '',
  actions: [],
  onClose: () => {},
}

export default ActionSheet
