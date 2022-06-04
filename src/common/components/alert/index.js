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
  const [fadeDown, setfadeDown] = useState(false)
  const [fadeUp, setfadeUp] = useState(false)

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

  const closeAlert = () => setTimeout(() => onClose(), 799)

  useEffect(() => {
    setfadeDown(true)
  }, [])

  useEffect(() => {
    let timer
    let closeTimer

    if (autoClose) {
      timer = setTimeout(() => {
        setfadeUp(true)
        closeAlert()
        clearTimeout(closeTimer)
      }, duration)
    }

    return () => timer && clearTimeout(timer)
  }, [])

  return (
    <div className={eltClassName}>
      <div className={classNames({ blk, elt: 'message' })}>{message}</div>
      {/* <div>Close</div> */}
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
