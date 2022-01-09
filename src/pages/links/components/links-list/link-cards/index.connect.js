import { getSelectedCategoryLinks } from '@state/selectors/links'

import { setAppBanner } from '@state/actions/app'
import { deleteLink } from '@state/actions/links'

const mapStateToProps = (state) => {
  const categoryLinks = getSelectedCategoryLinks(state)

  return {
    categoryLinks,
  }
}

const actions = {
  setAppBanner,
  deleteLink,
}

export {
  mapStateToProps,
  actions,
}
