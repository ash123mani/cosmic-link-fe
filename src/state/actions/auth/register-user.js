import { api } from '@api'
import { setStorageItem } from '@util/storage'
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from '@state/constants/auth'
import { setAppBanner } from '@state/actions/app'

const registerUserRequest = (payload) => ({
  type: REGISTER_USER_REQUEST,
  payload,
})

const registerUserSuccess = (payload) => ({
  type: REGISTER_USER_SUCCESS,
  ...payload,
})

const registerUserFailure = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: payload,
  }))

  return {
    type: REGISTER_USER_FAILURE,
    payload,
  }
}

const registerUser = (form = {}) => async (dispatch) => {
  try {
    dispatch(registerUserRequest(form))

    const body = {
      password: form.password,
      email: form.email,
      username: form.name,
    }
    const response = await api('registerUser', { body })
    const { success, data } = response

    if (success) {
      setStorageItem('local', 'token', data.token)
      dispatch(registerUserSuccess(response))
    } else {
      dispatch(registerUserFailure(data.error, dispatch))
    }

    return response
  } catch (error) {
    const errorResp = {
      data: { error: error.message },
    }
    return errorResp
  }
}

export default registerUser
