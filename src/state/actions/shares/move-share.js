import { api } from '@api'
import { MOVE_SHARE_REQUEST, MOVE_SHARE_SUCCESS, MOVE_SHARE_FAILURE } from '@state/constants/shares'
import { setAppBanner } from '@state/actions/app'

const moveShareRequest = (payload) => ({ type: MOVE_SHARE_REQUEST, payload })
const moveShareSuccess = (payload) => ({ type: MOVE_SHARE_SUCCESS, payload })
const moveShareFailure = (payload, dispatch) => {
  dispatch(setAppBanner({ type: 'error', message: payload || 'Could not move shared link' }))
  return { type: MOVE_SHARE_FAILURE, payload }
}

const moveShare = ({ id, category }) => async (dispatch) => {
  try {
    dispatch(moveShareRequest({ id, category }))
    const response = await api('moveShare', { appendPath: `/${id}/move`, body: { category } })
    const { data, success } = response
    if (success) {
      dispatch(moveShareSuccess(data))
    } else {
      dispatch(moveShareFailure(data && data.error, dispatch))
    }
    return response
  } catch (error) {
    dispatch(moveShareFailure(error.message, dispatch))
    return { success: false, data: { error: error.message } }
  }
}

export default moveShare
