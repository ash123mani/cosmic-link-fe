import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bool } from 'prop-types'

import { isLoginPage, isRegisterPage, isHomePage } from '@util/location'

import { classNames } from '@common/helpers'
import { Button } from '@common'

import { mapStateToProps } from './index.connect'
import './_style.scss'

const blk = 'cosmic-header'

const Header = ({ isUserLoggedIn }) => {
  const location = useLocation()
  const pathname = location.pathname

  const isHome = isHomePage(pathname)
  const isRegister = isRegisterPage(pathname)
  const isLogin = isLoginPage(pathname)

  return (
    <div className={classNames({ blk })}>
      <NavLink
        to={isUserLoggedIn ? '/links' : '/'}
        className={classNames({ blk, elt: 'link' })}
      >
        <div className={classNames({ blk, elt: 'logo' })}>
          C🪐smicLink
        </div>
      </NavLink>

      <nav className={classNames({ blk, elt: 'navs' })}>
        {(isHome || isRegister) && (
          <Button
            asNav
            to="/login"
            className={classNames({ blk, elt: 'sign-in' })}
          >
            Sign In
          </Button>
        )}
        {(isLogin || isHome) && (
          <Button
            asNav
            to="/register"
            category="filled"
            className={classNames({ blk, elt: 'sign-up' })}
          >
            Sign Up
          </Button>
        )}

      </nav>
    </div>
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
