import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bool } from 'prop-types'

import { classNames } from '@common/helpers'
import { Button } from '@common'

import {
  isLoginPage, isRegisterPage, isHomePage, isProfilePage,
} from '@util/location'

import { mapStateToProps } from './index.connect'
import './_style.scss'

const blk = 'cosmic-header'

const Header = ({ isUserLoggedIn }) => {
  const location = useLocation()
  const pathname = location.pathname

  const isHome = isHomePage(pathname)
  const isRegister = isRegisterPage(pathname)
  const isLogin = isLoginPage(pathname)
  const isProfile = isProfilePage(pathname)

  return (
    <nav className={classNames({ blk })}>
      <NavLink
        to={isUserLoggedIn ? '/links' : '/'}
        className={classNames({ blk, elt: 'link' })}
      >
        <div className={classNames({ blk, elt: 'logo' })}>
          C🪐smicLink
        </div>
      </NavLink>

      {isUserLoggedIn && !isProfile && (
        <Button
          asNav
          to="/profile"
        >
          Profile
        </Button>
      )}

      {!isUserLoggedIn && (
        <div className={classNames({ blk, elt: 'navs' })}>
          {(isHome || isRegister) && (
            <Button
              asNav
              to="/login"
              className={classNames({ blk, elt: 'sign-in' })}
            >
              Log In
            </Button>
          )}
          {(isLogin || isHome) && (
            <Button
              asNav
              to="/register"
              category="filled"
              className={classNames({ blk, elt: 'sign-up' })}
            >
              Register
            </Button>
          )}

        </div>
      )}

    </nav>
  )
}

Header.propTypes = {
  isUserLoggedIn: bool,
}

Header.defaultProps = {
  isUserLoggedIn: false,
}

const HeaderWithConnect = connect(
  mapStateToProps,
)(Header)

export default HeaderWithConnect
