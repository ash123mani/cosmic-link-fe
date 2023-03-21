import React from 'react'
import { string, func, oneOf } from 'prop-types'

import { Modal } from '@common'
import ConfirmationButtons from '@local/confirmation-buttons'

const ConfirmationModal = ({
  message, confirmText, cancelText, handleSubmit, handleCancel, heading, modalType,
}) => (
  <Modal.Wrapper onEscKeydown={handleCancel}>
    <Modal.Header closeAble={false}>
      {heading}
    </Modal.Header>
    <Modal.Content>
      {message}
    </Modal.Content>
    <ConfirmationButtons
      confirmText={confirmText}
      cancelText={cancelText}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      type={modalType}
    />
  </Modal.Wrapper>
)

ConfirmationModal.propTypes = {
  message: string,
  confirmText: string,
  cancelText: string,
  handleSubmit: func.isRequired,
  handleCancel: func.isRequired,
  heading: string,
  modalType: oneOf[('submit', 'delete')],
}

ConfirmationModal.defaultProps = {
  message: 'Are you sure about this ?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  heading: 'Are you sure ?',
  modalType: 'submit',
}

export default ConfirmationModal
