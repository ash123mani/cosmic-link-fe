import React, { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Wrapper from './wrapper'

const App = () => (
  <Fragment>
    <BrowserRouter>
      <Wrapper />
    </BrowserRouter>
  </Fragment>
)

export default App
