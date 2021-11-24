import React from 'react'
import { createPortal } from 'react-dom'

import { classNames } from '@common/helpers'

import Header from './header'
import Content from './content'
import './_style.scss'

const blk = 'cosmic-modal'

const Wrapper = ({ children, className }) => createPortal(
  <div className={classNames({ blk, className })}>
    <div className={classNames({ blk, elt: 'wrapper' })}>
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
