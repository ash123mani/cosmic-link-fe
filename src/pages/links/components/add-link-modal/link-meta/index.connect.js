import { userLinkCategories } from '@state/selectors/user'

const mapStateToProps = (state) => {
  const categories = userLinkCategories(state)

  const allCategories = categories.map(({ name, id }) => ({
    value: name,
    key: id,
  }))

  return {
    allCategories,
  }
}

export { mapStateToProps }
