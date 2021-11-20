import { SET_APP_BANNER, REMOVE_APP_BANNER } from '@state/constants/app'

const intialState = {
  banner: {
    type: 'error',
    message: '',
    autoClose: true,
    duration: 5000,
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
        ...payload,
      },
    }
  case REMOVE_APP_BANNER:
    return {
      ...state,
      banner: {
        type: '',
        message: '',
        autoClose: true,
        duration: 2000,
      },
    }
  default:
    return state
  }
}

export default appReducer
