import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useMediaQuery } from 'react-responsive'

import { classNames } from '@common/helpers'
import { Button, Modal, Spinner } from '@common'
import ConfirmationButtons from '@local/confirmation-buttons'
import mediaQueries from '@common/media-queries'
import { useAsyncAction, useConfirmDialog, useDisclosure } from '@hooks'

import {
  canManageFolder, canMutateManagedLink, getFolderMember, isLastAdminMember,
} from '../utils'
import FolderList from '../components/folder-list'
import FolderWorkspace from '../components/folder-workspace'
import FolderLinksPanel from '../components/folder-links-panel'
import FolderMembersPanel from '../components/folder-members-panel'
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
  const { id: routeId, section } = useParams()
  const history = useHistory()
  const isMediumDown = useMediaQuery(mediaQueries.mediumDown)
  const activeScope = section === 'members' ? 'members' : 'links'
  const createModal = useDisclosure(false)
  const addMembersModal = useDisclosure(false)
  const renameModal = useDisclosure(false)
  const [linkModal, setLinkModal] = useState({ open: false, link: null })
  const confirmDialog = useConfirmDialog()
  const asyncAction = useAsyncAction()

  const selectedId = routeId || null

  useEffect(() => {
    getManagedFolders()
  }, [getManagedFolders])

  useEffect(() => {
    if (!isMediumDown && !selectedId && folders.length) {
      history.replace(`/managed/${folders[0].id}`)
    }
  }, [isMediumDown, selectedId, folders, history])

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

  const run = (action, successMessage, onSuccess) => asyncAction.execute(action, {
    onSuccess: async (res) => {
      if (successMessage) {
        notify(successMessage)
      }
      if (onSuccess) {
        await onSuccess(res)
      }
    },
    onError: (_res, message) => notify(message, 'error'),
  })

  const selectFolder = (id) => history.push(`/managed/${id}`)
  const goToList = () => history.push('/managed')

  const handleCreate = async (payload) => {
    const { ok, res } = await run(() => createManagedFolder(payload), 'Managed folder created', async (res) => {
      createModal.close()
      const id = res?.data?.folder?.id || res?.payload?.folder?.id
      if (id) {
        selectFolder(id)
      }
    })
    return ok ? res : res
  }

  const handleSaveLink = async (payload) => {
    if (!currentFolder) {
      return null
    }
    const action = linkModal.link
      ? () => updateManagedFolderLink(currentFolder.id, linkModal.link.id, payload)
      : () => createManagedFolderLink(currentFolder.id, payload)
    const { res } = await run(action, linkModal.link ? 'Link updated' : 'Link added', async () => {
      setLinkModal({ open: false, link: null })
    })
    return res
  }

  const handleAddMembers = async (payload) => {
    const { res } = await run(() => addManagedFolderMembers(currentFolder.id, payload), 'Members added', async () => addMembersModal.close())
    return res
  }

  const openDeleteFolder = () => confirmDialog.open({
    title: 'Delete folder?',
    message: `Delete "${currentFolder.name}" and all its links for everyone? This cannot be undone.`,
    confirmText: 'Delete folder',
    type: 'delete',
    onConfirm: async () => {
      await run(() => deleteManagedFolder(currentFolder.id), 'Folder deleted', async () => {
        goToList(); getManagedFolders()
      })
    },
  })

  const handleRename = async (payload) => {
    const { res } = await run(() => updateManagedFolder(currentFolder.id, payload), 'Folder renamed', async () => renameModal.close())
    return res
  }

  const openDeleteLink = (link) => confirmDialog.open({
    title: 'Delete link?',
    message: 'This removes the link for everyone in the folder.',
    confirmText: 'Delete link',
    type: 'delete',
    onConfirm: async () => {
      await run(() => deleteManagedFolderLink(currentFolder.id, link.id), 'Link deleted')
    },
  })

  const openRemoveMember = (member) => confirmDialog.open({
    title: 'Remove member?',
    message: `Remove ${member.username || 'this member'} from the folder? They will lose access, but links they added remain.`,
    confirmText: 'Remove member',
    type: 'delete',
    onConfirm: async () => {
      await run(() => removeManagedFolderMember(currentFolder.id, member.userId), 'Member removed')
    },
  })

  const openLeave = () => confirmDialog.open({
    title: 'Leave folder?',
    message: `Leave "${currentFolder.name}"? You will lose access. Links you added will remain.`,
    confirmText: 'Leave folder',
    type: 'delete',
    onConfirm: async () => {
      await run(() => removeManagedFolderMember(currentFolder.id, currentUser.id), 'You left the folder', async () => {
        goToList(); getManagedFolders()
      })
    },
  })

  const handleRole = (member, role) => run(
    () => updateManagedFolderMemberRole(currentFolder.id, member.userId, { role }),
    role === 'admin' ? 'Member promoted to admin' : 'Admin role removed',
  )

  const busy = isMutating || asyncAction.isLoading

  const detailContent = currentFolder ? (
    <FolderWorkspace
      folder={currentFolder}
      currentUserId={currentUser?.id}
      isMediumDown={isMediumDown}
      isLastAdmin={myLastAdmin}
      activeScope={activeScope}
      onRename={renameModal.open}
      onDelete={openDeleteFolder}
      onLeave={openLeave}
    >
      {activeScope === 'links' && (
        <FolderLinksPanel
          links={links}
          isLoading={isFetchingLinks}
          canMutateLink={(link) => canMutateManagedLink(currentFolder, link, currentUser?.id)}
          onAdd={() => setLinkModal({ open: true, link: null })}
          onEdit={(link) => setLinkModal({ open: true, link })}
          onDelete={openDeleteLink}
          onCopy={() => setAppBanner({
            message: 'Link copied to clipboard', type: 'info', autoClose: true, duration: 2500,
          })}
        />
      )}
      {activeScope === 'members' && (
        <FolderMembersPanel
          folder={currentFolder}
          currentUserId={currentUser?.id}
          isAdmin={isAdmin}
          onAddMembers={addMembersModal.open}
          onMakeAdmin={(member) => handleRole(member, 'admin')}
          onRemoveAdmin={(member) => handleRole(member, 'member')}
          onRemove={openRemoveMember}
          onLeave={openLeave}
        />
      )}
    </FolderWorkspace>
  ) : null

  const detail = (
    <main className={classNames({ blk, elt: 'content' })}>
      {!currentFolder && !isFetchingFolder && !isMediumDown && (
        <div className={classNames({ blk, elt: 'empty-detail' })}>
          <h2>Select a managed folder</h2>
          <p>Choose a folder to view links and members, or create a new collaborative folder.</p>
          <Button category="filled" onClick={createModal.open}>Create folder</Button>
        </div>
      )}
      {isFetchingFolder && !currentFolder && <Spinner center text="Loading folder..." />}
      {detailContent}
    </main>
  )

  const list = (
    <FolderList
      folders={folders}
      selectedId={selectedId}
      isLoading={isFetchingFolders}
      onSelect={selectFolder}
      onCreate={createModal.open}
    />
  )

  let body = (
    <div className={classNames({ blk, elt: 'layout' })}>
      {list}
      {detail}
    </div>
  )
  if (isMediumDown) {
    body = selectedId ? detail : list
  }

  return (
    <div className={classNames({ blk })}>
      {body}

      <CreateFolderModal
        isOpen={createModal.isOpen}
        onClose={() => !busy && createModal.close()}
        onSubmit={handleCreate}
        searchUsers={searchUsers}
        searchedUsers={searchedUsers}
        isSearchingUsers={isSearchingUsers}
        isSubmitting={busy}
        currentUserId={currentUser?.id}
      />
      <AddEditLinkModal
        isOpen={linkModal.open}
        onClose={() => !busy && setLinkModal({ open: false, link: null })}
        onSubmit={handleSaveLink}
        isSubmitting={busy}
        link={linkModal.link}
      />
      <AddMembersModal
        isOpen={addMembersModal.isOpen}
        onClose={() => !busy && addMembersModal.close()}
        onSubmit={handleAddMembers}
        folder={currentFolder}
        searchUsers={searchUsers}
        searchedUsers={searchedUsers}
        isSearchingUsers={isSearchingUsers}
        isSubmitting={busy}
      />
      <RenameFolderModal
        isOpen={renameModal.isOpen}
        onClose={() => !busy && renameModal.close()}
        onSubmit={handleRename}
        isSubmitting={busy}
        folder={currentFolder}
      />

      {confirmDialog.confirm && (
        <Modal.Wrapper onEscKeydown={() => !confirmDialog.isConfirming && confirmDialog.close()}>
          <Modal.Header closeAble={!confirmDialog.isConfirming} onClose={confirmDialog.close}>{confirmDialog.confirm.title}</Modal.Header>
          <Modal.Content>
            <p className={classNames({ blk, elt: 'confirm-message' })}>{confirmDialog.confirm.message}</p>
            <ConfirmationButtons
              handleCancel={confirmDialog.close}
              handleSubmit={confirmDialog.run}
              isSubmitting={confirmDialog.isConfirming}
              confirmText={confirmDialog.confirm.confirmText}
              cancelText="Cancel"
              type={confirmDialog.confirm.type || 'submit'}
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
