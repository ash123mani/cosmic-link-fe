import { setAppBanner } from '@state/actions/app'
import { deleteLink, updateLink } from '@state/actions/links'
import { getUserData } from '@state/actions/auth'

const actions = {
  setAppBanner,
  deleteLink,
  updateLink,
  getUserData,
}

export {
  actions,
}
