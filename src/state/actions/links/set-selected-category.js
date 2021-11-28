import { SET_SELECTED_CATEGORY } from '@state/constants/links'

const setSelectedCategory = (payload) => ({
  type: SET_SELECTED_CATEGORY,
  payload,
})

export default setSelectedCategory
