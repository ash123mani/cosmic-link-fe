import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { Button, Spinner } from '@common'

import FolderCard from '../folder-card'
import './_style.scss'

const blk = 'managed-folder-list'

const FolderList = ({
  folders, selectedId, onSelect, onCreate, isLoading,
}) => (
  <aside className={classNames({ blk })} aria-label="Managed folders">
    <div className={classNames({ blk, elt: 'head' })}>
      <div className={classNames({ blk, elt: 'copy' })}>
        <p className={classNames({ blk, elt: 'eyebrow' })}>Workspace</p>
        <h2 className={classNames({ blk, elt: 'title' })}>Managed folders</h2>
        <p className={classNames({ blk, elt: 'subtitle' })}>Collaborate on links with your team.</p>
      </div>
      <Button category="filled" size="small" className={classNames({ blk, elt: 'create' })} onClick={onCreate}>New folder</Button>
    </div>

    {isLoading ? <Spinner center text="Loading folders..." /> : (
      <div className={classNames({ blk, elt: 'items' })} role="listbox" aria-label="Folders">
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            active={folder.id === selectedId}
            onSelect={onSelect}
          />
        ))}
        {!folders.length && (
          <div className={classNames({ blk, elt: 'empty' })}>
            <span>No managed folders yet.</span>
            <Button category="plain" size="small" onClick={onCreate}>Create folder</Button>
          </div>
        )}
      </div>
    )}
  </aside>
)

FolderList.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

FolderList.defaultProps = {
  selectedId: null,
  isLoading: false,
}

export default FolderList
