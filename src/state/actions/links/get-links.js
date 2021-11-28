import { api } from '@api'
import { GET_LINKS_REQUEST, GET_LINKS_SUCCESS, GET_LINKS_FAILURE } from '@state/constants/links'
import { setAppBanner } from '@state/actions/app'

const getLinksRequest = (payload) => ({
  type: GET_LINKS_REQUEST,
  payload,
})

const getLinksSuccess = (payload) => ({
  type: GET_LINKS_SUCCESS,
  payload,
})

const getLinksFailure = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: payload,
  }))

  return {
    type: GET_LINKS_FAILURE,
    payload,
  }
}

const getLinks = (category) => async (dispatch) => {
  try {
    dispatch(getLinksRequest(category))
    const appendPath = `/${category}`
    const response = await api('getLinks', { appendPath })
    const { data, success } = response

    if (success) {
      dispatch(getLinksSuccess(data))
    } else {
      dispatch(getLinksFailure(data.error))
    }

    return response
  } catch (error) {
    const errorResp = {
      data: { error: error.message },
    }
    return errorResp
  }
}

export default getLinks
