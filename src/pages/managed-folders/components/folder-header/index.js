import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { ActionSheet, Button } from '@common'

import { canManageFolder } from '../../utils'
import './_style.scss'

const blk = 'managed-folder-header'

const FolderHeader = ({
  folder, currentUserId, onRename, onDelete, onLeave, isLastAdmin, compact,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const isAdmin = canManageFolder(folder)
  const me = (folder.members || []).find((member) => String(member.userId) === String(currentUserId))
  const closeMenu = () => setMenuOpen(false)

  const actions = []
  if (isAdmin) {
    actions.push({ key: 'rename', label: 'Rename folder', onClick: onRename })
    actions.push({
      key: 'delete', label: 'Delete folder', onClick: onDelete, danger: true,
    })
  }
  if (!isAdmin && me) {
    actions.push({
      key: 'leave',
      label: 'Leave folder',
      helper: isLastAdmin ? 'Assign another admin before leaving' : '',
      onClick: onLeave,
      danger: true,
      disabled: isLastAdmin,
    })
  }

  return (
    <header className={classNames({ blk, mods: [compact && 'compact'] })}>
      <div className={classNames({ blk, elt: 'main' })}>
        <p className={classNames({ blk, elt: 'eyebrow' })}>Managed folder</p>
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
          <span className={classNames({ blk, elt: 'meta-sep' })} aria-hidden="true">•</span>
          <span>
            {folder.linkCount || 0}
            {' '}
            links
          </span>
        </div>
      </div>

      {compact ? (
        !!actions.length && (
          <button
            type="button"
            className={classNames({ blk, elt: 'overflow' })}
            aria-label="Folder actions"
            onClick={() => setMenuOpen(true)}
          >
            ⋯
          </button>
        )
      ) : (
        <div className={classNames({ blk, elt: 'actions' })}>
          {isAdmin && <Button category="plain" size="small" onClick={onRename}>Rename</Button>}
          {isAdmin && <Button category="danger" size="small" onClick={onDelete}>Delete folder</Button>}
          {!isAdmin && me && <Button category="danger" size="small" onClick={onLeave} disabled={isLastAdmin}>Leave folder</Button>}
        </div>
      )}

      <ActionSheet
        open={menuOpen}
        title={folder.name}
        description="Folder actions"
        actions={actions}
        onClose={closeMenu}
      />
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
  compact: PropTypes.bool,
}

FolderHeader.defaultProps = { currentUserId: null, isLastAdmin: false, compact: false }

export default FolderHeader
