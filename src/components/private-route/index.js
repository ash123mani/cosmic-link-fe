/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { node } from 'prop-types'
import { connect } from 'react-redux'

import { mapStateToProps } from './index.connect'

const PrivateRoute = ({ children, ...rest }) => {
  const { isUserLoggedIn } = rest

  return (
    <Route
      {...rest}
      render={({ location }) => (isUserLoggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  )
}

PrivateRoute.propTypes = {
  children: node,
}

PrivateRoute.defaultProps = {
  children: null,
}

const PrivateRouteWithConnect = connect(
  mapStateToProps,
)(PrivateRoute)

export default PrivateRouteWithConnect
