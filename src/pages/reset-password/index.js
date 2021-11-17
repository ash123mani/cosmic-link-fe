import React, { Fragment } from 'react'

import SeoMeta from '@local/seo-meta'
import { useLoggedInRedirect } from '@hooks'

import Main from './main'

const ResetPassword = () => {
  useLoggedInRedirect()

  return (
    <Fragment>
      <SeoMeta displayName="Reset Password" content="Reset your password" />
      <Main />
    </Fragment>
  )
}

export default ResetPassword
