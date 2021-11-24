import React from 'react'
import { node, string, bool } from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-modal-header'

const ModalHeader = ({ children, className, closeAble }) => (
  <div className={classNames({ blk, className, mods: [closeAble && 'closeable'] })}>
    {children}
  </div>
)

ModalHeader.propTypes = {
  children: node.isRequired,
  className: string,
  closeAble: bool,
}

ModalHeader.defaultProps = {
  className: '',
  closeAble: true,
}

export default ModalHeader
