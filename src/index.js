import React from 'react'
import { render } from 'react-dom'

import App from './app'
import '../sw'

render(<App />, document.getElementById('root'))
