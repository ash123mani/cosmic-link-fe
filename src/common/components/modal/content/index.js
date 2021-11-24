import React from 'react'
import { node, string } from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-modal-content'

const Content = ({ children, className }) => (
  <div className={classNames({ blk, className })}>
    {children}
  </div>
)

Content.propTypes = {
  children: node,
  className: string,
}

Content.defaultProps = {
  children: null,
  className: '',
}

export default Content
