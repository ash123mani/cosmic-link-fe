import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'managed-folder-card'

const FolderCard = ({ folder, active, onSelect }) => (
  <button
    type="button"
    className={classNames({ blk, mods: [active && 'active'] })}
    onClick={() => onSelect(folder.id)}
  >
    <div className={classNames({ blk, elt: 'top' })}>
      <h3 className={classNames({ blk, elt: 'name' })}>{folder.name}</h3>
      <span className={classNames({ blk, elt: 'role', mods: [folder.myRole] })}>{folder.myRole}</span>
    </div>
    {folder.description && <p className={classNames({ blk, elt: 'desc' })}>{folder.description}</p>}
    <div className={classNames({ blk, elt: 'meta' })}>
      <span>
        {folder.memberCount || 0}
        {' '}
        members
      </span>
      <span>
        {folder.linkCount || 0}
        {' '}
        links
      </span>
    </div>
  </button>
)

FolderCard.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    myRole: PropTypes.string,
    memberCount: PropTypes.number,
    linkCount: PropTypes.number,
  }).isRequired,
  active: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
}

FolderCard.defaultProps = {
  active: false,
}

export default FolderCard
