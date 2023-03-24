import { isLoggedIn } from '@state/selectors/auth'
import { logOutUser } from '@state/actions/auth'

const mapStateToProps = (state) => {
  const isUserLoggedIn = isLoggedIn(state)

  return {
    isUserLoggedIn,
  }
}

const actions = { logOutUser }

export { mapStateToProps, actions }
