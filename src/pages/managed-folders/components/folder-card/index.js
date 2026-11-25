import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'managed-folder-card'

const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    <path d="M8 14h8M8 11h5" />
  </svg>
)

const FolderCard = ({ folder, active, onSelect }) => (
  <button
    type="button"
    className={classNames({ blk, mods: [active && 'active'] })}
    onClick={() => onSelect(folder.id)}
    aria-current={active ? 'true' : undefined}
  >
    <div className={classNames({ blk, elt: 'top' })}>
      <div className={classNames({ blk, elt: 'name-wrap' })}>
        <span className={classNames({ blk, elt: 'icon' })}><FolderIcon /></span>
        <h3 className={classNames({ blk, elt: 'name' })}>{folder.name}</h3>
      </div>
      <span className={classNames({ blk, elt: 'role' })}>{folder.myRole}</span>
    </div>
    {folder.description ? <p className={classNames({ blk, elt: 'desc' })}>{folder.description}</p> : null}
    <div className={classNames({ blk, elt: 'meta' })}>
      <span className={classNames({ blk, elt: 'counts' })}>
        <span>
          {folder.memberCount}
          {' '}
          members
        </span>
        <span className={classNames({ blk, elt: 'dot' })} aria-hidden="true">•</span>
        <span>
          {folder.linkCount}
          {' '}
          links
        </span>
      </span>
      <span className={classNames({ blk, elt: 'chevron' })} aria-hidden="true">›</span>
    </div>
  </button>
)

FolderCard.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    myRole: PropTypes.string,
    memberCount: PropTypes.number,
    linkCount: PropTypes.number,
  }).isRequired,
  active: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
}

FolderCard.defaultProps = { active: false }

export default FolderCard
