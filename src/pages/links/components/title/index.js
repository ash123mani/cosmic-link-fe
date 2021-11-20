import React from 'react'

import { Button } from '@common'
import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'links-title'

const Title = () => (
  <div className={classNames({ blk })}>
    <div className={classNames({ blk, elt: 'title' })}>Link categories</div>
    <Button category="vacant">+ Add a Link</Button>
  </div>
)

export default Title
