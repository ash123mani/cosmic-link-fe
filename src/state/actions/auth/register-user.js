import { api } from '@api'

const registerUser = (body) => async (dispatch) => {
  try {
    const response = await api('registerUser', body)
    dispatch({ type: 'DONE' })
    console.log('response', response)
  } catch (error) {
    console.log('error', error)
  }
}

export default registerUser
