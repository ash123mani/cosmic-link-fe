import { linkCategories, getSelectedCategory } from '@state/selectors/links'

const mapStateToProps = (state) => {
  const categories = linkCategories(state)
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
