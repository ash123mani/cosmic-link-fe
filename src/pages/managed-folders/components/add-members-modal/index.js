import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { Modal, MultiSelectDropDown } from '@common'
import ConfirmationButtons from '@local/confirmation-buttons'

import './_style.scss'

const blk = 'managed-add-members-modal'

const AddMembersModal = ({
  isOpen, onClose, onSubmit, folder, searchUsers, searchedUsers, isSearchingUsers, isSubmitting,
}) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setSelected([])
      setError('')
    }
  }, [isOpen])

  useEffect(() => {
    const q = query.trim()
    if (!isOpen || q.length < 2) {
      return undefined
    }
    const t = setTimeout(() => searchUsers(q), 300)
    return () => clearTimeout(t)
  }, [isOpen, query, searchUsers])

  const options = useMemo(() => {
    const memberIds = new Set((folder?.members || []).map((m) => String(m.userId)))
    return (searchedUsers || [])
      .filter((u) => !memberIds.has(String(u.id)))
      .map((u) => ({
        key: u.id, value: u.username, subLabel: u.email, ...u,
      }))
  }, [searchedUsers, folder])

  if (!isOpen) {
    return null
  }

  const handleSubmit = async () => {
    setError('')
    if (!selected.length) {
      setError('Select at least one user')
      return
    }
    const res = await onSubmit({ userIds: selected.map((u) => u.key) })
    if (!res || !res.type || !res.type.endsWith('_SUCCESS')) {
      setError((res && res.payload && res.payload.message) || 'Unable to add members')
    }
  }

  return (
    <Modal.Wrapper onEscKeydown={() => !isSubmitting && onClose()}>
      <Modal.Header closeAble={!isSubmitting} onClose={onClose}>Add members</Modal.Header>
      <Modal.Content>
        <div className={classNames({ blk })}>
          <MultiSelectDropDown
            category="light"
            label="Search users"
            placeholder="Username or email"
            options={options}
            selected={selected}
            onChange={setSelected}
            onSearchChange={setQuery}
            searchValue={query}
            loading={isSearchingUsers}
            emptyText={query.trim().length < 2 ? 'Type at least 2 characters to search' : 'No users found'}
          />
          {error && <div className={classNames({ blk, elt: 'error' })}>{error}</div>}
          <ConfirmationButtons
            handleCancel={onClose}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            confirmText="Add members"
            cancelText="Cancel"
            submitButtonType="button"
          />
        </div>
      </Modal.Content>
    </Modal.Wrapper>
  )
}

AddMembersModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  folder: PropTypes.shape({ members: PropTypes.arrayOf(PropTypes.shape({})) }),
  searchUsers: PropTypes.func.isRequired,
  searchedUsers: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
  isSearchingUsers: PropTypes.bool,
  isSubmitting: PropTypes.bool,
}

AddMembersModal.defaultProps = { folder: null, isSearchingUsers: false, isSubmitting: false }

export default AddMembersModal
