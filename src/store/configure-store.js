import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

const configureStore = (rootReducer, preloadedState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(middlewareEnhancer),
  )
}

export default configureStore
