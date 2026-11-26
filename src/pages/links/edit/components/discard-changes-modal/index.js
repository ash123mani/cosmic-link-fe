import React from 'react'
import { func } from 'prop-types'

import { Modal } from '@common'
import { classNames } from '@common/helpers'
import ConfirmationButtons from '@local/confirmation-buttons'

const blk = 'edit-link-page'

const DiscardChangesModal = ({ onCancel, onConfirm }) => (
  <Modal.Wrapper onEscKeydown={onCancel}>
    <Modal.Header closeAble onClose={onCancel}>Discard changes?</Modal.Header>
    <Modal.Content>
      <p className={classNames({ blk, elt: 'discard-copy' })}>You have unsaved changes. Leave without saving?</p>
      <ConfirmationButtons
        handleCancel={onCancel}
        handleSubmit={onConfirm}
        confirmText="Discard"
        cancelText="Keep editing"
        type="delete"
        submitButtonType="button"
        category="dark"
      />
    </Modal.Content>
  </Modal.Wrapper>
)

DiscardChangesModal.propTypes = {
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
}

export default DiscardChangesModal
