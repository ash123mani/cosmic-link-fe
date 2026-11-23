import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { Button, Modal, Spinner } from '@common'
import ConfirmationButtons from '@local/confirmation-buttons'

import {
  canManageFolder, canMutateManagedLink, getFolderMember, isLastAdminMember,
} from '../utils'
import FolderList from '../components/folder-list'
import FolderHeader from '../components/folder-header'
import ManagedLinkCard from '../components/managed-link-card'
import MemberRow from '../components/member-row'
import CreateFolderModal from '../components/create-folder-modal'
import AddEditLinkModal from '../components/add-edit-link-modal'
import AddMembersModal from '../components/add-members-modal'
import RenameFolderModal from '../components/rename-folder-modal'
import { actions, mapStateToProps } from './index.connect'
import './_style.scss'

const blk = 'managed-folders'

const ManagedFoldersMain = ({
  folders, currentFolder, links, isFetchingFolders, isFetchingFolder, isFetchingLinks, isMutating,
  searchedUsers, isSearchingUsers, currentUser,
  getManagedFolders, createManagedFolder, getManagedFolder, updateManagedFolder, deleteManagedFolder,
  getManagedFolderLinks, createManagedFolderLink, updateManagedFolderLink, deleteManagedFolderLink,
  addManagedFolderMembers, removeManagedFolderMember, updateManagedFolderMemberRole, searchUsers, setAppBanner,
}) => {
  const [selectedId, setSelectedId] = useState(null)
  const [activeTab, setActiveTab] = useState('links')
  const [createOpen, setCreateOpen] = useState(false)
  const [addMembersOpen, setAddMembersOpen] = useState(false)
  const [linkModal, setLinkModal] = useState({ open: false, link: null })
  const [renameOpen, setRenameOpen] = useState(false)
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    getManagedFolders()
  }, [getManagedFolders])
  useEffect(() => {
    if (!selectedId && folders.length) {
      setSelectedId(folders[0].id)
    }
  }, [folders, selectedId])
  useEffect(() => {
    if (selectedId) {
      getManagedFolder(selectedId)
      getManagedFolderLinks(selectedId)
    }
  }, [selectedId, getManagedFolder, getManagedFolderLinks])

  const me = useMemo(() => getFolderMember(currentFolder, currentUser?.id), [currentFolder, currentUser])
  const isAdmin = canManageFolder(currentFolder)
  const myLastAdmin = isLastAdminMember(currentFolder, me)

  const notify = (message, type = 'info') => setAppBanner({
    message, type, autoClose: true, duration: 3000,
  })
  const closeConfirm = () => setConfirm(null)

  const runAction = async (action, successMessage, onSuccess) => {
    const res = await action()
    if (res?.type?.endsWith('_SUCCESS')) {
      if (successMessage) {
        notify(successMessage)
      }
      if (onSuccess) {
        onSuccess(res)
      }
      closeConfirm()
      return res
    }
    notify(res?.payload?.message || 'Something went wrong', 'error')
    return res
  }

  const handleCreate = async (payload) => {
    const res = await createManagedFolder(payload)
    if (res?.type?.endsWith('_SUCCESS')) {
      notify('Managed folder created')
      setCreateOpen(false)
      const id = res.payload?.folder?.id
      if (id) {
        setSelectedId(id)
      }
    }
    return res
  }

  const handleSaveLink = async (payload) => {
    if (!currentFolder) {
      return null
    }
    if (linkModal.link) {
      return runAction(
        () => updateManagedFolderLink(currentFolder.id, linkModal.link.id, payload),
        'Link updated',
        () => setLinkModal({ open: false, link: null }),
      )
    }
    return runAction(
      () => createManagedFolderLink(currentFolder.id, payload),
      'Link added',
      () => setLinkModal({ open: false, link: null }),
    )
  }

  const handleAddMembers = async (payload) => runAction(
    () => addManagedFolderMembers(currentFolder.id, payload),
    'Members added',
    () => setAddMembersOpen(false),
  )

  const openDeleteFolder = () => setConfirm({
    title: 'Delete folder?',
    message: `Delete "${currentFolder.name}" and all its links for everyone? This cannot be undone.`,
    confirmText: 'Delete folder',
    type: 'delete',
    onConfirm: () => runAction(() => deleteManagedFolder(currentFolder.id), 'Folder deleted', () => {
      setSelectedId(null)
      getManagedFolders()
    }),
  })

  const openRename = () => setRenameOpen(true)

  const handleRename = async (payload) => runAction(
    () => updateManagedFolder(currentFolder.id, payload),
    'Folder renamed',
    () => setRenameOpen(false),
  )

  const openDeleteLink = (link) => setConfirm({
    title: 'Delete link?',
    message: 'This removes the link for everyone in the folder.',
    confirmText: 'Delete link',
    type: 'delete',
    onConfirm: () => runAction(() => deleteManagedFolderLink(currentFolder.id, link.id), 'Link deleted'),
  })

  const openRemoveMember = (member) => setConfirm({
    title: 'Remove member?',
    message: `Remove ${member.username || 'this member'} from the folder? They will lose access, but links they added remain.`,
    confirmText: 'Remove member',
    type: 'delete',
    onConfirm: () => runAction(() => removeManagedFolderMember(currentFolder.id, member.userId), 'Member removed'),
  })

  const openLeave = () => setConfirm({
    title: 'Leave folder?',
    message: `Leave "${currentFolder.name}"? You will lose access. Links you added will remain.`,
    confirmText: 'Leave folder',
    type: 'delete',
    onConfirm: () => runAction(() => removeManagedFolderMember(currentFolder.id, currentUser.id), 'You left the folder', () => {
      setSelectedId(null)
      getManagedFolders()
    }),
  })

  const handleRole = (member, role) => runAction(
    () => updateManagedFolderMemberRole(currentFolder.id, member.userId, { role }),
    role === 'admin' ? 'Member promoted to admin' : 'Admin role removed',
  )

  return (
    <div className={classNames({ blk })}>
      <div className={classNames({ blk, elt: 'layout' })}>
        <FolderList folders={folders} selectedId={selectedId} isLoading={isFetchingFolders} onSelect={setSelectedId} onCreate={() => setCreateOpen(true)} />

        <main className={classNames({ blk, elt: 'content' })}>
          {!currentFolder && !isFetchingFolder && (
            <div className={classNames({ blk, elt: 'empty-detail' })}>
              <h2>Select a managed folder</h2>
              <p>Choose a folder to view links and members, or create a new collaborative folder.</p>
              <Button category="filled" onClick={() => setCreateOpen(true)}>Create folder</Button>
            </div>
          )}

          {isFetchingFolder && !currentFolder && <Spinner center text="Loading folder..." />}

          {currentFolder && (
            <>
              <FolderHeader
                folder={currentFolder}
                currentUserId={currentUser?.id}
                isLastAdmin={myLastAdmin}
                onRename={openRename}
                onDelete={openDeleteFolder}
                onLeave={openLeave}
              />

              <div className={classNames({ blk, elt: 'tabs' })}>
                <button
                  type="button"
                  className={classNames({ blk, elt: 'tab', mods: [activeTab === 'links' && 'active'] })}
                  onClick={() => setActiveTab('links')}
                >
                  Links
                </button>
                <button
                  type="button"
                  className={classNames({ blk, elt: 'tab', mods: [activeTab === 'members' && 'active'] })}
                  onClick={() => setActiveTab('members')}
                >
                  Members
                </button>
              </div>

              {activeTab === 'links' && (
                <section className={classNames({ blk, elt: 'panel' })}>
                  <div className={classNames({ blk, elt: 'panel-head' })}>
                    <div>
                      <h3 className={classNames({ blk, elt: 'panel-title' })}>Links</h3>
                      <p className={classNames({ blk, elt: 'panel-subtitle' })}>Links added here are visible to all folder members.</p>
                    </div>
                    <Button category="filled" size="small" onClick={() => setLinkModal({ open: true, link: null })}>Add link</Button>
                  </div>
                  {isFetchingLinks ? <Spinner center text="Loading links..." /> : (
                    <div className={classNames({ blk, elt: 'list' })}>
                      {links.map((link) => (
                        <ManagedLinkCard
                          key={link.id}
                          link={link}
                          canMutate={canMutateManagedLink(currentFolder, link, currentUser?.id)}
                          onEdit={(l) => setLinkModal({ open: true, link: l })}
                          onDelete={openDeleteLink}
                        />
                      ))}
                      {!links.length && <div className={classNames({ blk, elt: 'empty' })}>No links yet. Add the first link for your team.</div>}
                    </div>
                  )}
                </section>
              )}

              {activeTab === 'members' && (
                <section className={classNames({ blk, elt: 'panel' })}>
                  <div className={classNames({ blk, elt: 'panel-head' })}>
                    <div>
                      <h3 className={classNames({ blk, elt: 'panel-title' })}>Members</h3>
                      <p className={classNames({ blk, elt: 'panel-subtitle' })}>Admins can manage members and all links. Members can manage their own links.</p>
                    </div>
                    {isAdmin && <Button category="filled" size="small" onClick={() => setAddMembersOpen(true)}>Add members</Button>}
                  </div>
                  <div className={classNames({ blk, elt: 'members' })}>
                    {(currentFolder.members || []).map((member) => (
                      <MemberRow
                        key={member.userId}
                        folder={currentFolder}
                        member={member}
                        currentUserId={currentUser?.id}
                        isAdmin={isAdmin}
                        onMakeAdmin={(m) => handleRole(m, 'admin')}
                        onRemoveAdmin={(m) => handleRole(m, 'member')}
                        onRemove={openRemoveMember}
                        onLeave={openLeave}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>

      <CreateFolderModal
        isOpen={createOpen}
        onClose={() => !isMutating && setCreateOpen(false)}
        onSubmit={handleCreate}
        searchUsers={searchUsers}
        searchedUsers={searchedUsers}
        isSearchingUsers={isSearchingUsers}
        isSubmitting={isMutating}
        currentUserId={currentUser?.id}
      />

      <AddEditLinkModal
        isOpen={linkModal.open}
        onClose={() => !isMutating && setLinkModal({ open: false, link: null })}
        onSubmit={handleSaveLink}
        isSubmitting={isMutating}
        link={linkModal.link}
      />

      <AddMembersModal
        isOpen={addMembersOpen}
        onClose={() => !isMutating && setAddMembersOpen(false)}
        onSubmit={handleAddMembers}
        folder={currentFolder}
        searchUsers={searchUsers}
        searchedUsers={searchedUsers}
        isSearchingUsers={isSearchingUsers}
        isSubmitting={isMutating}
      />

      <RenameFolderModal
        isOpen={renameOpen}
        onClose={() => !isMutating && setRenameOpen(false)}
        onSubmit={handleRename}
        isSubmitting={isMutating}
        folder={currentFolder}
      />

      {confirm && (
        <Modal.Wrapper onEscKeydown={() => !isMutating && closeConfirm()}>
          <Modal.Header closeAble={!isMutating} onClose={closeConfirm}>{confirm.title}</Modal.Header>
          <Modal.Content>
            <p className={classNames({ blk, elt: 'confirm-message' })}>{confirm.message}</p>
            <ConfirmationButtons
              handleCancel={closeConfirm}
              handleSubmit={confirm.onConfirm}
              isSubmitting={isMutating}
              confirmText={confirm.confirmText}
              cancelText="Cancel"
              type={confirm.type || 'submit'}
              submitButtonType="button"
            />
          </Modal.Content>
        </Modal.Wrapper>
      )}
    </div>
  )
}

ManagedFoldersMain.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
  currentFolder: PropTypes.shape({
    id: PropTypes.string, name: PropTypes.string, description: PropTypes.string, members: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  links: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
  isFetchingFolders: PropTypes.bool,
  isFetchingFolder: PropTypes.bool,
  isFetchingLinks: PropTypes.bool,
  isMutating: PropTypes.bool,
  searchedUsers: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
  isSearchingUsers: PropTypes.bool,
  currentUser: PropTypes.shape({ id: PropTypes.string }),
  getManagedFolders: PropTypes.func.isRequired,
  createManagedFolder: PropTypes.func.isRequired,
  getManagedFolder: PropTypes.func.isRequired,
  updateManagedFolder: PropTypes.func.isRequired,
  deleteManagedFolder: PropTypes.func.isRequired,
  getManagedFolderLinks: PropTypes.func.isRequired,
  createManagedFolderLink: PropTypes.func.isRequired,
  updateManagedFolderLink: PropTypes.func.isRequired,
  deleteManagedFolderLink: PropTypes.func.isRequired,
  addManagedFolderMembers: PropTypes.func.isRequired,
  removeManagedFolderMember: PropTypes.func.isRequired,
  updateManagedFolderMemberRole: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  setAppBanner: PropTypes.func.isRequired,
}
ManagedFoldersMain.defaultProps = {
  currentFolder: null, isFetchingFolders: false, isFetchingFolder: false, isFetchingLinks: false, isMutating: false, isSearchingUsers: false, currentUser: null,
}

export default connect(mapStateToProps, actions)(ManagedFoldersMain)
