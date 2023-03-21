import React, { Fragment } from 'react'

import SeoMeta from '@local/seo-meta'

import Main from './main'

const Links = () => (
  <Fragment>
    <SeoMeta
      displayName="Links"
      content="One place from all your links"
    />
    <Main />
  </Fragment>
)

export default Links
