import { updateLink } from '@state/actions/links'
import {
  updateManagedFolderLink, getManagedFolder, getManagedFolderLinks,
} from '@state/actions/managedFolders'
import { setAppBanner } from '@state/actions/app'
import { selectUser } from '@state/selectors/auth'
import { selectCurrentManagedFolder, selectManagedFolderLinks } from '@state/selectors/managedFolders'

const mapStateToProps = (state) => ({
  managedFolder: selectCurrentManagedFolder(state),
  managedLinks: selectManagedFolderLinks(state),
  currentUserId: selectUser(state)?.id || '',
})

const actions = {
  updateLink,
  updateManagedFolderLink,
  getManagedFolder,
  getManagedFolderLinks,
  setAppBanner,
}

export { mapStateToProps, actions }
