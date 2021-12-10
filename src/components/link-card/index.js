import React from 'react'
import { string } from 'prop-types'

import { classNames } from '@common/helpers'
import Image from '@local/image'

import './_style.scss'

const blk = 'link-card'

const LinkCard = ({
  imageUrl, title, description, siteName, linkUrl,
}) => {
  if (!title && !description) {
    return null
  }

  return (
    <div className={classNames({ blk })}>
      <div>
        {
          imageUrl ? (
            <Image
              imageUrl={imageUrl}
              alt={siteName}
              height="200px"
            />
          ) : (
            <div className={classNames({ blk, elt: 'site-name' })}>
              {siteName}
            </div>
          )
        }

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

      <div className={classNames({ blk, elt: 'bottom' })}>
        <a
          href={linkUrl}
          target="_blank"
          rel="noreferrer"
          className={classNames({ blk, elt: 'link' })}
        >
          Open Link 🔗
        </a>
      </div>
    </div>
  )
}

LinkCard.propTypes = {
  imageUrl: string,
  title: string,
  description: string,
  siteName: string,
  linkUrl: string.isRequired,
}

LinkCard.defaultProps = {
  imageUrl: '',
  title: '',
  description: '',
  siteName: '',
}

export default LinkCard
