import { api } from '@api'
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
  ADD_MANAGED_FOLDER_MEMBERS_REQUEST, ADD_MANAGED_FOLDER_MEMBERS_SUCCESS, ADD_MANAGED_FOLDER_MEMBERS_FAILURE,
  REMOVE_MANAGED_FOLDER_MEMBER_REQUEST, REMOVE_MANAGED_FOLDER_MEMBER_SUCCESS, REMOVE_MANAGED_FOLDER_MEMBER_FAILURE,
  UPDATE_MANAGED_FOLDER_MEMBER_ROLE_REQUEST, UPDATE_MANAGED_FOLDER_MEMBER_ROLE_SUCCESS, UPDATE_MANAGED_FOLDER_MEMBER_ROLE_FAILURE,
} from '@state/constants/managedFolders'

const request = (type, payload) => ({ type, payload })
const success = (type, payload) => ({ type, payload })
const failure = (type, payload) => ({ type, payload })

export const getManagedFolders = () => async (dispatch) => {
  dispatch(request(GET_MANAGED_FOLDERS_REQUEST))
  const { success: ok, data } = await api('getManagedFolders')
  if (ok) {
    return dispatch(success(GET_MANAGED_FOLDERS_SUCCESS, data))
  }
  return dispatch(failure(GET_MANAGED_FOLDERS_FAILURE, data))
}

export const getManagedFolder = (id) => async (dispatch) => {
  dispatch(request(GET_MANAGED_FOLDER_REQUEST, { id }))
  const { success: ok, data } = await api('getManagedFolder', { appendPath: `/${id}` })
  if (ok) {
    return dispatch(success(GET_MANAGED_FOLDER_SUCCESS, data))
  }
  return dispatch(failure(GET_MANAGED_FOLDER_FAILURE, data))
}

export const createManagedFolder = (body) => async (dispatch) => {
  dispatch(request(CREATE_MANAGED_FOLDER_REQUEST, body))
  const { success: ok, data } = await api('createManagedFolder', { body })
  if (ok) {
    return dispatch(success(CREATE_MANAGED_FOLDER_SUCCESS, data))
  }
  return dispatch(failure(CREATE_MANAGED_FOLDER_FAILURE, data))
}

export const updateManagedFolder = (id, body) => async (dispatch) => {
  dispatch(request(UPDATE_MANAGED_FOLDER_REQUEST, { id, body }))
  const { success: ok, data } = await api('updateManagedFolder', { appendPath: `/${id}`, body })
  if (ok) {
    return dispatch(success(UPDATE_MANAGED_FOLDER_SUCCESS, data))
  }
  return dispatch(failure(UPDATE_MANAGED_FOLDER_FAILURE, data))
}

export const deleteManagedFolder = (id) => async (dispatch) => {
  dispatch(request(DELETE_MANAGED_FOLDER_REQUEST, { id }))
  const { success: ok, data } = await api('deleteManagedFolder', { appendPath: `/${id}` })
  if (ok) {
    return dispatch(success(DELETE_MANAGED_FOLDER_SUCCESS, { ...(data || {}), id }))
  }
  return dispatch(failure(DELETE_MANAGED_FOLDER_FAILURE, data))
}

export const getManagedFolderLinks = (id) => async (dispatch) => {
  dispatch(request(GET_MANAGED_FOLDER_LINKS_REQUEST, { id }))
  const { success: ok, data } = await api('getManagedFolderLinks', { appendPath: `/${id}/links` })
  if (ok) {
    return dispatch(success(GET_MANAGED_FOLDER_LINKS_SUCCESS, data))
  }
  return dispatch(failure(GET_MANAGED_FOLDER_LINKS_FAILURE, data))
}

export const createManagedFolderLink = (id, body) => async (dispatch) => {
  dispatch(request(CREATE_MANAGED_FOLDER_LINK_REQUEST, { id, body }))
  const { success: ok, data } = await api('createManagedFolderLink', { appendPath: `/${id}/links`, body })
  if (ok) {
    return dispatch(success(CREATE_MANAGED_FOLDER_LINK_SUCCESS, data))
  }
  return dispatch(failure(CREATE_MANAGED_FOLDER_LINK_FAILURE, data))
}

export const updateManagedFolderLink = (folderId, linkId, body) => async (dispatch) => {
  dispatch(request(UPDATE_MANAGED_FOLDER_LINK_REQUEST, { folderId, linkId, body }))
  const { success: ok, data } = await api('updateManagedFolderLink', { appendPath: `/${folderId}/links/${linkId}`, body })
  if (ok) {
    return dispatch(success(UPDATE_MANAGED_FOLDER_LINK_SUCCESS, data))
  }
  return dispatch(failure(UPDATE_MANAGED_FOLDER_LINK_FAILURE, data))
}

export const deleteManagedFolderLink = (folderId, linkId) => async (dispatch) => {
  dispatch(request(DELETE_MANAGED_FOLDER_LINK_REQUEST, { folderId, linkId }))
  const { success: ok, data } = await api('deleteManagedFolderLink', { appendPath: `/${folderId}/links/${linkId}` })
  if (ok) {
    return dispatch(success(DELETE_MANAGED_FOLDER_LINK_SUCCESS, { ...(data || {}), id: linkId }))
  }
  return dispatch(failure(DELETE_MANAGED_FOLDER_LINK_FAILURE, data))
}

export const addManagedFolderMembers = (id, body) => async (dispatch) => {
  dispatch(request(ADD_MANAGED_FOLDER_MEMBERS_REQUEST, { id, body }))
  const { success: ok, data } = await api('addManagedFolderMembers', { appendPath: `/${id}/members`, body })
  if (ok) {
    return dispatch(success(ADD_MANAGED_FOLDER_MEMBERS_SUCCESS, data))
  }
  return dispatch(failure(ADD_MANAGED_FOLDER_MEMBERS_FAILURE, data))
}

export const removeManagedFolderMember = (folderId, userId) => async (dispatch) => {
  dispatch(request(REMOVE_MANAGED_FOLDER_MEMBER_REQUEST, { folderId, userId }))
  const { success: ok, data } = await api('removeManagedFolderMember', { appendPath: `/${folderId}/members/${userId}` })
  if (ok) {
    return dispatch(success(REMOVE_MANAGED_FOLDER_MEMBER_SUCCESS, data))
  }
  return dispatch(failure(REMOVE_MANAGED_FOLDER_MEMBER_FAILURE, data))
}

export const updateManagedFolderMemberRole = (folderId, userId, body) => async (dispatch) => {
  dispatch(request(UPDATE_MANAGED_FOLDER_MEMBER_ROLE_REQUEST, { folderId, userId, body }))
  const { success: ok, data } = await api('updateManagedFolderMemberRole', { appendPath: `/${folderId}/members/${userId}`, body })
  if (ok) {
    return dispatch(success(UPDATE_MANAGED_FOLDER_MEMBER_ROLE_SUCCESS, data))
  }
  return dispatch(failure(UPDATE_MANAGED_FOLDER_MEMBER_ROLE_FAILURE, data))
}
