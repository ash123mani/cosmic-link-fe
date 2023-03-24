import {
  REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS, LOG_OUT_USER, GET_USER_DATA_SUCCESS,
} from '@state/constants/auth'
import { ADD_CATEGORY_SUCCESS } from '@state/constants/user'
import { getStorageItem } from '@util/storage'

const intialState = {
  token: getStorageItem('local', 'token'),
  user: {},
}

const authReducer = (state = intialState, action) => {
  const { payload, type } = action

  switch (type) {
  case GET_USER_DATA_SUCCESS:
  case LOGIN_USER_SUCCESS:
  case REGISTER_USER_SUCCESS:
  case ADD_CATEGORY_SUCCESS:
    return {
      ...state,
      token: getStorageItem('local', 'token'),
      user: payload.user,
    }
  case LOG_OUT_USER:
    return {
      ...state,
      token: '',
    }
  default:
    return state
  }
}

export default authReducer
