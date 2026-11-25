import { userLinkCategories } from '@state/selectors/user'
import { isSharedCategory } from '@util/shared-category'
import getSelectedCategory from './get-selected-category'
import getCategoryLinkCount from './get-category-link-count'

const getCategoryPickerItems = (state) => {
  const categories = userLinkCategories(state) || []
  const selectedCategory = getSelectedCategory(state)

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    isShared: isSharedCategory(category.id),
    isActive: category.id === selectedCategory,
    count: getCategoryLinkCount(state, category.id),
  }))
}

export default getCategoryPickerItems
