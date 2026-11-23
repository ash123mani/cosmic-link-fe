import {
  getManagedFolders, createManagedFolder, getManagedFolder, updateManagedFolder, deleteManagedFolder,
  getManagedFolderLinks, createManagedFolderLink, updateManagedFolderLink, deleteManagedFolderLink,
  addManagedFolderMembers, removeManagedFolderMember, updateManagedFolderMemberRole,
} from '@state/actions/managedFolders'
import { searchUsers } from '@state/actions/shares'
import { setAppBanner } from '@state/actions/app'
import {
  selectManagedFolders, selectCurrentManagedFolder, selectManagedFolderLinks,
  selectIsFetchingManagedFolders, selectIsFetchingManagedFolder, selectIsFetchingManagedFolderLinks, selectIsMutatingManagedFolder,
} from '@state/selectors/managedFolders'
import { selectSearchedUsers, selectIsSearchingUsers } from '@state/selectors/shares'
import { selectUser } from '@state/selectors/auth'

export const mapStateToProps = (state) => ({
  folders: selectManagedFolders(state),
  currentFolder: selectCurrentManagedFolder(state),
  links: selectManagedFolderLinks(state),
  isFetchingFolders: selectIsFetchingManagedFolders(state),
  isFetchingFolder: selectIsFetchingManagedFolder(state),
  isFetchingLinks: selectIsFetchingManagedFolderLinks(state),
  isMutating: selectIsMutatingManagedFolder(state),
  searchedUsers: selectSearchedUsers(state),
  isSearchingUsers: selectIsSearchingUsers(state),
  currentUser: selectUser(state),
})

export const actions = {
  getManagedFolders,
  createManagedFolder,
  getManagedFolder,
  updateManagedFolder,
  deleteManagedFolder,
  getManagedFolderLinks,
  createManagedFolderLink,
  updateManagedFolderLink,
  deleteManagedFolderLink,
  addManagedFolderMembers,
  removeManagedFolderMember,
  updateManagedFolderMemberRole,
  searchUsers,
  setAppBanner,
}
