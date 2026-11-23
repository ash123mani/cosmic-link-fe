import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { Input, Modal } from '@common'
import ConfirmationButtons from '@local/confirmation-buttons'

import './_style.scss'

const blk = 'rename-managed-folder-modal'

const RenameFolderModal = ({
  isOpen, onClose, onSubmit, isSubmitting, folder,
}) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setName(folder?.name || '')
      setError('')
    }
  }, [isOpen, folder])

  if (!isOpen) {
    return null
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Folder name is required')
      return
    }
    const res = await onSubmit({ name: name.trim(), description: folder?.description || '' })
    if (!res?.type?.endsWith('_SUCCESS')) {
      setError(res?.payload?.message || 'Unable to rename folder')
    }
  }

  return (
    <Modal.Wrapper onEscKeydown={() => !isSubmitting && onClose()}>
      <Modal.Header closeAble={!isSubmitting} onClose={onClose}>Rename folder</Modal.Header>
      <Modal.Content>
        <div className={classNames({ blk })}>
          <Input
            autoFocus
            name="rename-folder"
            label="Folder name"
            category="light"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <div className={classNames({ blk, elt: 'error' })}>{error}</div>}
          <ConfirmationButtons
            handleCancel={onClose}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitDisabled={!name.trim()}
            confirmText="Save"
            cancelText="Cancel"
            submitButtonType="button"
          />
        </div>
      </Modal.Content>
    </Modal.Wrapper>
  )
}

RenameFolderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  folder: PropTypes.shape({ name: PropTypes.string, description: PropTypes.string }),
}

RenameFolderModal.defaultProps = { isSubmitting: false, folder: null }

export default RenameFolderModal
