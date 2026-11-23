const managedFolders = {
  getManagedFolders: {
    endPoint: '/api/v1/managed-folders',
    method: 'GET',
    auth: true,
  },
  createManagedFolder: {
    endPoint: '/api/v1/managed-folders',
    method: 'POST',
    auth: true,
  },
  getManagedFolder: {
    endPoint: '/api/v1/managed-folders',
    method: 'GET',
    auth: true,
  },
  updateManagedFolder: {
    endPoint: '/api/v1/managed-folders',
    method: 'PATCH',
    auth: true,
  },
  deleteManagedFolder: {
    endPoint: '/api/v1/managed-folders',
    method: 'DELETE',
    auth: true,
  },
  addManagedFolderMembers: {
    endPoint: '/api/v1/managed-folders',
    method: 'POST',
    auth: true,
  },
  removeManagedFolderMember: {
    endPoint: '/api/v1/managed-folders',
    method: 'DELETE',
    auth: true,
  },
  updateManagedFolderMemberRole: {
    endPoint: '/api/v1/managed-folders',
    method: 'PATCH',
    auth: true,
  },
  getManagedFolderLinks: {
    endPoint: '/api/v1/managed-folders',
    method: 'GET',
    auth: true,
  },
  createManagedFolderLink: {
    endPoint: '/api/v1/managed-folders',
    method: 'POST',
    auth: true,
  },
  updateManagedFolderLink: {
    endPoint: '/api/v1/managed-folders',
    method: 'PATCH',
    auth: true,
  },
  deleteManagedFolderLink: {
    endPoint: '/api/v1/managed-folders',
    method: 'DELETE',
    auth: true,
  },
}

export default managedFolders
