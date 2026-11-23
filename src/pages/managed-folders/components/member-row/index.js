import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { Button } from '@common'

import { isLastAdminMember } from '../../utils'
import './_style.scss'

const blk = 'managed-member-row'

const MemberRow = ({
  folder, member, currentUserId, isAdmin, onMakeAdmin, onRemoveAdmin, onRemove, onLeave,
}) => {
  const self = String(member.userId) === String(currentUserId)
  const lastAdmin = isLastAdminMember(folder, member)

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
          <Button
            category="plain"
            size="small"
            onClick={() => onRemoveAdmin(member)}
            disabled={lastAdmin}
            title={lastAdmin ? 'Folder must have at least one admin' : ''}
          >
            Remove admin
          </Button>
        )}
        {isAdmin && !self && (
          <Button
            category="danger"
            size="small"
            onClick={() => onRemove(member)}
            disabled={lastAdmin}
            title={lastAdmin ? 'Folder must have at least one admin' : ''}
          >
            Remove
          </Button>
        )}
        {self && !isAdmin && (
          <Button category="danger" size="small" onClick={onLeave}>Leave</Button>
        )}
        {self && isAdmin && (
          <Button
            category="danger"
            size="small"
            onClick={onLeave}
            disabled={lastAdmin}
            title={lastAdmin ? 'Folder must have at least one admin' : ''}
          >
            Leave
          </Button>
        )}
      </div>
    </div>
  )
}

MemberRow.propTypes = {
  folder: PropTypes.shape({ members: PropTypes.arrayOf(PropTypes.shape({})) }).isRequired,
  member: PropTypes.shape({
    userId: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  currentUserId: PropTypes.string,
  isAdmin: PropTypes.bool,
  onMakeAdmin: PropTypes.func.isRequired,
  onRemoveAdmin: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
}

MemberRow.defaultProps = {
  currentUserId: null,
  isAdmin: false,
}

export default MemberRow
