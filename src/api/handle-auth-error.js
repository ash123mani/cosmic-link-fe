import store from '@store'
import { setAppBanner } from '@state/actions/app'
import { logOutUser } from '@state/actions/auth'

const handleAuthError = (response = {}) => {
  const authCodes = [401, 404]

  if (authCodes.includes(response.data.statusCode)) {
    store.dispatch(setAppBanner({
      type: 'error',
      message: 'Please login again, your session got expired',
      duration: 3000,
    }))

    store.dispatch(logOutUser())
  }

  return response
}

export default handleAuthError
