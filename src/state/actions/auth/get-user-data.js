import { api } from '@api'
import { GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILURE } from '@state/constants/auth'
import { setAppBanner } from '@state/actions/app'
import { updateLinkCategories } from '@state/actions/links'

const getUserDataRequest = (payload) => ({
  type: GET_USER_DATA_REQUEST,
  payload,
})

const getUserDataSuccess = (payload) => ({
  type: GET_USER_DATA_SUCCESS,
  payload,
})

const getUserDataFailure = (payload, dispatch) => {
  if (![401].includes(payload.statusCode)) {
    dispatch(setAppBanner({
      type: 'error',
      message: payload.error,
    }))
  }

  return {
    type: GET_USER_DATA_FAILURE,
    payload,
  }
}

const getUserData = () => async (dispatch) => {
  try {
    dispatch(getUserDataRequest())

    const response = await api('getUserData')
    const { data, success } = response

    if (success) {
      dispatch(getUserDataSuccess(data))
      dispatch(updateLinkCategories(data.user.categories))
    } else {
      dispatch(getUserDataFailure(data, dispatch))
    }

    return response
  } catch (error) {
    const errorResp = {
      data: { error: error.message },
    }
    return errorResp
  }
}

export default getUserData
