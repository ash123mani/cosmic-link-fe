import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { func, bool } from 'prop-types'

import { Spinner } from '@common'

import { actions, mapStateToProps } from './index.connect'

const LoadInitialData = ({ getUserData, isUserLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false)

  const userData = async () => {
    setIsLoading(true)
    await getUserData()
    setIsLoading(false)
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      userData()
    }
  }, [isUserLoggedIn])

  if (isLoading) {
    return <Spinner />
  }

  return null
}

LoadInitialData.propTypes = {
  getUserData: func.isRequired,
  isUserLoggedIn: bool,
}

LoadInitialData.defaultProps = {
  isUserLoggedIn: false,
}

const LoadInitialDataDataWithConnect = connect(
  mapStateToProps, actions,
)(LoadInitialData)

export default LoadInitialDataDataWithConnect
