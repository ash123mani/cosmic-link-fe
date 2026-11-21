import React, { Fragment } from 'react'

import SeoMeta from '@local/seo-meta'

import Main from './main'

const Shared = () => (
  <Fragment>
    <SeoMeta
      displayName="Shared"
      content="Links shared with you"
    />
    <Main />
  </Fragment>
)

export default Shared
