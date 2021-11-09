import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from '@local/private-route'
import Home from '@pages/home'
import Register from '@pages/register'
import Login from '@pages/login'
import Links from '@pages/links'
import Profile from '@pages/profile'

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
    <PrivateRoute path="/links">
      <Links />
    </PrivateRoute>
    <PrivateRoute path="/profile">
      <Profile />
    </PrivateRoute>
  </Switch>
)

export default Routes
