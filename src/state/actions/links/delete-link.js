import { api } from '@api'
import { DELETE_LINK_REQUEST, DELETE_LINK_FAILURE, DELETE_LINK_SUCCESS } from '@state/constants/links'
import { setAppBanner } from '@state/actions/app'

const deleteLinkRequest = (payload) => ({
  type: DELETE_LINK_REQUEST,
  payload,
})

const deleteLinkSuccess = (payload) => ({
  type: DELETE_LINK_SUCCESS,
  payload,
})

const deleteLinkFailure = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: payload,
  }))

  return {
    type: DELETE_LINK_FAILURE,
    payload,
  }
}

const deleteLink = (linkId) => async (dispatch) => {
  dispatch(deleteLinkRequest({ linkId }))

  try {
    const appendPath = `/${linkId}`
    const response = await api('deleteLink', { appendPath })
    const { success, data } = response

    if (success) {
      dispatch(deleteLinkSuccess(data))
    } else {
      dispatch(deleteLinkFailure(data.error, dispatch))
    }

    return response
  } catch (error) {
    const errorResp = {
      data: { error: error.message },
    }
    return errorResp
  }
}

export default deleteLink
