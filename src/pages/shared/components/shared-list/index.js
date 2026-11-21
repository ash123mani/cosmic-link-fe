import React from 'react'
import {
  arrayOf, func, shape, string,
} from 'prop-types'

import { classNames } from '@common/helpers'

import SharedItem from './shared-item'
import './_style.scss'

const blk = 'shared-list'

const SharedList = ({ shares, onOpen, onMove }) => (
  <div className={classNames({ blk })}>
    {shares.map((share) => (
      <SharedItem key={share.id} share={share} onOpen={onOpen} onMove={onMove} />
    ))}
  </div>
)

SharedList.propTypes = {
  shares: arrayOf(shape({ id: string })).isRequired,
  onOpen: func.isRequired,
  onMove: func,
}

SharedList.defaultProps = {
  onMove: null,
}

export default SharedList
