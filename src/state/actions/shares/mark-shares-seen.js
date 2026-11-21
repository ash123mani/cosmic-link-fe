import { api } from '@api'
import {
  MARK_SHARES_SEEN_REQUEST,
  MARK_SHARES_SEEN_SUCCESS,
  MARK_SHARES_SEEN_FAILURE,
} from '@state/constants/shares'

const markSharesSeenRequest = (payload) => ({
  type: MARK_SHARES_SEEN_REQUEST,
  payload,
})

const markSharesSeenSuccess = (payload) => ({
  type: MARK_SHARES_SEEN_SUCCESS,
  payload,
})

const markSharesSeenFailure = (payload) => ({
  type: MARK_SHARES_SEEN_FAILURE,
  payload,
})

const markSharesSeen = (body) => async (dispatch) => {
  try {
    dispatch(markSharesSeenRequest(body))
    const response = await api('markSharesSeen', { body })
    const { data, success } = response

    if (success) {
      dispatch(markSharesSeenSuccess(body))
    } else {
      dispatch(markSharesSeenFailure(data.error))
    }

    return response
  } catch (error) {
    return { success: false, data: { error: error.message } }
  }
}

export default markSharesSeen
