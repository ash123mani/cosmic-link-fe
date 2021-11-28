import getSelectedCategory from './get-selected-category'

const isSelectedCategoryFetched = (state) => {
  const collection = state.links.collection

  const selectedCategory = getSelectedCategory(state)

  return (collection[selectedCategory] || {}).isFetched
}

export default isSelectedCategoryFetched
