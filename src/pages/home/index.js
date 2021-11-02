import React, { Fragment } from 'react'

import SeoMeta from '@local/seo-meta'
import Main from './main'

const Home = () => (
  <Fragment>
    <SeoMeta displayName="Home" />
    <Main />
  </Fragment>
)

export default Home
