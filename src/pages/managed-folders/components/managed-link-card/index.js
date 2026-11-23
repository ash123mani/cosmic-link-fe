import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { Modal } from '@common'
import ConfirmationButtons from '@local/confirmation-buttons'
import LinkCard from '@local/link-card'

import './_style.scss'

const blk = 'managed-link-card'

const ManagedLinkCard = ({
  link, canMutate, onEdit, onDelete,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div className={classNames({ blk })}>
      <LinkCard
        imageUrl={link.imageUrl}
        title={link.title}
        description={link.description}
        siteName={link.siteName}
        linkUrl={link.linkUrl}
        linkId={link.id}
        sharedBy={link.createdBy ? { username: link.createdBy.username, id: link.createdBy.id } : null}
        onLinkCopy={() => {}}
        onLinkDelete={() => setConfirmDelete(true)}
        onLinkEdit={canMutate ? () => onEdit(link) : null}
        canDelete={canMutate}
      />
      <div className={classNames({ blk, elt: 'meta' })}>
        {`Added by ${link.createdBy?.username || 'member'}`}
        {link.lastEditedBy?.username ? ` · Edited by ${link.lastEditedBy.username}` : ''}
      </div>

      {confirmDelete && (
        <Modal.Wrapper onEscKeydown={() => setConfirmDelete(false)}>
          <Modal.Header closeAble onClose={() => setConfirmDelete(false)}>Delete link?</Modal.Header>
          <Modal.Content>
            <p className={classNames({ blk, elt: 'confirm' })}>This removes the link for everyone in the folder.</p>
            <ConfirmationButtons
              handleCancel={() => setConfirmDelete(false)}
              handleSubmit={async () => {
                await onDelete(link); setConfirmDelete(false)
              }}
              confirmText="Delete link"
              cancelText="Cancel"
              type="delete"
              submitButtonType="button"
            />
          </Modal.Content>
        </Modal.Wrapper>
      )}
    </div>
  )
}

ManagedLinkCard.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.string,
    linkUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    siteName: PropTypes.string,
    imageUrl: PropTypes.string,
    createdBy: PropTypes.shape({ id: PropTypes.string, username: PropTypes.string }),
    lastEditedBy: PropTypes.shape({ username: PropTypes.string }),
  }).isRequired,
  canMutate: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

ManagedLinkCard.defaultProps = {
  canMutate: false,
}

export default ManagedLinkCard
