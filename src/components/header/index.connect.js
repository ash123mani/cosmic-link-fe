import { isLoggedIn } from '@state/selectors/auth'
import { logOutUser } from '@state/actions/auth'
import { getShareUnseenCount } from '@state/actions/shares'
import { getShareUnseenCount as getUnseenCount } from '@state/selectors/shares'

const mapStateToProps = (state) => {
  const isUserLoggedIn = isLoggedIn(state)
  const unseenCount = getUnseenCount(state)

  return {
    isUserLoggedIn,
    unseenCount,
  }
}

const actions = { logOutUser, getShareUnseenCount }

export { mapStateToProps, actions }
