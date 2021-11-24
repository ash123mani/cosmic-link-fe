import { api } from '@api'
import { GET_LINK_META_REQUEST, GET_LINK_META_SUCCESS, GET_LINK_META_FAILURE } from '@state/constants/links'
import { setAppBanner } from '@state/actions/app'

const getLinkMetaRequest = (payload) => ({
  type: GET_LINK_META_REQUEST,
  payload,
})

const getLinkMetaSuccess = (payload) => ({
  type: GET_LINK_META_SUCCESS,
  payload,
})

const getLinkMetaFailure = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: payload,
  }))

  return {
    type: GET_LINK_META_FAILURE,
    payload,
  }
}

const getLinkMeta = (url) => async (dispatch) => {
  dispatch(getLinkMetaRequest(url))

  try {
    const body = { url }
    const response = await api('getLinkMeta', { body })
    const { success, data } = response

    if (success) {
      dispatch(getLinkMetaSuccess(data))
    } else {
      dispatch(getLinkMetaFailure(data.error, dispatch))
    }

    return response
  } catch (error) {
    const errorResp = {
      data: { error: error.message },
    }
    return errorResp
  }
}

export default getLinkMeta
