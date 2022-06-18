import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '@common'
import { removeStorageItem } from '@util/storage'

import SeoMeta from '@local/seo-meta'

import Main from './main'

const Links = () => {
  const history = useHistory()

  const handleLogout = () => {
    removeStorageItem('local', 'token')
    history.replace('/')
  }

  return (
    <Fragment>
      <SeoMeta
        displayName="Links"
        content="One place from all your links"
      />
      <Main />
      <Button onClick={handleLogout}>Logout</Button>
    </Fragment>
  )
}

export default Links
