import React from 'react'
import PropTypes from 'prop-types'

import { Button, Spinner } from '@common'
import { classNames } from '@common/helpers'

import ManagedLinkCard from '../managed-link-card'

const blk = 'managed-folders'

const FolderLinksPanel = ({
  links, isLoading, canMutateLink, onAdd, onEdit, onDelete, onCopy,
}) => (
  <section className={classNames({ blk, elt: 'panel' })}>
    <div className={classNames({ blk, elt: 'panel-head' })}>
      <div>
        <h3 className={classNames({ blk, elt: 'panel-title' })}>Links</h3>
        <p className={classNames({ blk, elt: 'panel-subtitle' })}>Links added here are visible to all folder members.</p>
      </div>
      <Button category="filled" size="small" className={classNames({ blk, elt: 'panel-action' })} onClick={onAdd}>Add link</Button>
    </div>
    {isLoading ? <Spinner center text="Loading links..." /> : (
      <div className={classNames({ blk, elt: 'list' })}>
        {links.map((link) => (
          <ManagedLinkCard
            key={link.id}
            link={link}
            canMutate={canMutateLink(link)}
            onEdit={() => onEdit(link)}
            onDelete={() => onDelete(link)}
            onCopy={() => onCopy(link)}
          />
        ))}
        {!links.length && <div className={classNames({ blk, elt: 'empty' })}>No links yet. Add the first link for your team.</div>}
      </div>
    )}
  </section>
)

FolderLinksPanel.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
  isLoading: PropTypes.bool,
  canMutateLink: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
}

FolderLinksPanel.defaultProps = {
  isLoading: false,
}

export default FolderLinksPanel
