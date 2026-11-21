import { api } from '@api'
import { UPDATE_LINK_REQUEST, UPDATE_LINK_SUCCESS, UPDATE_LINK_FAILURE } from '@state/constants/links'
import { setAppBanner } from '@state/actions/app'

const updateLinkRequest = (payload) => ({
  type: UPDATE_LINK_REQUEST,
  payload,
})

const updateLinkSuccess = (payload) => ({
  type: UPDATE_LINK_SUCCESS,
  payload,
})

const updateLinkFailure = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: payload || 'Could not update link',
  }))

  return {
    type: UPDATE_LINK_FAILURE,
    payload,
  }
}

const updateLink = ({ id, ...body }) => async (dispatch) => {
  try {
    dispatch(updateLinkRequest({ id, ...body }))
    const response = await api('updateLink', { appendPath: `/${id}`, body })
    const { data, success } = response

    if (success) {
      dispatch(updateLinkSuccess(data))
    } else {
      dispatch(updateLinkFailure(data && data.error, dispatch))
    }

    return response
  } catch (error) {
    dispatch(updateLinkFailure(error.message, dispatch))
    return { data: { error: error.message }, success: false }
  }
}

export default updateLink
