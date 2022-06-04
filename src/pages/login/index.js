import React, { Fragment } from 'react'

import SeoMeta from '@local/seo-meta'
import { useLoggedInRedirect } from '@hooks'

import Main from './main'

const Login = () => {
  useLoggedInRedirect()

  return (
    <Fragment>
      <SeoMeta
        displayName="Login"
        content="Login to CosmicLink"
      />
      <Main />
    </Fragment>
  )
}

export default Login
