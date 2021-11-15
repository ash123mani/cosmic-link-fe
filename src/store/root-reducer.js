import { combineReducers } from 'redux'

import authReducer from '@state/reducers/auth'
import appReducer from '@state/reducers/app'

export default combineReducers({
  auth: authReducer,
  app: appReducer,
})
