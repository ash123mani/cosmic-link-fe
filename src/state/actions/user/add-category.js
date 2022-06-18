import { api } from '@api'
import { ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE } from '@state/constants/user'
import { setAppBanner } from '@state/actions/app'
import { updateuserLinkCategories, setSelectedCategory } from '@state/actions/links'

const addCategoryRequest = (payload) => ({
  type: ADD_CATEGORY_REQUEST,
  payload,
})

const addCategorySuccess = (payload) => ({
  type: ADD_CATEGORY_SUCCESS,
  payload,
})

const addCategoryFailure = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: payload,
  }))

  return {
    type: ADD_CATEGORY_FAILURE,
    payload,
  }
}

const addCategory = (payload) => async (dispatch) => {
  try {
    const body = {
      name: payload,
    }
    dispatch(addCategoryRequest(payload))

    const response = await api('addCategory', { body })
    const { data, success } = response

    if (success) {
      dispatch(addCategorySuccess(data))
      const newCategories = data.user.categories
      dispatch(updateuserLinkCategories(newCategories))
      dispatch(
        setSelectedCategory(
          newCategories[newCategories.length - 1].id,
        ),
      )
    } else {
      dispatch(addCategoryFailure(data.error, dispatch))
    }

    return response
  } catch (error) {
    const errorResp = {
      data: { error: error.message },
    }
    return errorResp
  }
}

export default addCategory
