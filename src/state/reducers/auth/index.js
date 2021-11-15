import { REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS } from '@state/constants/auth'
import { getStorageItem } from '@util/storage'

const intialState = {
  token: '',
  user: {},
}

const authReducer = (state = intialState, action) => {
  const { payload, type } = action

  switch (type) {
  case LOGIN_USER_SUCCESS:
  case REGISTER_USER_SUCCESS:
    return {
      ...state,
      token: getStorageItem('local', 'token'),
      user: payload.user,
    }
  default:
    return intialState
  }
}

export default authReducer
