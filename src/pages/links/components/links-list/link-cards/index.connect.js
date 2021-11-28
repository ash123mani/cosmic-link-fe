import { getSelectedCategoryLinks } from '@state/selectors/links'

const mapStateToProps = (state) => {
  const categoryLinks = getSelectedCategoryLinks(state)

  return {
    categoryLinks,
  }
}

export {
  mapStateToProps,
}
