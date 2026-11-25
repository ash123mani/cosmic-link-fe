import { useCallback, useState } from 'react'

const isSuccess = (res) => {
  if (!res) {
    return false
  }
  if (typeof res.success === 'boolean') {
    return res.success
  }
  if (typeof res.type === 'string') {
    return res.type.endsWith('_SUCCESS')
  }
  return res === true
}

const getErrorMessage = (res) => res?.error?.message
  || res?.data?.error?.message
  || res?.data?.error
  || res?.payload?.message
  || 'Something went wrong'

const useAsyncAction = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (action, options = {}) => {
    const { onSuccess, onError, throwOnError = false } = options
    setIsLoading(true)
    setError(null)
    try {
      const res = await action()
      if (isSuccess(res)) {
        if (onSuccess) {
          await onSuccess(res)
        }
        return { ok: true, res }
      }
      const message = getErrorMessage(res)
      setError(message)
      if (onError) {
        await onError(res, message)
      }
      if (throwOnError) {
        throw new Error(message)
      }
      return { ok: false, res, error: message }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    execute, isLoading, error, setError,
  }
}

export default useAsyncAction
