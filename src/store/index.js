import configureStore from './configure-store'
import rootReducer from './root-reducer'

const configuredStore = configureStore(rootReducer)

export {
  configuredStore as default,
  rootReducer,
}
