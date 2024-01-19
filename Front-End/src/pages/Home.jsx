import { useIdleTimer } from '../hooks/useIdleTimer.js'

export function Home ({ fun }) {
  const logout = fun
  useIdleTimer(logout, 300000)
  return (
    <section className="flex flex-col items-center justify-center h-[93vh] bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-5xl font-bold mb-4">¡Bienvenido!</h1>
      <p className="text-xl text-center max-w-md">Estamos encantados de verte aquí. Explora y disfruta de todas las funcionalidades que tenemos para ti.</p>
    </section>
  )
}
