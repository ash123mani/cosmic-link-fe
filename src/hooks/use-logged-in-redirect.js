import { useLayoutEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { isLoggedIn } from '@state/selectors/auth'

const useLoggedInRedirect = () => {
  const history = useHistory()
  const location = useLocation()
  const isUserLoggedIn = useSelector(isLoggedIn)
  const { from } = location.state || { from: { pathname: '/links' } }

  useLayoutEffect(() => {
    if (isUserLoggedIn) {
      history.replace(from)
    }
  }, [isUserLoggedIn])
}

export default useLoggedInRedirect
