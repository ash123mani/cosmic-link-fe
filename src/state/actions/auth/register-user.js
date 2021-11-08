import { api } from '@api'
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from '@state/constants/auth'

const registerUserRequest = (payload) => ({
  type: REGISTER_USER_REQUEST,
  user: payload,
})

const registerUserSuccess = (payload) => ({
  type: REGISTER_USER_SUCCESS,
  user: payload,
})

const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  error,
})

const registerUser = (form) => async (dispatch) => {
  try {
    dispatch(registerUserRequest(form))
    const body = {
      password: form.password,
      email: form.email,
      username: form.name,
    }
    const response = await api('registerUser', { body })
    dispatch(registerUserSuccess(response.data))
  } catch (error) {
    dispatch(registerUserFailure(error.message))
  }
}

export default registerUser
