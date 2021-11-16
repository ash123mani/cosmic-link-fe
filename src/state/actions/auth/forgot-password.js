import { api } from '@api'
import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from '@state/constants/auth'
import { setAppBanner } from '@state/actions/app'

const forgotPasswordRequest = (payload) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload,
})

const forgotPasswordSuccess = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'info',
    message: payload.message,
    duration: 10 * 1000,
  }))

  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload,
  }
}

const forgotPasswordFailure = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: payload,
  }))

  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload,
  }
}

const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest(email))

    const body = {
      email,
    }
    const response = await api('forgotPassword', { body })
    const { success, data } = response

    if (success) {
      dispatch(forgotPasswordSuccess(data, dispatch))
    } else {
      dispatch(forgotPasswordFailure(data.error, dispatch))
    }

    return response
  } catch (error) {
    const errorResp = {
      data: { error: error.message },
    }
    return errorResp
  }
}

export default forgotPassword
