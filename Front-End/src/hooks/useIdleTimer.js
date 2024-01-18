import { useEffect, useRef } from 'react'

export function useIdleTimer (logout, timeout = 1000 * 60 * 5) { // * Cierra sesión en 5 minutos por defecto
  const timerRef = useRef(null)
  const resetTimer = () => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => logout(), timeout)
  }

  useEffect(() => {
    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keypress', resetTimer)

    return () => {
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keypress', resetTimer)
    }
  }, [])

  return resetTimer
}
