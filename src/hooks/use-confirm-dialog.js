import { useCallback, useState } from 'react'

const useConfirmDialog = () => {
  const [confirm, setConfirm] = useState(null)
  const [isConfirming, setIsConfirming] = useState(false)

  const close = useCallback(() => {
    if (!isConfirming) {
      setConfirm(null)
    }
  }, [isConfirming])

  const open = useCallback((config) => setConfirm(config), [])

  const run = useCallback(async () => {
    if (!confirm?.onConfirm || isConfirming) {
      return
    }
    setIsConfirming(true)
    try {
      await confirm.onConfirm()
    } finally {
      setIsConfirming(false)
      setConfirm(null)
    }
  }, [confirm, isConfirming])

  return {
    confirm, open, close, run, isConfirming, setConfirm,
  }
}

export default useConfirmDialog
