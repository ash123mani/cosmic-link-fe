import { getUserData } from '@state/actions/auth'
import { getShareUnseenCount } from '@state/actions/shares'
import { isLoggedIn } from '@state/selectors/auth'

const mapStateToProps = (state) => {
  const isUserLoggedIn = isLoggedIn(state)

  return {
    isUserLoggedIn,
  }
}

const actions = { getUserData, getShareUnseenCount }

export { mapStateToProps, actions }
