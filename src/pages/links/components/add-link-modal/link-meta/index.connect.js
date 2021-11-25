import { linkCategories } from '@state/selectors/links'

const mapStateToProps = (state) => {
  const categories = linkCategories(state)

  const allCategories = categories.map(({ name, id }) => ({
    value: name,
    key: id,
  }))

  return {
    allCategories,
  }
}

export { mapStateToProps }
