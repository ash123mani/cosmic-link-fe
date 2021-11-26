import { useEffect } from 'react'

const useOutsideClick = (eleRef, callBack) => {
  const handleClick = (e) => {
    if (eleRef.current && !eleRef.current.contains(e.target)) {
      callBack()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [eleRef, callBack])
}

export default useOutsideClick
