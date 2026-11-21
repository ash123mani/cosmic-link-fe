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

  return (
    <div className={classNames({ blk, mods: [unseen && 'unseen'] })}>
      <div className={classNames({ blk, elt: 'top' })}>
        <div className={classNames({ blk, elt: 'meta' })}>
          <span className={classNames({ blk, elt: 'sender' })}>
            @
            {senderName}
          </span>
          <span className={classNames({ blk, elt: 'meta-sep' })}>•</span>
          <span>{formatDate(share.createdAt)}</span>
          {unseen && <span className={classNames({ blk, elt: 'badge' })}>New</span>}
        </div>
      </div>
      <div className={classNames({ blk, elt: 'title' })}>{title}</div>
      {share.description && <div className={classNames({ blk, elt: 'desc' })}>{share.description}</div>}
      {share.message && (
        <div className={classNames({ blk, elt: 'note' })}>
          “
          {share.message}
          ”
        </div>
      )}
      <div className={classNames({ blk, elt: 'actions' })}>
        <Button category="plain" onClick={() => onOpen(share)}>Open link</Button>
        {onMove && <Button category="filled" onClick={() => onMove(share)}>Move to category</Button>}
      </div>
    </div>
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

SharedItem.defaultProps = {
  onMove: null,
}

export default SharedItem
