import React from 'react'
import { string } from 'prop-types'

import { classNames } from '@common/helpers'
import cosmicLinkLogo from '@images/cosmic-link-logo.svg'

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
      <div className={classNames({ blk, elt: 'image' })}>
        <img
          src={imageUrl}
          alt={siteName}
          className={classNames({ blk, elt: 'image' })}
        />
      </div>

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
  imageUrl: cosmicLinkLogo,
  title: '',
  description: '',
  siteName: '',
}

export default LinkCard
