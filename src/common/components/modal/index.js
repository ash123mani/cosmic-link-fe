import React from 'react'
import { createPortal } from 'react-dom'

import { classNames } from '@common/helpers'

import Header from './header'
import Content from './content'
import './_style.scss'

const blk = 'cosmic-modal'

const Wrapper = ({ children, className, backdrop = true }) => createPortal(
  <div className={classNames({ blk, className })}>
    <div className={classNames({ blk, elt: 'wrapper', mods: [backdrop && 'backdrop'] })}>
      {children}
    </div>
  </div>,
  document.querySelector('#modal'),
)

export default {
  Wrapper,
  Header,
  Content,
}
