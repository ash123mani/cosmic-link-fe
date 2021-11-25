import { UPDATE_LINK_CATEGORIES } from '@state/constants/links'

const updateLinkCategories = (payload) => ({
  type: UPDATE_LINK_CATEGORIES,
  payload,
})

export default updateLinkCategories
