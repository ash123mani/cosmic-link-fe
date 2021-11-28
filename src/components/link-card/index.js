import React from 'react'
import { string } from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'link-card'

const LinkCard = ({
  imageUrl, title, description, siteName,
}) => {
  if (!title && !description) {
    return null
  }

  return (
    <div className={classNames({ blk })}>
      <img
        src={imageUrl}
        alt={siteName}
        className={classNames({ blk, elt: 'image' })}
      />

      {title && (
        <div className={classNames({ blk, elt: 'title' })}>
          {title}
        </div>
      )}

      {description && (
        <div className={classNames({ blk, elt: 'description' })}>
          {description}
        </div>
      )}

    </div>
  )
}

LinkCard.propTypes = {
  imageUrl: string,
  title: string,
  description: string,
  siteName: string,
}

LinkCard.defaultProps = {
  imageUrl: '',
  title: '',
  description: '',
  siteName: '',
}

export default LinkCard
