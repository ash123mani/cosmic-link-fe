import React, { Fragment } from 'react'

import SeoMeta from '@local/seo-meta'

import Main from './main'

const Login = () => (
  <Fragment>
    <SeoMeta
      displayName="Login"
      content="Login to CosmicLink"
    />
    <Main />
  </Fragment>
)

export default Login
