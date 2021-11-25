import { REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS, GET_USER_DATA_SUCCESS } from '@state/constants/auth'
import { getStorageItem } from '@util/storage'

const intialState = {
  token: '',
  user: {},
}

const authReducer = (state = intialState, action) => {
  const { payload, type } = action

  switch (type) {
  case GET_USER_DATA_SUCCESS:
  case LOGIN_USER_SUCCESS:
  case REGISTER_USER_SUCCESS:
    return {
      ...state,
      token: getStorageItem('local', 'token'),
      user: payload.user,
    }
  default:
    return state
  }
}

export default authReducer
