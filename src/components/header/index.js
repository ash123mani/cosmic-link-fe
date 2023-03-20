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

  // const handleInstall = (event) => {
  //   const srcElement = event.target
  //   window.deferredPrompt.prompt()
  //   srcElement.classList.add('hidden')
  //   window.deferredPrompt.userChoice.then((choice) => {
  //     if (choice.outcome === 'accepted') {
  //       console.log('User accepted the install prompt', choice)
  //     } else {
  //       srcElement.classList.remove('hidden')
  //       console.log('User dismissed the install prompt', choice)
  //     }
  //     window.deferredPrompt = null
  //   })
  // }

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

      <div className={classNames({ blk, elt: 'navs' })}>
        {isUserLoggedIn && !isProfile && (
          <Button
            asNav
            to="/profile"
          >
            Profile
          </Button>
        )}
        {/* {isUserLoggedIn && (
          <Button
            category="filled"
            className={classNames({ blk, elt: 'install-btn' })}
            onClick={handleInstall}
          >
            Install
          </Button>
        ) } */}
      </div>

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
