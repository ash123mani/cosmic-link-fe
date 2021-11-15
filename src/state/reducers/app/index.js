import { SET_APP_BANNER, REMOVE_APP_BANNER } from '@state/constants/app'

const intialState = {
  banner: {
    type: '',
    message: '',
  },
}

const appReducer = (state = intialState, action) => {
  const { payload, type } = action

  switch (type) {
  case SET_APP_BANNER:
    return {
      ...state,
      banner: {
        ...state.banner,
        type: payload.type,
        message: payload.message,
      },
    }
  case REMOVE_APP_BANNER:
    return {
      ...state,
      banner: {
        type: '',
        message: '',
      },
    }
  default:
    return state
  }
}

export default appReducer
