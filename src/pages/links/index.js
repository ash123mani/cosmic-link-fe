import React from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '@common'
import { removeStorageItem } from '@util/storage'

const Links = () => {
  const history = useHistory()

  const handleLogout = () => {
    removeStorageItem('local', 'token')
    history.replace('/')
  }

  return <Button onClick={handleLogout}>Logout</Button>
}

export default Links
