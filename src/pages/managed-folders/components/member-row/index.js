import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { ActionSheet, Button } from '@common'

import { isLastAdminMember } from '../../utils'
import './_style.scss'

const blk = 'managed-member-row'

const MemberRow = ({
  folder, member, currentUserId, isAdmin, onMakeAdmin, onRemoveAdmin, onRemove, onLeave,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const self = String(member.userId) === String(currentUserId)
  const lastAdmin = isLastAdminMember(folder, member)
  const closeMenu = () => setMenuOpen(false)

  const actions = []
  if (isAdmin && !self && member.role === 'member') {
    actions.push({ key: 'make-admin', label: 'Make admin', onClick: () => onMakeAdmin(member) })
  }
  if (isAdmin && !self && member.role === 'admin') {
    actions.push({
      key: 'remove-admin',
      label: 'Remove admin',
      helper: lastAdmin ? 'Folder must keep at least one admin' : '',
      onClick: () => onRemoveAdmin(member),
      disabled: lastAdmin,
    })
  }
  if (isAdmin && !self) {
    actions.push({
      key: 'remove',
      label: 'Remove member',
      helper: lastAdmin ? 'Folder must keep at least one admin' : '',
      onClick: () => onRemove(member),
      danger: true,
      disabled: lastAdmin,
    })
  }
  if (self) {
    actions.push({
      key: 'leave',
      label: 'Leave folder',
      helper: isAdmin && lastAdmin ? 'Assign another admin before leaving' : '',
      onClick: onLeave,
      danger: true,
      disabled: isAdmin && lastAdmin,
    })
  }

  return (
    <div className={classNames({ blk })}>
      <div className={classNames({ blk, elt: 'main' })}>
        <div className={classNames({ blk, elt: 'name' })}>
          {member.username || member.userId}
          {self && <span className={classNames({ blk, elt: 'you' })}>You</span>}
        </div>
        <div className={classNames({ blk, elt: 'meta' })}>
          {member.email}
          <span className={classNames({ blk, elt: 'role', mods: [member.role] })}>{member.role}</span>
          {lastAdmin && <span className={classNames({ blk, elt: 'warning' })}>Last admin</span>}
        </div>
      </div>

      <div className={classNames({ blk, elt: 'actions' })}>
        {isAdmin && !self && member.role === 'member' && (
          <Button category="plain" size="small" onClick={() => onMakeAdmin(member)}>Make admin</Button>
        )}
        {isAdmin && !self && member.role === 'admin' && (
          <Button category="plain" size="small" onClick={() => onRemoveAdmin(member)} disabled={lastAdmin}>Remove admin</Button>
        )}
        {isAdmin && !self && (
          <Button category="danger" size="small" onClick={() => onRemove(member)} disabled={lastAdmin}>Remove</Button>
        )}
        {self && (
          <Button category="danger" size="small" onClick={onLeave} disabled={isAdmin && lastAdmin}>Leave</Button>
        )}
      </div>

      {!!actions.length && (
        <button
          type="button"
          className={classNames({ blk, elt: 'overflow' })}
          aria-label={`Actions for ${member.username || 'member'}`}
          onClick={() => setMenuOpen(true)}
        >
          ⋯
        </button>
      )}

      <ActionSheet
        open={menuOpen}
        title={member.username || 'Member actions'}
        description={self ? 'Your membership' : member.email}
        actions={actions}
        onClose={closeMenu}
      />
    </div>
  )
}

MemberRow.propTypes = {
  folder: PropTypes.shape({ members: PropTypes.arrayOf(PropTypes.shape({})) }).isRequired,
  member: PropTypes.shape({
    userId: PropTypes.string, username: PropTypes.string, email: PropTypes.string, role: PropTypes.string,
  }).isRequired,
  currentUserId: PropTypes.string,
  isAdmin: PropTypes.bool,
  onMakeAdmin: PropTypes.func.isRequired,
  onRemoveAdmin: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
}

MemberRow.defaultProps = { currentUserId: null, isAdmin: false }

export default MemberRow
