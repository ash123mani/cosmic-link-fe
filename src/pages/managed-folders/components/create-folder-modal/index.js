import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { Input, Modal, MultiSelectDropDown } from '@common'
import ConfirmationButtons from '@local/confirmation-buttons'

import './_style.scss'

const blk = 'create-managed-folder-modal'

const CreateFolderModal = ({
  isOpen, onClose, onSubmit, searchUsers, searchedUsers, isSearchingUsers, isSubmitting, currentUserId,
}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [memberQuery, setMemberQuery] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setDescription('')
      setMemberQuery('')
      setSelectedMembers([])
      setError('')
    }
  }, [isOpen])

  useEffect(() => {
    const query = memberQuery.trim()
    if (!isOpen || query.length < 2) {
      return undefined
    }
    const timeout = setTimeout(() => searchUsers(query), 300)
    return () => clearTimeout(timeout)
  }, [isOpen, memberQuery, searchUsers])

  const options = useMemo(() => (
    (searchedUsers || [])
      .filter((user) => String(user.id) !== String(currentUserId))
      .map((user) => ({
        key: user.id,
        value: user.username,
        subLabel: user.email,
        ...user,
      }))
  ), [searchedUsers, currentUserId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError('Folder name is required')
      return
    }
    if (selectedMembers.length < 1) {
      setError('Add at least one member')
      return
    }
    const res = await onSubmit({
      name: name.trim(),
      description: description.trim(),
      memberIds: selectedMembers.map((member) => member.key),
    })
    if (!res?.type?.endsWith('_SUCCESS')) {
      setError((res?.payload?.message) || 'Unable to create folder')
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <Modal.Wrapper onEscKeydown={() => !isSubmitting && onClose()}>
      <Modal.Header closeAble={!isSubmitting} onClose={onClose}>New managed folder</Modal.Header>
      <Modal.Content>
        <form className={classNames({ blk })} onSubmit={handleSubmit}>
          <p className={classNames({ blk, elt: 'intro' })}>
            Create a collaborative folder. Members can view all links; admins can manage members and any link.
          </p>
          <Input
            autoFocus
            name="name"
            label="Folder name"
            category="light"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Design inspiration"
          />
          <Input
            name="description"
            label="Description"
            category="light"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
          />
          <MultiSelectDropDown
            category="light"
            label="Add members"
            placeholder="Search users by username or email"
            options={options}
            selected={selectedMembers}
            onChange={setSelectedMembers}
            onSearchChange={setMemberQuery}
            searchValue={memberQuery}
            loading={isSearchingUsers}
            emptyText={memberQuery.trim().length < 2 ? 'Type at least 2 characters to search' : 'No users found'}
          />
          {error && <div className={classNames({ blk, elt: 'error' })}>{error}</div>}
          <ConfirmationButtons
            handleCancel={onClose}
            isSubmitting={isSubmitting}
            confirmText="Create folder"
            cancelText="Cancel"
            submitButtonType="submit"
          />
        </form>
      </Modal.Content>
    </Modal.Wrapper>
  )
}

CreateFolderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  searchedUsers: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
  isSearchingUsers: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  currentUserId: PropTypes.string,
}

CreateFolderModal.defaultProps = {
  isSearchingUsers: false,
  isSubmitting: false,
  currentUserId: null,
}

export default CreateFolderModal
