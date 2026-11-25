import React, { useMemo, useState } from 'react'
import {
  bool, func, node, shape, string,
} from 'prop-types'
import { useMediaQuery } from 'react-responsive'

import { ActionSheet } from '@common'
import { classNames } from '@common/helpers'
import Image from '@local/image'
import mediaQueries from '@common/media-queries'

import './_style.scss'

const blk = 'link-card'

const Svg = ({ children }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const Icon = ({ name }) => {
  if (name === 'open') {
    return (
      <Svg>
        <path d="M14 3h7v7" />
        <path d="M10 14 21 3" />
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
      </Svg>
    )
  }
  if (name === 'copy') {
    return (
      <Svg>
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </Svg>
    )
  }
  if (name === 'send') {
    return (
      <Svg>
        <path d="M22 2 11 13" />
        <path d="M22 2 15 22l-4-9-9-4Z" />
      </Svg>
    )
  }
  if (name === 'move') {
    return (
      <Svg>
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
        <path d="M12 11v6" />
        <path d="m9 14 3 3 3-3" />
      </Svg>
    )
  }
  if (name === 'edit') {
    return (
      <Svg>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.1 2.1 0 1 1 3 3L12 15l-4 1 1-4Z" />
      </Svg>
    )
  }
  if (name === 'delete') {
    return (
      <Svg>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
      </Svg>
    )
  }
  return (
    <Svg>
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </Svg>
  )
}

Icon.propTypes = { name: string.isRequired }
Svg.propTypes = { children: node.isRequired }

const ActionButton = ({
  as, href, onClick, label, icon, danger, disabled,
}) => {
  const className = classNames({ blk, elt: 'action', mods: [danger && 'danger'] })
  const content = (
    <>
      <span className={classNames({ blk, elt: 'action-icon' })}><Icon name={icon} /></span>
      <span className={classNames({ blk, elt: 'action-label' })}>{label}</span>
    </>
  )
  if (as === 'a') {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} aria-label={label} title={label}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={className} onClick={onClick} aria-label={label} title={label} disabled={disabled}>
      {content}
    </button>
  )
}

ActionButton.propTypes = {
  as: string,
  href: string,
  onClick: func,
  label: string.isRequired,
  icon: string.isRequired,
  danger: bool,
  disabled: bool,
}

ActionButton.defaultProps = {
  as: 'button',
  href: '',
  onClick: null,
  danger: false,
  disabled: false,
}

const LinkCard = ({
  imageUrl, title, description, siteName, linkUrl, onLinkCopy, onLinkDelete, onLinkSend, onLinkMove, onLinkEdit, sharedBy, linkId, fadeDown, fadeUp, canDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [actionsOpen, setActionsOpen] = useState(false)
  const isMediumDown = useMediaQuery(mediaQueries.mediumDown)

  if (!title && !description) {
    return null
  }

  const handleCopy = async () => {
    if (onLinkCopy) {
      onLinkCopy()
    }
    await navigator.clipboard.writeText(linkUrl)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await onLinkDelete(linkId)
    setIsDeleting(false)
  }

  const moreActions = useMemo(() => {
    const items = []
    if (onLinkSend) {
      items.push({
        key: 'send', label: 'Send to user', icon: 'send', onClick: onLinkSend,
      })
    }
    if (onLinkMove) {
      items.push({
        key: 'move', label: 'Move to category', icon: 'move', onClick: onLinkMove,
      })
    }
    if (onLinkEdit) {
      items.push({
        key: 'edit', label: 'Edit link', icon: 'edit', onClick: onLinkEdit,
      })
    }
    if (canDelete) {
      items.push({
        key: 'delete', label: isDeleting ? 'Deleting...' : 'Delete link', icon: 'delete', danger: true, disabled: isDeleting, onClick: handleDelete,
      })
    }
    return items
  }, [onLinkSend, onLinkMove, onLinkEdit, canDelete, isDeleting, handleDelete])

  const wrapperClassName = classNames({ blk, mods: [fadeDown && 'fade-down', fadeUp && 'fade-up'] })

  return (
    <article className={wrapperClassName}>
      <div className={classNames({ blk, elt: 'body' })}>
        {imageUrl ? (
          <Image imageUrl={imageUrl} alt={siteName || title || 'Link preview'} height={isMediumDown ? '140px' : '180px'} />
        ) : (
          <div className={classNames({ blk, elt: 'site-name' })}>{siteName || 'Saved link'}</div>
        )}

        {title && <h3 className={classNames({ blk, elt: 'title' })}>{title}</h3>}
        {description && <p className={classNames({ blk, elt: 'description' })}>{description}</p>}
        {sharedBy && sharedBy.username && (
          <div className={classNames({ blk, elt: 'shared-by' })}>
            Shared by @
            {sharedBy.username}
          </div>
        )}
      </div>

      <div className={classNames({ blk, elt: 'bottom' })}>
        <ActionButton as="a" href={linkUrl} label="Open" icon="open" />
        <ActionButton onClick={handleCopy} label="Copy" icon="copy" />
        {moreActions.length > 0 && (
          <ActionButton onClick={() => setActionsOpen(true)} label="More" icon="more" disabled={isDeleting} />
        )}
      </div>

      <ActionSheet
        open={actionsOpen}
        onClose={() => setActionsOpen(false)}
        title={title || siteName || 'Link actions'}
        description={siteName || linkUrl}
        actions={moreActions.map((action) => ({ ...action, onClick: action.onClick }))}
      />
    </article>
  )
}

LinkCard.propTypes = {
  imageUrl: string,
  title: string,
  description: string,
  siteName: string,
  linkUrl: string.isRequired,
  onLinkCopy: func,
  onLinkDelete: func.isRequired,
  onLinkSend: func,
  onLinkMove: func,
  onLinkEdit: func,
  sharedBy: shape({ id: string, username: string }),
  linkId: string.isRequired,
  fadeDown: bool,
  fadeUp: bool,
  canDelete: bool,
}

LinkCard.defaultProps = {
  imageUrl: '',
  title: '',
  description: '',
  siteName: '',
  onLinkCopy() {},
  onLinkSend: null,
  onLinkMove: null,
  onLinkEdit: null,
  sharedBy: null,
  fadeDown: false,
  fadeUp: false,
  canDelete: true,
}

export default LinkCard
