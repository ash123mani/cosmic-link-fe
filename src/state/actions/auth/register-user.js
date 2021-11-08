import { api } from '@api'
import log from '@util/log'

const registerUser = (form) => async (dispatch) => {
  try {
    const body = {
      password: form.password,
      email: form.email,
      username: form.name,
    }
    const response = await api('registerUser', { body })
    dispatch({ type: 'DONE' })
    log(response)
  } catch (error) {
    log(error, 'error')
  }
}

export default registerUser
