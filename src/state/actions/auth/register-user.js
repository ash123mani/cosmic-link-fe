import { api } from '@api'
import log from '@util/log'

const registerUser = (body) => async (dispatch) => {
  try {
    const response = await api('registerUser', { body })
    dispatch({ type: 'DONE' })
    log(response)
  } catch (error) {
    log(error)
  }
}

export default registerUser
