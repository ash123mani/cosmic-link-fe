import React from 'react'
import { func, shape, string } from 'prop-types'

import { classNames } from '@common/helpers'
import { Button } from '@common'

import './_style.scss'

const blk = 'shared-item'

const formatDate = (value) => {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

const SharedItem = ({ share, onOpen, onMove }) => {
  const unseen = share.status === 'unseen'
  const senderName = (share.sender && share.sender.username) ? share.sender.username : 'Someone'
  const title = share.title || share.linkUrl || 'Shared link'
  const domain = (() => {
    try {
      return new URL(share.linkUrl).hostname.replace(/^www\./, '')
    } catch (e) {
      return ''
    }
  })()

  return (
    <article className={classNames({ blk, mods: [unseen && 'unseen'] })}>
      <div className={classNames({ blk, elt: 'top' })}>
        <div className={classNames({ blk, elt: 'sender-wrap' })}>
          <span className={classNames({ blk, elt: 'avatar' })} aria-hidden="true">{senderName.charAt(0).toUpperCase()}</span>
          <div className={classNames({ blk, elt: 'meta' })}>
            <span className={classNames({ blk, elt: 'sender' })}>
              @
              {senderName}
            </span>
            <span className={classNames({ blk, elt: 'meta-sep' })}>•</span>
            <span>{formatDate(share.createdAt)}</span>
            {domain && (
              <>
                <span className={classNames({ blk, elt: 'meta-sep' })}>•</span>
                <span>{domain}</span>
              </>
            )}
          </div>
        </div>
        {unseen && <span className={classNames({ blk, elt: 'badge' })}>New</span>}
      </div>

      <div className={classNames({ blk, elt: 'title' })}>{title}</div>
      {share.description && <div className={classNames({ blk, elt: 'desc' })}>{share.description}</div>}
      {share.message && (
        <div className={classNames({ blk, elt: 'note' })}>
          <span className={classNames({ blk, elt: 'note-label' })}>Note</span>
          <p className={classNames({ blk, elt: 'note-text' })}>{share.message}</p>
        </div>
      )}

      <div className={classNames({ blk, elt: 'actions' })}>
        <Button category="filled" onClick={() => onOpen(share)}>Open link</Button>
        {onMove && <Button category="plain" onClick={() => onMove(share)}>Move to category</Button>}
      </div>
    </article>
  )
}

SharedItem.propTypes = {
  share: shape({
    id: string,
    linkUrl: string,
    title: string,
    description: string,
    message: string,
    status: string,
    createdAt: string,
    sender: shape({ username: string }),
  }).isRequired,
  onOpen: func.isRequired,
  onMove: func,
}

SharedItem.defaultProps = { onMove: null }

export default SharedItem
