import getSelectedCategory from './get-selected-category'

const getSelectedCategoryLinks = (state) => {
  const selectedCategory = getSelectedCategory(state)
  const collection = state.links.collection

  return (collection[selectedCategory] || {}).links
}

export default getSelectedCategoryLinks
