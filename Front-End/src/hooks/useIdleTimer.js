import { useEffect, useRef, useCallback } from 'react'

export function useIdleTimer (logout, timeout = 1000 * 60 * 5) {
  const timerRef = useRef(null)

  const resetTimer = useCallback(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      logout()
    }, timeout)
    console.log('Reset timer')
  }, [logout, timeout])

  useEffect(() => {
    resetTimer() // Reinicia el temporizador cuando el componente se monta

    return () => {
      clearTimeout(timerRef.current) // Limpia el temporizador cuando el componente se desmonta
    }
  }, [resetTimer])

  return resetTimer
}
