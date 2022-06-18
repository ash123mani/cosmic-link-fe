import React, { Fragment } from 'react'

import SeoMeta from '@local/seo-meta'

import Main from './main'

const Profile = () => (
  <Fragment>
    <SeoMeta
      displayName="Your Profile"
      content="Your Profile info"
    />
    <Main />
  </Fragment>
)

export default Profile
