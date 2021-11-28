import { getLinkMeta, addLink, setSelectedCategory } from '@state/actions/links'
import { setAppBanner } from '@state/actions/app'
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
