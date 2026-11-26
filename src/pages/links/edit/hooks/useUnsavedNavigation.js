import {
  useCallback, useEffect, useRef, useState,
} from 'react'
import { useHistory } from 'react-router-dom'

const useUnsavedNavigation = ({ isDirty, isBlocked }) => {
  const history = useHistory()
  const [pendingLocation, setPendingLocation] = useState(null)
  const allowNavigationRef = useRef(false)

  useEffect(() => {
    if (!isDirty) {
      return undefined
    }
    const onBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [isDirty])

  const navigateTo = useCallback((nextLocation) => {
    allowNavigationRef.current = true
    setPendingLocation(null)
    history.push(nextLocation)
  }, [history])

  const requestNavigation = useCallback((nextLocation) => {
    if (isDirty) {
      setPendingLocation(nextLocation)
      return
    }
    navigateTo(nextLocation)
  }, [isDirty, navigateTo])

  const handleBlockedNavigation = useCallback((nextLocation) => {
    if (allowNavigationRef.current || !isDirty || isBlocked) {
      return true
    }
    setPendingLocation(nextLocation)
    return false
  }, [isDirty, isBlocked])

  const cancelNavigation = useCallback(() => setPendingLocation(null), [])
  const confirmNavigation = useCallback(() => {
    if (pendingLocation) {
      navigateTo(pendingLocation)
    }
  }, [pendingLocation, navigateTo])

  return {
    pendingLocation,
    navigateTo,
    requestNavigation,
    handleBlockedNavigation,
    cancelNavigation,
    confirmNavigation,
  }
}

export default useUnsavedNavigation
