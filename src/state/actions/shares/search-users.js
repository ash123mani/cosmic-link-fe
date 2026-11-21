import { api } from '@api'
import {
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE,
} from '@state/constants/shares'

const searchUsersRequest = (payload) => ({
  type: SEARCH_USERS_REQUEST,
  payload,
})

const searchUsersSuccess = (payload) => ({
  type: SEARCH_USERS_SUCCESS,
  payload,
})

const searchUsersFailure = (payload) => ({
  type: SEARCH_USERS_FAILURE,
  payload,
})

const searchUsers = (q) => async (dispatch) => {
  try {
    dispatch(searchUsersRequest({ q }))
    const response = await api('searchUsers', { params: { q } })
    const { data, success } = response

    if (success) {
      dispatch(searchUsersSuccess(data))
    } else {
      dispatch(searchUsersFailure(data && data.error))
    }

    return response
  } catch (error) {
    dispatch(searchUsersFailure(error.message))
    return { success: false, data: { error: error.message } }
  }
}

export default searchUsers
