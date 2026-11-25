import React from 'react'
import {
  node, string, bool, func,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-modal-header'

const ModalHeader = ({
  children, className, closeAble, onClose, id,
}) => (
  <div className={classNames({ blk, className })}>
    <div id={id} className={classNames({ blk, elt: 'title' })}>{children}</div>
    {closeAble && (
      <button
        type="button"
        aria-label="Close modal"
        className={classNames({ blk, elt: 'close' })}
        onClick={onClose}
      />
    )}
  </div>
)

ModalHeader.propTypes = {
  children: node.isRequired,
  className: string,
  closeAble: bool,
  onClose: func,
  id: string,
}

ModalHeader.defaultProps = {
  className: '',
  closeAble: true,
  onClose: () => {},
  id: undefined,
}

export default ModalHeader
