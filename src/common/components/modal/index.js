import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { classNames } from '@common/helpers'

import Header from './header'
import Content from './content'
import './_style.scss'

const blk = 'cosmic-modal'
const FOCUSABLE = 'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
let modalUid = 0

const getFocusable = (container) => (container
  ? Array.from(container.querySelectorAll(FOCUSABLE)).filter((el) => !el.hasAttribute('disabled'))
  : [])

const Wrapper = ({
  children, className, backdrop = true, onEscKeydown, ariaLabel, ariaLabelledBy,
}) => {
  const wrapperRef = useRef(null)
  const previousFocusRef = useRef(null)
  const titleIdRef = useRef(null)
  if (!titleIdRef.current) {
    modalUid += 1
    titleIdRef.current = `cosmic-modal-title-${modalUid}`
  }
  const titleId = titleIdRef.current

  useEffect(() => {
    previousFocusRef.current = document.activeElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = getFocusable(wrapperRef.current)
    if (focusables[0]) {
      focusables[0].focus()
    }

    const handleKeydown = (e) => {
      if (e.key === 'Escape' && onEscKeydown) {
        e.preventDefault()
        onEscKeydown()
        return
      }
      if (e.key !== 'Tab') {
        return
      }
      const nodes = getFocusable(wrapperRef.current)
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
  }, [onEscKeydown])

  return createPortal(
    <div className={classNames({ blk, className })}>
      <div
        ref={wrapperRef}
        className={classNames({ blk, elt: 'wrapper', mods: [backdrop && 'backdrop'] })}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={!ariaLabel ? (ariaLabelledBy || titleId) : undefined}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return child
          }
          if (child.type === Header && !child.props.id && !ariaLabel && !ariaLabelledBy) {
            return React.cloneElement(child, { id: titleId })
          }
          return child
        })}
      </div>
    </div>,
    document.querySelector('#modal'),
  )
}

export default {
  Wrapper,
  Header,
  Content,
}
