import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '@pages/home'
import Register from '@pages/register'
import Login from '@pages/login'

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
  </Switch>
)

export default Routes
