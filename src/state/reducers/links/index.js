import {
  UPDATE_LINK_CATEGORIES, GET_LINKS_SUCCESS, SET_SELECTED_CATEGORY, ADD_LINK_SUCCESS, DELETE_LINK_SUCCESS,
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
            payload.link,
            ...(state.collection[payload.categoryId].links || []),
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
  case DELETE_LINK_SUCCESS:
    const deletedLinkCategory = payload.link.category
    const newLinksList = state.collection[deletedLinkCategory.id].links
      .filter((link) => link.id !== payload.link.id)
    return {
      ...state,
      collection: {
        ...state.collection,
        [deletedLinkCategory.id]: {
          ...state.collection[deletedLinkCategory.id],
          links: newLinksList,
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
