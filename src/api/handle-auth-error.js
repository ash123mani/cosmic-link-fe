import store from '@store'
import { setAppBanner } from '@state/actions/app'
import { logOutUser } from '@state/actions/auth'

const handleAuthError = (response = {}) => {
  const authCodes = [401]

  if (authCodes.includes(response.data.statusCode)) {
    store.dispatch(setAppBanner({
      type: 'error',
      message: 'Your session got expired, so logging you out',
      duration: 3000,
    }))

    store.dispatch(logOutUser())
  }

  return response
}

export default handleAuthError
