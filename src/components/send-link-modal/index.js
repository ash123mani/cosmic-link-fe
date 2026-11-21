import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  bool, func, shape, string,
} from 'prop-types'

import {
  Modal, Input, DropDown,
} from '@common'
import { classNames } from '@common/helpers'
import ConfirmationButtons from '@local/confirmation-buttons'

import { mapStateToProps, actions } from './index.connect'
import './_style.scss'

const blk = 'send-link-modal'

const SendLinkModal = ({
  link, onClose, onSent, searchUsers, createShare, isSearching, isSending,
}) => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(query.trim()), 300)
    return () => clearTimeout(handle)
  }, [query])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (debouncedQuery.length < 2) {
        setResults([])
        return
      }
      setError('')
      const response = await searchUsers(debouncedQuery)
      if (cancelled) {
        return
      }
      if (response.success) {
        setResults((response.data && response.data.users) || [])
      } else {
        setResults([])
        setError((response.data && response.data.error) || 'Could not search users')
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [debouncedQuery, searchUsers])

  const handleSend = async () => {
    if (!link || !selectedUser || isSending) {
      return
    }
    setError('')
    const response = await createShare({
      linkId: link.id,
      recipientIds: [selectedUser.id],
      message: message.trim() || undefined,
    })

    if (response.success) {
      if (onSent) {
        onSent(selectedUser)
      }
      onClose()
      return
    }

    setError((response.data && response.data.error) || 'Could not send this link')
  }

  const showResults = !selectedUser && debouncedQuery.length >= 2

  return (
    <Modal.Wrapper onEscKeydown={onClose}>
      <Modal.Header closeAble={false}>
        Send to user
      </Modal.Header>
      <Modal.Content className={classNames({ blk, elt: 'content' })}>
        <div className={classNames({ blk })}>
          <div className={classNames({ blk, elt: 'link-title' })}>
            {link ? (link.title || link.linkUrl) : ''}
          </div>

          <div className={classNames({ blk, elt: 'search-wrap' })}>
            <Input
              category="light"
              label="Search user"
              name="username-search"
              placeholder="Username or email (min 2 chars)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedUser(null)
                if (!e.target.value.trim()) {
                  setResults([])
                  setDebouncedQuery('')
                }
              }}
              autoFocus
              autoComplete="off"
              className={classNames({ blk, elt: 'input', mods: [showResults && 'search-open'] })}
            />

            <DropDown
              category="light"
              className={classNames({ blk, elt: 'suggestions', mods: [!showResults && 'hidden'] })}
              isOpen={showResults}
              onOpenChange={() => {}}
              list={results.map((user) => ({ ...user, key: user.id, value: user.username }))}
              loading={isSearching}
              emptyText={!error ? 'No users found' : ''}
              selectedLabel={selectedUser ? `@${selectedUser.username}` : ''}
              handleChange={(item) => {
                setSelectedUser(item)
                setQuery(item.username)
                setResults([])
                setDebouncedQuery('')
              }}
              renderItem={(item) => (
                <div className={classNames({ blk, elt: 'user' })}>
                  <span className={classNames({ blk, elt: 'user-name' })}>
                    @
                    {item.username}
                  </span>
                  {item.email && (
                    <span className={classNames({ blk, elt: 'user-email' })}>
                      {item.email}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <Input
            category="light"
            label="Note (optional)"
            name="share-note"
            placeholder="Add a short note"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            as="textarea"
            rows="2"
            className={classNames({ blk, elt: 'input' })}
          />

          {error && <div className={classNames({ blk, elt: 'error' })}>{error}</div>}

          <ConfirmationButtons
            handleCancel={onClose}
            handleSubmit={handleSend}
            isSubmitting={isSending}
            confirmText={selectedUser ? `Send to @${selectedUser.username}` : 'Send'}
            cancelText="Cancel"
            type="submit"
            submitButtonType="button"
          />
        </div>
      </Modal.Content>
    </Modal.Wrapper>
  )
}

SendLinkModal.propTypes = {
  link: shape({
    id: string,
    title: string,
    linkUrl: string,
  }),
  onClose: func.isRequired,
  onSent: func,
  searchUsers: func.isRequired,
  createShare: func.isRequired,
  isSearching: bool,
  isSending: bool,
}

SendLinkModal.defaultProps = {
  link: null,
  onSent() {},
  isSearching: false,
  isSending: false,
}

export default connect(mapStateToProps, actions)(SendLinkModal)
