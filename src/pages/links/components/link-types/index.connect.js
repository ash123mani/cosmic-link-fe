import { getSelectedCategory } from '@state/selectors/links'
import { userLinkCategories } from '@state/selectors/user'

const mapStateToProps = (state) => {
  const categories = userLinkCategories(state)
  const selectedCategory = getSelectedCategory(state)

  const allCategories = categories.map(({ name, id }) => ({
    value: name,
    key: id,
  }))

  return {
    allCategories,
    selectedCategory,
  }
}

export { mapStateToProps }
