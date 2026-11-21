import { userLinkCategories, getUserData } from '@state/selectors/user'
import { logOutUser } from '@state/actions/auth'

const mapStateToProps = (state) => {
  const categories = userLinkCategories(state)
  const user = getUserData(state)

  return {
    categories,
    user,
  }
}

const actions = { logOutUser }

export {
  mapStateToProps,
  actions,
}
