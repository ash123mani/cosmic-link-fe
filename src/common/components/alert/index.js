import React, { useEffect, useState, memo } from 'react'
import {
  string, oneOf, bool, func, number,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-alert'

const Alert = ({
  type, message, center, autoClose, onClose, duration, banner,
}) => {
  const [fadeDown, setFadeDown] = useState(false)
  const [fadeUp, setFadeUp] = useState(false)

  const eltClassName = classNames({
    blk,
    mods: [
      type && type,
      center && 'center',
      fadeDown && 'fade-down',
      fadeUp && 'fade-up',
      banner && 'banner',
    ],
  })

  useEffect(() => {
    setFadeDown(true)
    setFadeUp(false)
  }, [message, type])

  useEffect(() => {
    let timer
    let closeTimer

    if (autoClose) {
      timer = setTimeout(() => {
        setFadeUp(true)
        setFadeDown(false)
        closeTimer = setTimeout(() => onClose(), 799)
      }, duration)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      if (closeTimer) {
        clearTimeout(closeTimer)
      }
    }
  }, [autoClose, duration, onClose, message, type])

  const role = type === 'error' ? 'alert' : 'status'

  return (
    <div className={eltClassName} role={role} aria-live={type === 'error' ? 'assertive' : 'polite'}>
      <div className={classNames({ blk, elt: 'message' })}>{message}</div>
      <button
        type="button"
        className={classNames({ blk, elt: 'close' })}
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}

Alert.propTypes = {
  type: oneOf(['warning', 'info', 'error']),
  message: string.isRequired,
  center: bool,
  autoClose: bool,
  onClose: func,
  duration: number,
  banner: bool,
}

Alert.defaultProps = {
  type: 'warning',
  center: false,
  autoClose: false,
  onClose() {},
  duration: 2000,
  banner: true,
}

export default memo(Alert)
