import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { Button, Spinner } from '@common'

import FolderCard from '../folder-card'
import './_style.scss'

const blk = 'managed-folder-list'

const FolderList = ({
  folders, selectedId, isLoading, onSelect, onCreate,
}) => (
  <aside className={classNames({ blk })}>
    <div className={classNames({ blk, elt: 'head' })}>
      <div>
        <h2 className={classNames({ blk, elt: 'title' })}>Managed folders</h2>
        <p className={classNames({ blk, elt: 'subtitle' })}>Collaborate on links with your team.</p>
      </div>
      <Button category="filled" size="small" onClick={onCreate}>New folder</Button>
    </div>

    {isLoading && <Spinner center text="Loading folders..." />}
    {!isLoading && (
      <div className={classNames({ blk, elt: 'items' })}>
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
            <p>No managed folders yet.</p>
            <Button category="plain" size="small" onClick={onCreate}>Create folder</Button>
          </div>
        )}
      </div>
    )}
  </aside>
)

FolderList.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  selectedId: PropTypes.string,
  isLoading: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
}

FolderList.defaultProps = {
  selectedId: null,
  isLoading: false,
}

export default FolderList
