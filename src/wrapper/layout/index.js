import React from 'react'
import { bool, node } from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const Layout = ({ children, hasBottomNav }) => (
  <div id="main-content" className={classNames({ blk: 'layout', mods: [hasBottomNav && 'with-bottom-nav'] })} tabIndex="-1">
    {children}
  </div>
)

Layout.propTypes = {
  children: node.isRequired,
  hasBottomNav: bool,
}

Layout.defaultProps = {
  hasBottomNav: false,
}

export default Layout
