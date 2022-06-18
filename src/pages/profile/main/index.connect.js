import { userLinkCategories, getUserData } from '@state/selectors/user'

const mapStateToProps = (state) => {
  const categories = userLinkCategories(state)
  const user = getUserData(state)

  return {
    categories,
    user,
  }
}

export {
  mapStateToProps,
}
