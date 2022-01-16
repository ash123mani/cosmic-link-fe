import { getLinks, setSelectedCategory } from '@state/actions/links'
import { getSelectedCategory, isSelectedCategoryFetched, getSelectedCategoryLinks } from '@state/selectors/links'

const mapStateToProps = (state) => {
  const selectedCategory = getSelectedCategory(state)
  const isCategoryFetchedAlready = isSelectedCategoryFetched(state)

  const categoryLinks = getSelectedCategoryLinks(state)

  return {
    selectedCategory,
    isCategoryFetchedAlready,
    categoryLinks,
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
