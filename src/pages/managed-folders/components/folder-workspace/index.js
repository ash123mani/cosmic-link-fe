import React from 'react'
import {
  arrayOf, bool, func, node, shape, string,
} from 'prop-types'
import { useHistory } from 'react-router-dom'

import { classNames } from '@common/helpers'
import FolderHeader from '../folder-header'

import './_style.scss'

const blk = 'managed-folder-workspace'

const FolderWorkspace = ({
  folder, currentUserId, isMediumDown, isLastAdmin, activeScope, onRename, onDelete, onLeave, children,
}) => {
  const history = useHistory()
  if (!folder) {
    return null
  }

  const go = (scope) => {
    const base = `/managed/${folder.id}`
    history.push(scope === 'members' ? `${base}/members` : base)
  }

  return (
    <section className={classNames({ blk })}>
      {isMediumDown && (
        <button type="button" className={classNames({ blk, elt: 'back' })} onClick={() => history.push('/managed')}>
          ← All folders
        </button>
      )}
      <FolderHeader
        folder={folder}
        currentUserId={currentUserId}
        onRename={onRename}
        onDelete={onDelete}
        onLeave={onLeave}
        isLastAdmin={isLastAdmin}
        compact={isMediumDown}
      />
      <div className={classNames({ blk, elt: 'scope' })} role="tablist" aria-label="Folder sections">
        <button
          type="button"
          role="tab"
          aria-selected={activeScope === 'links'}
          className={classNames({ blk, elt: 'scope-btn', mods: [activeScope === 'links' && 'active'] })}
          onClick={() => go('links')}
        >
          Links
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeScope === 'members'}
          className={classNames({ blk, elt: 'scope-btn', mods: [activeScope === 'members' && 'active'] })}
          onClick={() => go('members')}
        >
          Members
          <span className={classNames({ blk, elt: 'scope-count' })}>{(folder.members || []).length}</span>
        </button>
      </div>
      <div className={classNames({ blk, elt: 'body' })}>{children}</div>
    </section>
  )
}

FolderWorkspace.propTypes = {
  folder: shape({ id: string, members: arrayOf(shape({})) }),
  currentUserId: string,
  isMediumDown: bool,
  isLastAdmin: bool,
  activeScope: string.isRequired,
  onRename: func.isRequired,
  onDelete: func.isRequired,
  onLeave: func.isRequired,
  children: node,
}

FolderWorkspace.defaultProps = {
  folder: null,
  currentUserId: '',
  isMediumDown: false,
  isLastAdmin: false,
  children: null,
}

export default FolderWorkspace
