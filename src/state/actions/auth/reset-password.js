import { api } from '@api'
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from '@state/constants/auth'
import { setAppBanner } from '@state/actions/app'

const resetPasswordRequest = (payload) => ({
  type: RESET_PASSWORD_REQUEST,
  payload,
})

const resetPasswordSuccess = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'info',
    message: payload.message,
    duration: 10 * 1000,
  }))

  return {
    type: RESET_PASSWORD_SUCCESS,
    payload,
  }
}

const resetPasswordFailure = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: payload,
  }))

  return {
    type: RESET_PASSWORD_FAILURE,
    payload,
  }
}

const resetPassword = ({ password, resetToken }) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest(password))

    const appendPath = `/${resetToken}`
    const body = {
      password,
    }
    const response = await api('resetPassword', { body, appendPath })
    const { success, data } = response

    if (success) {
      dispatch(resetPasswordSuccess(data, dispatch))
    } else {
      dispatch(resetPasswordFailure(data.error, dispatch))
    }

    return response
  } catch (error) {
    const errorResp = {
      data: { error: error.message },
    }
    return errorResp
  }
}

export default resetPassword
