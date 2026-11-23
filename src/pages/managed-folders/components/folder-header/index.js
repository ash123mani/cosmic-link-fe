import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { Button } from '@common'

import { canManageFolder } from '../../utils'
import './_style.scss'

const blk = 'managed-folder-header'

const FolderHeader = ({
  folder, currentUserId, onRename, onDelete, onLeave, isLastAdmin,
}) => {
  const isAdmin = canManageFolder(folder)
  const me = (folder.members || []).find((member) => String(member.userId) === String(currentUserId))

  return (
    <header className={classNames({ blk })}>
      <div className={classNames({ blk, elt: 'main' })}>
        <div className={classNames({ blk, elt: 'title-row' })}>
          <h1 className={classNames({ blk, elt: 'title' })}>{folder.name}</h1>
          <span className={classNames({ blk, elt: 'role' })}>{folder.myRole}</span>
        </div>
        {folder.description && <p className={classNames({ blk, elt: 'desc' })}>{folder.description}</p>}
        <div className={classNames({ blk, elt: 'meta' })}>
          <span>
            {(folder.members || []).length}
            {' '}
            members
          </span>
          <span>
            {folder.linkCount || 0}
            {' '}
            links
          </span>
        </div>
      </div>
      <div className={classNames({ blk, elt: 'actions' })}>
        {isAdmin && <Button category="plain" size="small" onClick={onRename}>Rename</Button>}
        {isAdmin && <Button category="danger" size="small" onClick={onDelete}>Delete folder</Button>}
        {!isAdmin && me && (
          <Button
            category="danger"
            size="small"
            onClick={onLeave}
            disabled={isLastAdmin}
            title={isLastAdmin ? 'Folder must have at least one admin' : ''}
          >
            Leave folder
          </Button>
        )}
      </div>
    </header>
  )
}

FolderHeader.propTypes = {
  folder: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    myRole: PropTypes.string,
    linkCount: PropTypes.number,
    members: PropTypes.arrayOf(PropTypes.shape({ userId: PropTypes.string, role: PropTypes.string })),
  }).isRequired,
  currentUserId: PropTypes.string,
  onRename: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  isLastAdmin: PropTypes.bool,
}

FolderHeader.defaultProps = {
  currentUserId: null,
  isLastAdmin: false,
}

export default FolderHeader
