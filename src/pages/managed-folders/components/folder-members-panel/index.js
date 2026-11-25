import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '@common'
import { classNames } from '@common/helpers'

import MemberRow from '../member-row'

const blk = 'managed-folders'

const FolderMembersPanel = ({
  folder, currentUserId, isAdmin, onAddMembers, onMakeAdmin, onRemoveAdmin, onRemove, onLeave,
}) => (
  <section className={classNames({ blk, elt: 'panel' })}>
    <div className={classNames({ blk, elt: 'panel-head' })}>
      <div>
        <h3 className={classNames({ blk, elt: 'panel-title' })}>Members</h3>
        <p className={classNames({ blk, elt: 'panel-subtitle' })}>Admins can manage members and all links. Members can manage their own links.</p>
      </div>
      {isAdmin && <Button category="filled" size="small" className={classNames({ blk, elt: 'panel-action' })} onClick={onAddMembers}>Add members</Button>}
    </div>
    <div className={classNames({ blk, elt: 'members' })}>
      {(folder.members || []).map((member) => (
        <MemberRow
          key={member.userId}
          folder={folder}
          member={member}
          currentUserId={currentUserId}
          isAdmin={isAdmin}
          onMakeAdmin={() => onMakeAdmin(member)}
          onRemoveAdmin={() => onRemoveAdmin(member)}
          onRemove={() => onRemove(member)}
          onLeave={onLeave}
        />
      ))}
    </div>
  </section>
)

FolderMembersPanel.propTypes = {
  folder: PropTypes.shape({ members: PropTypes.arrayOf(PropTypes.shape({ userId: PropTypes.string })) }).isRequired,
  currentUserId: PropTypes.string,
  isAdmin: PropTypes.bool,
  onAddMembers: PropTypes.func.isRequired,
  onMakeAdmin: PropTypes.func.isRequired,
  onRemoveAdmin: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
}

FolderMembersPanel.defaultProps = {
  currentUserId: '',
  isAdmin: false,
}

export default FolderMembersPanel
