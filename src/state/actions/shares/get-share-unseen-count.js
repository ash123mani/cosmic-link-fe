import { api } from '@api'
import {
  GET_SHARE_UNSEEN_COUNT_REQUEST,
  GET_SHARE_UNSEEN_COUNT_SUCCESS,
  GET_SHARE_UNSEEN_COUNT_FAILURE,
} from '@state/constants/shares'

const getShareUnseenCountRequest = () => ({
  type: GET_SHARE_UNSEEN_COUNT_REQUEST,
})

const getShareUnseenCountSuccess = (payload) => ({
  type: GET_SHARE_UNSEEN_COUNT_SUCCESS,
  payload,
})

const getShareUnseenCountFailure = (payload) => ({
  type: GET_SHARE_UNSEEN_COUNT_FAILURE,
  payload,
})

const getShareUnseenCount = () => async (dispatch) => {
  try {
    dispatch(getShareUnseenCountRequest())
    const response = await api('getShareUnseenCount')
    const { data, success } = response

    if (success) {
      dispatch(getShareUnseenCountSuccess(data))
    } else {
      dispatch(getShareUnseenCountFailure(data.error))
    }

    return response
  } catch (error) {
    return { success: false, data: { error: error.message } }
  }
}

export default getShareUnseenCount
