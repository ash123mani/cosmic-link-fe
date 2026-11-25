import React from 'react'

import { Button } from '@common'
import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'not-found-page'

const NotFound = () => (
  <main className={classNames({ blk })}>
    <h1 className={classNames({ blk, elt: 'title' })}>Page not found</h1>
    <p className={classNames({ blk, elt: 'desc' })}>The page you’re looking for doesn’t exist or has moved.</p>
    <Button asNav to="/links" category="filled">Go to Links</Button>
  </main>
)

export default NotFound
