import {
  GET_MANAGED_FOLDERS_REQUEST, GET_MANAGED_FOLDERS_SUCCESS, GET_MANAGED_FOLDERS_FAILURE,
  GET_MANAGED_FOLDER_REQUEST, GET_MANAGED_FOLDER_SUCCESS, GET_MANAGED_FOLDER_FAILURE,
  CREATE_MANAGED_FOLDER_REQUEST, CREATE_MANAGED_FOLDER_SUCCESS, CREATE_MANAGED_FOLDER_FAILURE,
  UPDATE_MANAGED_FOLDER_REQUEST, UPDATE_MANAGED_FOLDER_SUCCESS, UPDATE_MANAGED_FOLDER_FAILURE,
  DELETE_MANAGED_FOLDER_REQUEST, DELETE_MANAGED_FOLDER_SUCCESS, DELETE_MANAGED_FOLDER_FAILURE,
  GET_MANAGED_FOLDER_LINKS_REQUEST, GET_MANAGED_FOLDER_LINKS_SUCCESS, GET_MANAGED_FOLDER_LINKS_FAILURE,
  CREATE_MANAGED_FOLDER_LINK_REQUEST, CREATE_MANAGED_FOLDER_LINK_SUCCESS, CREATE_MANAGED_FOLDER_LINK_FAILURE,
  UPDATE_MANAGED_FOLDER_LINK_REQUEST, UPDATE_MANAGED_FOLDER_LINK_SUCCESS, UPDATE_MANAGED_FOLDER_LINK_FAILURE,
  DELETE_MANAGED_FOLDER_LINK_REQUEST, DELETE_MANAGED_FOLDER_LINK_SUCCESS, DELETE_MANAGED_FOLDER_LINK_FAILURE,
  ADD_MANAGED_FOLDER_MEMBERS_SUCCESS, REMOVE_MANAGED_FOLDER_MEMBER_SUCCESS, UPDATE_MANAGED_FOLDER_MEMBER_ROLE_SUCCESS,
} from '@state/constants/managedFolders'

const initialState = {
  folders: [],
  currentFolder: null,
  links: [],
  isFetchingFolders: false,
  isFetchingFolder: false,
  isFetchingLinks: false,
  isMutating: false,
}

const upsertFolder = (folders, folder) => {
  const idx = folders.findIndex((f) => f.id === folder.id)
  if (idx === -1) {
    return [folder, ...folders]
  }
  const next = folders.slice()
  next[idx] = { ...next[idx], ...folder }
  return next
}

const managedFoldersReducer = (state = initialState, action) => {
  const { type, payload = {} } = action
  switch (type) {
  case GET_MANAGED_FOLDERS_REQUEST:
    return { ...state, isFetchingFolders: true }
  case GET_MANAGED_FOLDERS_SUCCESS:
    return { ...state, isFetchingFolders: false, folders: payload.folders || [] }
  case GET_MANAGED_FOLDERS_FAILURE:
    return { ...state, isFetchingFolders: false }

  case GET_MANAGED_FOLDER_REQUEST:
    return { ...state, isFetchingFolder: true }
  case GET_MANAGED_FOLDER_SUCCESS:
    return {
      ...state,
      isFetchingFolder: false,
      currentFolder: payload.folder || null,
      folders: payload.folder ? upsertFolder(state.folders, payload.folder) : state.folders,
    }
  case GET_MANAGED_FOLDER_FAILURE:
    return { ...state, isFetchingFolder: false }

  case CREATE_MANAGED_FOLDER_REQUEST:
  case UPDATE_MANAGED_FOLDER_REQUEST:
  case DELETE_MANAGED_FOLDER_REQUEST:
  case CREATE_MANAGED_FOLDER_LINK_REQUEST:
  case UPDATE_MANAGED_FOLDER_LINK_REQUEST:
  case DELETE_MANAGED_FOLDER_LINK_REQUEST:
    return { ...state, isMutating: true }
  case CREATE_MANAGED_FOLDER_FAILURE:
  case UPDATE_MANAGED_FOLDER_FAILURE:
  case DELETE_MANAGED_FOLDER_FAILURE:
  case CREATE_MANAGED_FOLDER_LINK_FAILURE:
  case UPDATE_MANAGED_FOLDER_LINK_FAILURE:
  case DELETE_MANAGED_FOLDER_LINK_FAILURE:
    return { ...state, isMutating: false }

  case CREATE_MANAGED_FOLDER_SUCCESS: {
    const folder = payload.folder
    return {
      ...state,
      isMutating: false,
      folders: folder ? upsertFolder(state.folders, folder) : state.folders,
      currentFolder: folder || state.currentFolder,
    }
  }
  case UPDATE_MANAGED_FOLDER_SUCCESS:
  case ADD_MANAGED_FOLDER_MEMBERS_SUCCESS:
  case REMOVE_MANAGED_FOLDER_MEMBER_SUCCESS:
  case UPDATE_MANAGED_FOLDER_MEMBER_ROLE_SUCCESS: {
    const folder = payload.folder
    return {
      ...state,
      isMutating: false,
      currentFolder: folder || state.currentFolder,
      folders: folder ? upsertFolder(state.folders, folder) : state.folders,
    }
  }
  case DELETE_MANAGED_FOLDER_SUCCESS: {
    const id = payload.id
    return {
      ...state,
      isMutating: false,
      folders: state.folders.filter((f) => f.id !== id),
      currentFolder: state.currentFolder && state.currentFolder.id === id ? null : state.currentFolder,
      links: state.currentFolder && state.currentFolder.id === id ? [] : state.links,
    }
  }

  case GET_MANAGED_FOLDER_LINKS_REQUEST:
    return { ...state, isFetchingLinks: true }
  case GET_MANAGED_FOLDER_LINKS_SUCCESS:
    return { ...state, isFetchingLinks: false, links: payload.links || [] }
  case GET_MANAGED_FOLDER_LINKS_FAILURE:
    return { ...state, isFetchingLinks: false }

  case CREATE_MANAGED_FOLDER_LINK_SUCCESS: {
    const link = payload.link
    return { ...state, isMutating: false, links: link ? [link, ...state.links] : state.links }
  }
  case UPDATE_MANAGED_FOLDER_LINK_SUCCESS: {
    const link = payload.link
    return {
      ...state,
      isMutating: false,
      links: link ? state.links.map((l) => (l.id === link.id ? link : l)) : state.links,
    }
  }
  case DELETE_MANAGED_FOLDER_LINK_SUCCESS: {
    const id = payload.id
    return { ...state, isMutating: false, links: state.links.filter((l) => l.id !== id) }
  }

  default:
    return state
  }
}

export default managedFoldersReducer
