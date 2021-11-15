import { SET_APP_BANNER, REMOVE_APP_BANNER } from '@state/constants/app'

export const setAppBanner = (payload) => ({
  type: SET_APP_BANNER,
  payload,
})

export const removeAppBanner = () => ({
  type: REMOVE_APP_BANNER,
})
