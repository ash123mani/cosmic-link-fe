export const selectManagedFolders = (state) => state.managedFolders.folders
export const selectCurrentManagedFolder = (state) => state.managedFolders.currentFolder
export const selectManagedFolderLinks = (state) => state.managedFolders.links
export const selectIsFetchingManagedFolders = (state) => state.managedFolders.isFetchingFolders
export const selectIsFetchingManagedFolder = (state) => state.managedFolders.isFetchingFolder
export const selectIsFetchingManagedFolderLinks = (state) => state.managedFolders.isFetchingLinks
export const selectIsMutatingManagedFolder = (state) => state.managedFolders.isMutating
