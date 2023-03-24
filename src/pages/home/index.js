import React, { Fragment } from 'react'

import SeoMeta from '@local/seo-meta'
import { useLoggedInRedirect } from '@hooks'

import Main from './main'

const Home = () => {
  useLoggedInRedirect()

  return (
    <Fragment>
      <SeoMeta displayName="Home" />
      <Main />
    </Fragment>
  )
}

export default Home
