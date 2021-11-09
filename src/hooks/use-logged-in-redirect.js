import { useLayoutEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { isLoggedIn } from '@state/selectors/auth'

const useLoggedInRedirect = () => {
  const history = useHistory()
  const isUserLoggedIn = useSelector(isLoggedIn)

  useLayoutEffect(() => {
    if (isUserLoggedIn) {
      history.push('/links')
    }
  }, [isUserLoggedIn])
}

export default useLoggedInRedirect
