import { useEffect, useRef } from 'react'

const useAutoFocus = (deps = []) => {
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef, ...deps])

  return inputRef
}

export default useAutoFocus
