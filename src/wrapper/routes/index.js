import React, { Fragment, lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from '@local/private-route'
import LoadInitialData from '../load-initial-data'

const Home = lazy(() => import(/* webpackChunkName: "pages/home" */ '@pages/home'))
const Register = lazy(() => import(/* webpackChunkName: "pages/register" */ '@pages/register'))
const Login = lazy(() => import(/* webpackChunkName: "pages/login" */ '@pages/login'))
const Links = lazy(() => import(/* webpackChunkName: "pages/links" */ '@pages/links'))
const Profile = lazy(() => import(/* webpackChunkName: "pages/profile" */ '@pages/profile'))
const ResetPassword = lazy(() => import(/* webpackChunkName: "pages/reset-password" */ '@pages/reset-password'))

const Routes = () => (
  <Suspense fallback={null}>
    <Fragment>
      <LoadInitialData />
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
        <Route path="/resetpassword/:resetToken">
          <ResetPassword />
        </Route>
        <PrivateRoute path="/links">
          <Links />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
      </Switch>
    </Fragment>
  </Suspense>

)

export default Routes
