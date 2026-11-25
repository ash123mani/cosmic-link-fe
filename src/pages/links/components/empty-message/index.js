import React from 'react'
import { string, bool } from 'prop-types'

import { classNames } from '@common/helpers'
import Image from '@local/image'

import linkIcon from '@images/link.svg'

import './_style.scss'

const blk = 'empty-message'

const EmptyMessage = ({ className, hasNoCategories }) => {
  const wrapperClassName = classNames({ className, blk })
  const message = hasNoCategories
    ? 'Create a category to start saving links.'
    : 'No links in this category yet.'

  return (
    <div className={wrapperClassName}>
      <Image
        imageUrl={linkIcon}
        className={classNames({ blk, elt: 'link-image' })}
        alt="No links"
      />
      <div className={classNames({ blk, elt: 'text' })}>{message}</div>
    </div>
  )
}

EmptyMessage.propTypes = {
  className: string,
  hasNoCategories: bool,
}

EmptyMessage.defaultProps = {
  className: '',
  hasNoCategories: false,
}

export default EmptyMessage
