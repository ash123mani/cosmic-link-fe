import { userLinkCategories as getUserCategories } from '@state/selectors/user'

import isLoggedIn from './is-logged-in'

export { isLoggedIn, getUserCategories }

export const selectUser = (state) => state.auth?.user
