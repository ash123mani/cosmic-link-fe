import React from 'react'
import { NavLink } from 'react-router-dom'

import { classNames } from '@common/helpers'
import { Button } from '@common'

import './_style.scss'

const blk = 'cosmic-header'

const Header = () => (
  <div className={classNames({ blk })}>
    <NavLink to="/" className={classNames({ blk, elt: 'link' })}>
      <div className={classNames({ blk, elt: 'logo' })}>
        CosmicLink
      </div>
    </NavLink>

    <nav className={classNames({ blk, elt: 'navs' })}>
      <Button
        asNav
        to="/login"
        className={classNames({ blk, elt: 'sign-in' })}
      >
        Sign In
      </Button>
      <Button
        asNav
        to="/register"
        category="filled"
        className={classNames({ blk, elt: 'sign-up' })}
      >
        Sign Up
      </Button>
    </nav>
  </div>
)

export default Header
