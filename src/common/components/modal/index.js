import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { classNames } from '@common/helpers'

import Header from './header'
import Content from './content'
import './_style.scss'

const blk = 'cosmic-modal'

const Wrapper = ({
  children, className, backdrop = true, onEscKeydown,
}) => {
  const handleEscKeydown = (e) => {
    if (e.keyCode === 27) {
      onEscKeydown()
    }
  }

  useEffect(() => {
    if (onEscKeydown) {
      document.addEventListener(
        'keydown', handleEscKeydown, false,
      )
    }

    return () => document.removeEventListener(
      'keydown', handleEscKeydown, false,
    )
  }, [])

  return createPortal(
    <div className={classNames({ blk, className })}>
      <div className={classNames({ blk, elt: 'wrapper', mods: [backdrop && 'backdrop'] })}>
        {children}
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
