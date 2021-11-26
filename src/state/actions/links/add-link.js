import { api } from '@api'
import { ADD_LINK_REQUEST, ADD_LINK_SUCCESS, ADD_LINK_FAILURE } from '@state/constants/links'

const addLinkRequest = (payload) => ({
  type: ADD_LINK_REQUEST,
  payload,
})

const addLinkSuccess = (payload) => ({
  type: ADD_LINK_SUCCESS,
  payload,
})

const addLinkFailure = (payload) => ({
  type: ADD_LINK_FAILURE,
  payload,
})

const addLink = (payload) => async (dispatch) => {
  try {
    dispatch(addLinkRequest(payload))

    const response = await api('addLink', { body: payload })
    const { data, success } = response

    if (success) {
      dispatch(addLinkSuccess(data))
    } else {
      dispatch(addLinkFailure(data.error))
    }

    return response
  } catch (error) {
    const errorResp = {
      data: { error: error.message },
    }
    return errorResp
  }
}

export default addLink
