import { isLoggedIn } from '@state/selectors/auth'

const mapStateToProps = (state) => {
  const isUserLoggedIn = isLoggedIn(state)

  return {
    isUserLoggedIn,
  }
}

export { mapStateToProps }
