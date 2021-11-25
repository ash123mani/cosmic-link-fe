import { combineReducers } from 'redux'

import authReducer from '@state/reducers/auth'
import appReducer from '@state/reducers/app'
import linksReducer from '@state/reducers/links'

export default combineReducers({
  auth: authReducer,
  app: appReducer,
  links: linksReducer,
})
