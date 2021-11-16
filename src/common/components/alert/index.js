import React, { useEffect, useState } from 'react'
import {
  string, oneOf, bool, func, number,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-alert'

const Alert = ({
  type, message, center, autoClose, onClose, duration,
}) => {
  const [animateDown, setAnimateDown] = useState(false)
  const [animateUp, setAnimateUp] = useState(false)

  const eltClassName = classNames({
    blk,
    mods: [
      type && type,
      center && 'center',
      animateDown && 'animate-down',
      animateUp && 'animate-up',
    ],
  })

  const closeAlert = () => setTimeout(() => onClose(), 799)

  useEffect(() => {
    setAnimateDown(true)
  }, [])

  useEffect(() => {
    let timer
    let closeTimer

    if (autoClose) {
      timer = setTimeout(() => {
        setAnimateUp(true)
        closeAlert()
        clearTimeout(closeTimer)
      }, duration)
    }

    return () => timer && clearTimeout(timer)
  }, [])

  return (
    <div className={eltClassName}>
      <div className={classNames({ blk, elt: 'message' })}>{message}</div>
      <div>Close</div>
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
}

Alert.defaultProps = {
  type: 'warning',
  center: false,
  autoClose: false,
  onClose() {},
  duration: 2000,
}

export default Alert
