import React from 'react'
import { shape, string } from 'prop-types'

import Image from '@local/image'
import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'edit-link-context'

const getHostname = (url) => {
  if (!url) {
    return ''
  }
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch (e) {
    return url
  }
}

const EditLinkContext = ({ link }) => {
  const source = link?.siteName || getHostname(link?.linkUrl)
  const url = link?.linkUrl || ''

  return (
    <section className={classNames({ blk })} aria-label="Link being edited">
      <div className={classNames({ blk, elt: 'media' })}>
        <Image
          imageUrl={link?.imageUrl}
          alt={link?.title || source || 'Link preview'}
          height="72px"
          width="72px"
          className={classNames({ blk, elt: 'image' })}
        />
      </div>
      <div className={classNames({ blk, elt: 'details' })}>
        <p className={classNames({ blk, elt: 'label' })}>Editing</p>
        {source ? <p className={classNames({ blk, elt: 'source' })}>{source}</p> : null}
        {url ? (
          <a
            className={classNames({ blk, elt: 'url' })}
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            title={url}
          >
            {url}
          </a>
        ) : null}
      </div>
    </section>
  )
}

EditLinkContext.propTypes = {
  link: shape({
    imageUrl: string,
    title: string,
    siteName: string,
    linkUrl: string,
  }),
}

EditLinkContext.defaultProps = {
  link: null,
}

export default EditLinkContext
