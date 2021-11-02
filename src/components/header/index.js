import React from 'react'

import { classNames } from '@common/helpers'
import { Button } from '@common'

import './_style.scss'

const blk = 'cosmic-header'

const Header = () => (
  <div className={classNames({ blk })}>
    <div className={classNames({ blk, elt: 'logo' })}>
      CosmicLink
    </div>
    <nav className={classNames({ blk, elt: 'navs' })}>
      <Button
        className={classNames({ blk, elt: 'sign-in' })}
      >
        Sign In
      </Button>
      <Button
        category="filled"
        className={classNames({ blk, elt: 'sign-up' })}
      >
        Sign Up
      </Button>
    </nav>
  </div>
)

export default Header
