import { api } from '@api'
import {
  GET_SHARE_INBOX_REQUEST,
  GET_SHARE_INBOX_SUCCESS,
  GET_SHARE_INBOX_FAILURE,
} from '@state/constants/shares'
import { setAppBanner } from '@state/actions/app'

const getShareInboxRequest = () => ({
  type: GET_SHARE_INBOX_REQUEST,
})

const getShareInboxSuccess = (payload) => ({
  type: GET_SHARE_INBOX_SUCCESS,
  payload,
})

const getShareInboxFailure = (error, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: error,
  }))
  return {
    type: GET_SHARE_INBOX_FAILURE,
    payload: error,
  }
}

const getShareInbox = () => async (dispatch) => {
  try {
    dispatch(getShareInboxRequest())
    const response = await api('getShareInbox')
    const { data, success } = response

    if (success) {
      dispatch(getShareInboxSuccess(data))
    } else {
      dispatch(getShareInboxFailure(data.error || 'Could not load shared links', dispatch))
    }

    return response
  } catch (error) {
    return { success: false, data: { error: error.message } }
  }
}

export default getShareInbox
