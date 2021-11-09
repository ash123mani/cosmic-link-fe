import { REGISTER_USER_SUCCESS } from '@state/constants/auth'
import { getStorageItem } from '@util/storage'

const intialState = {
  token: '',
  user: {},
}

const authReducer = (state = intialState, action) => {
  const { data, type } = action

  switch (type) {
  case REGISTER_USER_SUCCESS:
    return {
      ...state,
      token: getStorageItem('local', 'token'),
      user: data.user,
    }
  default:
    return intialState
  }
}

export default authReducer
