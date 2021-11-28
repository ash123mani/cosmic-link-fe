import {
  UPDATE_LINK_CATEGORIES, GET_LINKS_SUCCESS, SET_SELECTED_CATEGORY, ADD_LINK_SUCCESS,
} from '@state/constants/links'

const initialState = {
  categories: [],
  collection: {
  },
  selectedCategory: '',
}

const linksReducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case UPDATE_LINK_CATEGORIES:
    return {
      ...state,
      categories: payload,
    }
  case ADD_LINK_SUCCESS:
    return {
      ...state,
      collection: {
        ...state.collection,
        [payload.categoryId]: {
          ...state.collection[payload.categoryId],
          links: [
            ...(state.collection[payload.categoryId].links || []),
            payload.link,
          ],
        },
      },
    }
  case GET_LINKS_SUCCESS:
    return {
      ...state,
      collection: {
        ...state.collection,
        [payload.categoryId]: {
          links: payload.links,
          isFetched: true,
        },
      },
    }
  case SET_SELECTED_CATEGORY:
    return {
      ...state,
      selectedCategory: payload,
    }
  default:
    return state
  }
}

export default linksReducer
