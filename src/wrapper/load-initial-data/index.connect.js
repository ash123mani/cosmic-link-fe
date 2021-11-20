import { getUserData } from '@state/actions/auth'
import { isLoggedIn } from '@state/selectors/auth'

const mapStateToProps = (state) => {
  const isUserLoggedIn = isLoggedIn(state)

  return {
    isUserLoggedIn,
  }
}

const actions = { getUserData }

export { mapStateToProps, actions }
