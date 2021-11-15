import { api } from '@api'
import { setStorageItem } from '@util/storage'
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '@state/constants/auth'
import { setAppBanner } from '@state/actions/app'

const loginUserRequest = (payload) => ({
  type: LOGIN_USER_REQUEST,
  payload,
})

const loginUserSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
})

const loginUserFailure = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: payload,
  }))

  return {
    type: LOGIN_USER_FAILURE,
    payload,
  }
}

const loginUser = (form = {}) => async (dispatch) => {
  try {
    dispatch(loginUserRequest(form))

    const body = {
      password: form.password,
      email: form.email,
    }
    const response = await api('loginUser', { body })
    const { success, data } = response

    if (success) {
      setStorageItem('local', 'token', data.token)
      dispatch(loginUserSuccess(data))
    } else {
      dispatch(loginUserFailure(data.error, dispatch))
    }

    return response
  } catch (error) {
    const errorResp = {
      data: { error: error.message },
    }
    return errorResp
  }
}

export default loginUser
