import './Styles.css'

export function CardRegisAndLogin ({ handleChange }) {
  return (
    <section className='bg-white w-96 h-2/3 rounded-xl flex flex-col p-12 shadow-2xl bg-card1 justify-between fondo_articulo'>
      <h1 className='text-orange-600 font-bold text-4xl text-center'>Bienvenidos</h1>
      <div className='flex gap-2 flex-col'>
        <p className='pt-48 text-sm pb-2 font-semibold'>Iniciar Sesión | Registrarse </p>
        <button onClick={handleChange} className='bg-orange-400 w-full rounded-lg p-2 text-white text-sm shadow-md hover:bg-green-100 hover:text-black'>Iniciar Sesion</button>
        <button onClick={handleChange} className='bg-orange-400 w-full rounded-lg p-2 text-white text-sm shadow-md hover:bg-green-100 hover:text-black'>Regristrate</button>
      </div>
    </section>
  )
}
