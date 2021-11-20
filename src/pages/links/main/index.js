import React from 'react'

import { classNames } from '@common/helpers'

import LinkTypes from '../components/link-types'
import Title from '../components/title'

import './_style.scss'

const blk = 'links-page'

const Main = () => (
  <div className={classNames({ blk })}>
    <div className={classNames({ blk, elt: 'title-wrapper' })}>
      <Title />
    </div>
    <div className={classNames({ blk, elt: 'types-wrapper' })}>
      <LinkTypes />
    </div>
  </div>
)

export default Main
