import { UPDATE_LINK_CATEGORIES } from '@state/constants/links'

const initialState = {
  categories: [],
}

const linksReducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case UPDATE_LINK_CATEGORIES:
    return {
      ...state,
      categories: payload,
    }
  default:
    return state
  }
}

export default linksReducer
