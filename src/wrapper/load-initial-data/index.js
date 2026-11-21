import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { func, bool } from 'prop-types'

import { actions, mapStateToProps } from './index.connect'

const LoadInitialData = ({ getUserData, getShareUnseenCount, isUserLoggedIn }) => {
  const location = useLocation()

  useEffect(() => {
    if (isUserLoggedIn) {
      getUserData()
      getShareUnseenCount()
    }
  }, [isUserLoggedIn])

  useEffect(() => {
    if (isUserLoggedIn) {
      getShareUnseenCount()
    }
  }, [isUserLoggedIn, location.pathname])

  useEffect(() => {
    if (!isUserLoggedIn) {
      return undefined
    }

    const refresh = () => getShareUnseenCount()
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    const intervalId = setInterval(refresh, 30000)

    return () => {
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
      clearInterval(intervalId)
    }
  }, [isUserLoggedIn])

  return null
}

LoadInitialData.propTypes = {
  getUserData: func.isRequired,
  getShareUnseenCount: func.isRequired,
  isUserLoggedIn: bool,
}

LoadInitialData.defaultProps = {
  isUserLoggedIn: false,
}

const LoadInitialDataDataWithConnect = connect(
  mapStateToProps, actions,
)(LoadInitialData)

export default LoadInitialDataDataWithConnect
