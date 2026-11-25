import React from 'react'
import { useLocation, NavLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { bool, number, func } from 'prop-types'
import { useMediaQuery } from 'react-responsive'

import { classNames } from '@common/helpers'
import { Button } from '@common'
import mediaQueries from '@common/media-queries'
import {
  isLoginPage, isRegisterPage, isHomePage, isProfilePage, isLinksPage, isSharedPage, isManagedPage,
} from '@util/location'

import { mapStateToProps, actions } from './index.connect'
import './_style.scss'

const blk = 'cosmic-header'

const Header = ({ isUserLoggedIn, unseenCount, logOutUser }) => {
  const location = useLocation()
  const history = useHistory()
  const pathname = location.pathname
  const isMediumDown = useMediaQuery(mediaQueries.mediumDown)

  const isHome = isHomePage(pathname)
  const isRegister = isRegisterPage(pathname)
  const isLogin = isLoginPage(pathname)
  const isProfile = isProfilePage(pathname)
  const isLinks = isLinksPage(pathname)
  const isShared = isSharedPage(pathname)
  const isManaged = isManagedPage(pathname)

  const handleLogOut = () => {
    logOutUser()
    history.push('/')
  }

  return (
    <nav className={classNames({ blk, mods: [isMediumDown && 'compact'] })} aria-label="Primary navigation">
      <NavLink
        to={isUserLoggedIn ? '/links' : '/'}
        className={classNames({ blk, elt: 'link' })}
      >
        <div className={classNames({ blk, elt: 'logo' })}>
          C🪐smicLink
        </div>
      </NavLink>

      {isUserLoggedIn ? (
        !isMediumDown && (
          <div className={classNames({ blk, elt: 'navs' })}>
            <Button asNav to="/links" category={isLinks ? 'filled' : 'plain'} className={classNames({ blk, elt: 'nav-btn' })}>Links</Button>
            <Button
              asNav
              to="/shared"
              category={isShared ? 'filled' : 'plain'}
              className={classNames({ blk, elt: 'nav-btn', mods: ['shared'] })}
              aria-label={unseenCount > 0 ? `Shared, ${unseenCount} unread` : 'Shared'}
            >
              Shared
              {unseenCount > 0 && <span className={classNames({ blk, elt: 'badge' })} aria-hidden="true">{unseenCount > 99 ? '99+' : unseenCount}</span>}
            </Button>
            <Button asNav to="/managed" category={isManaged ? 'filled' : 'plain'} className={classNames({ blk, elt: 'nav-btn' })}>Managed</Button>
            {isProfile ? (
              <Button category="plain" onClick={handleLogOut} className={classNames({ blk, elt: 'nav-btn' })}>Logout</Button>
            ) : (
              <Button asNav to="/profile" category="plain" className={classNames({ blk, elt: 'nav-btn' })}>Profile</Button>
            )}
          </div>
        )
      ) : (
        <div className={classNames({ blk, elt: 'navs' })}>
          {(isHome || isRegister) && <Button asNav to="/login" className={classNames({ blk, elt: 'sign-in' })}>Log In</Button>}
          {(isLogin || isHome) && <Button asNav to="/register" category="filled" className={classNames({ blk, elt: 'sign-up' })}>Register</Button>}
        </div>
      )}
    </nav>
  )
}

Header.propTypes = {
  isUserLoggedIn: bool,
  unseenCount: number,
  logOutUser: func.isRequired,
}

Header.defaultProps = {
  isUserLoggedIn: false,
  unseenCount: 0,
}

export default connect(mapStateToProps, actions)(Header)
