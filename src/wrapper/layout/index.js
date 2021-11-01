import React from 'react'
import { node } from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const Layout = ({ children }) => (
  <div className={classNames({ blk: 'layout' })}>
    {children}
  </div>
)

Layout.propTypes = {
  children: node.isRequired,
}

export default Layout
