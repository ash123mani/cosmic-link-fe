import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '@store'

import Wrapper from './wrapper'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Wrapper />
    </BrowserRouter>
  </Provider>
)

export default App
