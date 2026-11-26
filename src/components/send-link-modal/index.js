import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import {
  bool, func, shape, string,
} from 'prop-types'

import { Modal, Input } from '@common'
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
  const [activeIndex, setActiveIndex] = useState(-1)
  const listRef = useRef(null)

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
        setActiveIndex(-1)
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
  const selectUser = (user) => {
    setSelectedUser(user)
    setQuery(user.username)
    setResults([])
    setDebouncedQuery('')
    setActiveIndex(-1)
  }

  const onQueryKeyDown = (e) => {
    if (!showResults || !results.length) {
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault(); setActiveIndex((i) => (i + 1) % results.length)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault(); setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1))
    }
    if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault()
      selectUser(results[activeIndex])
    }
    if (e.key === 'Escape') {
      e.preventDefault(); setResults([]); setDebouncedQuery('')
    }
  }

  return (
    <Modal.Wrapper onEscKeydown={onClose}>
      <Modal.Header closeAble onClose={onClose}>Send to user</Modal.Header>
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
              onKeyDown={onQueryKeyDown}
              autoFocus
              autoComplete="off"
              className={classNames({ blk, elt: 'input', mods: [showResults && 'search-open'] })}
              aria-activedescendant={activeIndex >= 0 && results[activeIndex] ? `share-user-${results[activeIndex].id}` : undefined}
            />

            {showResults ? (
              <div className={classNames({ blk, elt: 'suggestions' })} role="listbox" ref={listRef}>
                {isSearching ? <div className={classNames({ blk, elt: 'status' })}>Searching...</div> : null}
                {!isSearching && !results.length && !error ? <div className={classNames({ blk, elt: 'status' })}>No users found</div> : null}
                {!isSearching && results.map((user, index) => (
                  <button
                    key={user.id}
                    id={`share-user-${user.id}`}
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    className={classNames({ blk, elt: 'user', mods: [index === activeIndex && 'active'] })}
                    onMouseDown={(e) => {
                      e.preventDefault(); selectUser(user)
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <span className={classNames({ blk, elt: 'user-name' })}>
                      @
                      {user.username}
                    </span>
                    {user.email ? <span className={classNames({ blk, elt: 'user-email' })}>{user.email}</span> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {selectedUser ? (
            <div className={classNames({ blk, elt: 'selected' })}>
              Sending to
              {' '}
              <strong>
                @
                {selectedUser.username}
              </strong>
            </div>
          ) : null}

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

          {error ? <div className={classNames({ blk, elt: 'error' })}>{error}</div> : null}

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
  link: shape({ id: string, title: string, linkUrl: string }),
  onClose: func.isRequired,
  onSent: func,
  searchUsers: func.isRequired,
  createShare: func.isRequired,
  isSearching: bool,
  isSending: bool,
}

SendLinkModal.defaultProps = {
  link: null, onSent() {}, isSearching: false, isSending: false,
}

export default connect(mapStateToProps, actions)(SendLinkModal)
