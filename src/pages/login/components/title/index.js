import React from 'react'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'title'

const Title = () => (
  <h3 className={classNames({ blk })}>Login into CosmicLink</h3>
)

export default Title
