import { getStorageItem } from '@util/storage'

const isLoggedIn = (state) => {
  const isLoggedIn = !!state.auth.token || !!getStorageItem('local', 'token')

  return isLoggedIn
}

export default isLoggedIn
