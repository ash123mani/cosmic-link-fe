import React, { Fragment } from 'react'

import { useLoggedInRedirect } from '@hooks'
import SeoMeta from '@local/seo-meta'

import Main from './main'

const Register = () => {
  useLoggedInRedirect()

  return (
    <Fragment>
      <SeoMeta displayName="Login" content="Register to CosmicLink" />
      <Main />
    </Fragment>
  )
}

export default Register
