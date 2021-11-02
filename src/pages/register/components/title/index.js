import React from 'react'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'title'

const Title = () => (
  <h3 className={classNames({ blk })}>Register for your CosmicLink journey</h3>
)

export default Title
