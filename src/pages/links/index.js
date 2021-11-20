import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '@common'
import { removeStorageItem } from '@util/storage'

import Main from './main'

const Links = () => {
  const history = useHistory()

  const handleLogout = () => {
    removeStorageItem('local', 'token')
    history.replace('/')
  }

  return (
    <Fragment>
      <Main />
      <Button onClick={handleLogout}>Logout</Button>
    </Fragment>
  )
}

export default Links
