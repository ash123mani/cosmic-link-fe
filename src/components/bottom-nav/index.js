import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { node, number, string } from 'prop-types'

import { classNames } from '@common/helpers'
import {
  isLinksPage, isManagedPage, isProfilePage, isSharedPage,
} from '@util/location'

import { mapStateToProps } from './index.connect'
import './_style.scss'

const blk = 'cosmic-bottom-nav'

const Svg = ({ children }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const Icon = ({ name }) => {
  if (name === 'links') {
    return (
      <Svg>
        <path d="M10 13a5 5 0 0 0 7.07 0l3.54-3.54a5 5 0 1 0-7.07-7.07L11.5 4.43" />
        <path d="M14 11a5 5 0 0 0-7.07 0L3.39 14.54a5 5 0 1 0 7.07 7.07L12.5 19.57" />
      </Svg>
    )
  }
  if (name === 'shared') {
    return <Svg><path d="M4 4h16v12H7l-3 3V4z" /></Svg>
  }
  if (name === 'managed') {
    return (
      <Svg>
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        <path d="M9 13h6" />
      </Svg>
    )
  }
  return (
    <Svg>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </Svg>
  )
}

Icon.propTypes = {
  name: string.isRequired,
}

Svg.propTypes = {
  children: node.isRequired,
}

const items = [
  {
    to: '/links', label: 'Links', icon: 'links', isActive: isLinksPage,
  },
  {
    to: '/shared', label: 'Shared', icon: 'shared', isActive: isSharedPage, badgeKey: 'unseenCount',
  },
  {
    to: '/managed', label: 'Managed', icon: 'managed', isActive: isManagedPage,
  },
  {
    to: '/profile', label: 'Profile', icon: 'profile', isActive: isProfilePage,
  },
]

const BottomNav = ({ unseenCount }) => {
  const { pathname } = useLocation()

  return (
    <nav className={classNames({ blk })} aria-label="Primary">
      {items.map((item) => {
        const active = item.isActive(pathname)
        const badge = item.badgeKey === 'unseenCount' ? unseenCount : 0
        const label = badge > 0 ? `${item.label}, ${badge} unread` : item.label
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={classNames({ blk, elt: 'item', mods: [active && 'active'] })}
            aria-current={active ? 'page' : undefined}
            aria-label={label}
          >
            <span className={classNames({ blk, elt: 'icon-wrap' })} aria-hidden="true">
              <span className={classNames({ blk, elt: 'icon' })}><Icon name={item.icon} /></span>
              {badge > 0 && <span className={classNames({ blk, elt: 'badge' })}>{badge > 99 ? '99+' : badge}</span>}
            </span>
            <span className={classNames({ blk, elt: 'label' })} aria-hidden="true">{item.label}</span>
            {badge > 0 && <span className="sr-only">{`${badge} unread`}</span>}
          </NavLink>
        )
      })}
    </nav>
  )
}

BottomNav.propTypes = {
  unseenCount: number,
}

BottomNav.defaultProps = {
  unseenCount: 0,
}

export default connect(mapStateToProps)(BottomNav)
