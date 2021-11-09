import { combineReducers } from 'redux'

import authReducer from '../state/reducers/auth'

export default combineReducers({
  auth: authReducer,
})
