import React from 'react'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'home-page'

const Main = () => (
  <main className={classNames({ blk })}>
    <div className={classNames({ blk, elt: 'landing' })}>
      <h1 className={classNames({ blk, elt: 'title' })}>
        One place for all your Links.
      </h1>
      <h2 className={classNames({ blk, elt: 'subtitle' })}>
        Build your cosmos of links by keeping your links inside CosmicLink
      </h2>
    </div>
  </main>
)

export default Main
