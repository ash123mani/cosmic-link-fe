import { getCategoryPickerItems, getSelectedCategory } from '@state/selectors/links'

const mapStateToProps = (state) => ({
  categories: getCategoryPickerItems(state),
  selectedCategory: getSelectedCategory(state),
})

export { mapStateToProps }
