import { getLinks, setSelectedCategory } from '@state/actions/links'
import {
  getSelectedCategory, isSelectedCategoryFetched, getSelectedCategoryLinks, getCategoryLinkCount,
} from '@state/selectors/links'
import { getUserCategories } from '@state/selectors/auth'

const mapStateToProps = (state) => {
  const selectedCategory = getSelectedCategory(state)
  const isCategoryFetchedAlready = isSelectedCategoryFetched(state)
  const categoryLinks = getSelectedCategoryLinks(state)
  const categories = getUserCategories(state)
  const selectedCategoryCount = getCategoryLinkCount(state, selectedCategory)

  return {
    selectedCategory,
    isCategoryFetchedAlready,
    categoryLinks,
    categories,
    selectedCategoryCount,
  }
}

const actions = {
  getLinks,
  setSelectedCategory,
}

export {
  mapStateToProps,
  actions,
}
