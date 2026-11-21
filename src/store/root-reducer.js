import { combineReducers } from 'redux'

import authReducer from '@state/reducers/auth'
import appReducer from '@state/reducers/app'
import linksReducer from '@state/reducers/links'
import sharesReducer from '@state/reducers/shares'

export default combineReducers({
  auth: authReducer,
  app: appReducer,
  links: linksReducer,
  shares: sharesReducer,
})
