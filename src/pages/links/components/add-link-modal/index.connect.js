import { getLinkMeta, addLink, setSelectedCategory } from '@state/actions/links'
import { setAppBanner } from '@state/actions/app'
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

const actions = {
  getLinkMeta,
  addLink,
  setAppBanner,
  setSelectedCategory,
}

export {
  mapStateToProps,
  actions,
}
