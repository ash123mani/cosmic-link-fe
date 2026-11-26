import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { Prompt, useLocation, useParams } from 'react-router-dom'
import {
  arrayOf, func, shape, string,
} from 'prop-types'

import { Button, Spinner } from '@common'
import { classNames } from '@common/helpers'

import DiscardChangesModal from '../components/discard-changes-modal'
import EditLinkContext from '../components/edit-link-context'
import EditLinkForm from '../components/edit-link-form'
import useEditLink from '../hooks/useEditLink'
import useUnsavedNavigation from '../hooks/useUnsavedNavigation'
import { getEditLinkBackPath, getEditLinkMode } from '../utils'
import { mapStateToProps, actions } from './index.connect'
import './_style.scss'

const blk = 'edit-link-page'

const getEyebrow = ({ isManaged, folderName }) => (
  isManaged ? `Managed folder · ${folderName || 'Folder'}` : 'Library'
)

const EditLinkState = ({ title, message, onBack }) => (
  <main className={classNames({ blk })}>
    <div className={classNames({ blk, elt: 'card' })}>
      <h1 className={classNames({ blk, elt: 'title' })}>{title}</h1>
      <p className={classNames({ blk, elt: 'error' })} role="alert">{message}</p>
      <Button category="filled" onClick={onBack}>Go back</Button>
    </div>
  </main>
)

EditLinkState.propTypes = {
  title: string.isRequired,
  message: string.isRequired,
  onBack: func.isRequired,
}

const EditLinkPage = ({
  managedFolder, managedLinks, currentUserId,
  updateLink, updateManagedFolderLink, getManagedFolder, getManagedFolderLinks, setAppBanner,
}) => {
  const { id, folderId, linkId } = useParams()
  const location = useLocation()
  const mode = getEditLinkMode({ folderId, linkId })
  const isManaged = Boolean(folderId && linkId)
  const backTo = getEditLinkBackPath({ mode, folderId, from: location.state?.from })

  const navigateRef = useRef(null)
  const edit = useEditLink({
    mode,
    id,
    folderId,
    linkId,
    managedFolder,
    managedLinks,
    currentUserId,
    updateLink,
    updateManagedFolderLink,
    getManagedFolder,
    getManagedFolderLinks,
    setAppBanner,
    onSuccess: () => navigateRef.current?.(backTo),
  })

  const navigation = useUnsavedNavigation({ isDirty: edit.isDirty, isBlocked: edit.saving })
  navigateRef.current = navigation.navigateTo
  const requestBack = () => navigation.requestNavigation(backTo)

  if (edit.loading) {
    return <main className={classNames({ blk })}><Spinner center text="Loading link..." /></main>
  }

  if (!edit.link) {
    return <EditLinkState title="Edit link" message={edit.error || 'Link not found'} onBack={() => navigation.navigateTo(backTo)} />
  }

  return (
    <main className={classNames({ blk })}>
      <Prompt when={edit.isDirty && !edit.saving} message={navigation.handleBlockedNavigation} />
      <div className={classNames({ blk, elt: 'card' })}>
        <button type="button" className={classNames({ blk, elt: 'back' })} onClick={requestBack}>← Back</button>
        <p className={classNames({ blk, elt: 'eyebrow' })}>{getEyebrow({ isManaged, folderName: managedFolder?.name })}</p>
        <h1 className={classNames({ blk, elt: 'title' })}>Edit link</h1>
        <p className={classNames({ blk, elt: 'subtitle' })}>Update the title and description for this saved link.</p>

        <EditLinkContext link={edit.link} />

        {!edit.canEdit ? (
          <p className={classNames({ blk, elt: 'error' })} role="alert">You don&apos;t have permission to edit this link.</p>
        ) : (
          <>
            <EditLinkForm
              values={edit.form}
              errors={edit.fieldErrors}
              isSubmitting={edit.saving}
              onChange={edit.handleChange}
              onCancel={requestBack}
              onSubmit={edit.handleSubmit}
            />
            {edit.error ? <p className={classNames({ blk, elt: 'error', mods: ['form'] })} role="alert">{edit.error}</p> : null}
          </>
        )}
      </div>

      {navigation.pendingLocation ? (
        <DiscardChangesModal onCancel={navigation.cancelNavigation} onConfirm={navigation.confirmNavigation} />
      ) : null}
    </main>
  )
}

EditLinkPage.propTypes = {
  managedFolder: shape({ name: string, myRole: string, members: arrayOf(shape({})) }),
  managedLinks: arrayOf(shape({ id: string })),
  currentUserId: string,
  updateLink: func.isRequired,
  updateManagedFolderLink: func.isRequired,
  getManagedFolder: func.isRequired,
  getManagedFolderLinks: func.isRequired,
  setAppBanner: func.isRequired,
}

EditLinkPage.defaultProps = {
  managedFolder: null,
  managedLinks: [],
  currentUserId: '',
}

export default connect(mapStateToProps, actions)(EditLinkPage)
