import React from 'react'
import { string } from 'prop-types'

import { classNames } from '@common/helpers'
import Image from '@local/image'

import linkIcon from '@images/link.svg'

import './_style.scss'

const blk = 'empty-message'

const EmptyMessage = ({ className, message }) => {
  const wrapperClassName = classNames({ className, blk })

  return (
    <div className={wrapperClassName}>
      <Image
        role="button"
        imageUrl={linkIcon}
        className={classNames({ blk, elt: 'link-image' })}
      />
      <div className={classNames({ blk, elt: 'text' })}>
        {message}
      </div>
    </div>
  )
}

EmptyMessage.propTypes = {
  className: string,
  message: string,
}

EmptyMessage.defaultProps = {
  className: '',
  message: 'You do not have any link in your cosmos',
}

export default EmptyMessage
