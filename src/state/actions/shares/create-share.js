import { api } from '@api'
import {
  CREATE_SHARE_REQUEST,
  CREATE_SHARE_SUCCESS,
  CREATE_SHARE_FAILURE,
} from '@state/constants/shares'
import { setAppBanner } from '@state/actions/app'

const createShareRequest = (payload) => ({
  type: CREATE_SHARE_REQUEST,
  payload,
})

const createShareSuccess = (payload) => ({
  type: CREATE_SHARE_SUCCESS,
  payload,
})

const createShareFailure = (error, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: error,
  }))
  return {
    type: CREATE_SHARE_FAILURE,
    payload: error,
  }
}

const createShare = (body) => async (dispatch) => {
  try {
    dispatch(createShareRequest(body))
    const response = await api('createShare', { body })
    const { data, success } = response

    if (success) {
      dispatch(createShareSuccess(data))
    } else {
      dispatch(createShareFailure(data.error || 'Could not share link', dispatch))
    }

    return response
  } catch (error) {
    return { success: false, data: { error: error.message } }
  }
}

export default createShare
