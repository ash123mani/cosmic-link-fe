import { getLinks, setSelectedCategory } from '@state/actions/links'
import { getSelectedCategory, isSelectedCategoryFetched } from '@state/selectors/links'

const mapStateToProps = (state) => {
  const selectedCategory = getSelectedCategory(state)
  const isCategoryFetchedAlready = isSelectedCategoryFetched(state)

  return {
    selectedCategory,
    isCategoryFetchedAlready,
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
