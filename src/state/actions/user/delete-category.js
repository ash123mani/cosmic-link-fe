import { api } from '@api'
import { DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE } from '@state/constants/user'
import { setAppBanner } from '@state/actions/app'
import { updateuserLinkCategories, setSelectedCategory } from '@state/actions/links'

const deleteCategoryRequest = (payload) => ({
  type: DELETE_CATEGORY_REQUEST,
  payload,
})

const deleteCategorySuccess = (payload) => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload,
})

const deleteCategoryFailure = (payload, dispatch) => {
  dispatch(setAppBanner({
    type: 'error',
    message: payload,
  }))

  return {
    type: DELETE_CATEGORY_FAILURE,
    payload,
  }
}

const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    const appendPath = `/${categoryId}`
    dispatch(deleteCategoryRequest({ categoryId }))

    const response = await api('deleteCategory', { appendPath })
    const { data, success } = response

    if (success) {
      dispatch(deleteCategorySuccess(data))
      const newCategories = data.user.categories
      dispatch(updateuserLinkCategories(newCategories))
      dispatch(
        setSelectedCategory(
          newCategories[newCategories.length - 1].id,
        ),
      )
    } else {
      dispatch(deleteCategoryFailure(data.error, dispatch))
    }

    return response
  } catch (error) {
    const errorResp = {
      data: { error: error.message },
    }
    return errorResp
  }
}

export default deleteCategory
