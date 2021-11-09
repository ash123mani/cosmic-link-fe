import { api } from '@api'
import { setStorageItem } from '@util/storage'
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from '@state/constants/auth'

const registerUserRequest = (payload) => ({
  type: REGISTER_USER_REQUEST,
  user: payload,
})

const registerUserSuccess = (payload) => ({
  type: REGISTER_USER_SUCCESS,
  ...payload,
})

const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  error,
})

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
      dispatch(registerUserFailure(response))
    }

    return response
  } catch (error) {
    throw new Error(error)
  }
}

export default registerUser
