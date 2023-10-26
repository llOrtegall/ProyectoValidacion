export function EditarUsuario({ user }) {

  const { nombre, telefono, telwhats, cedula, correo } = user[0]

  return (
    <section className="flex flex-col m-2 p-2">
      <form className="m-2 p-2">
        <div className="flex justify-between">
          <label className="font-bold pr-8">Nombres: </label>
          <input className="mb-2" defaultValue={nombre} />
        </div>
        <div className="flex justify-between">
          <label className="font-bold pr-8">N° Cedula: </label>
          <input className="mb-2" defaultValue={cedula} />
        </div>
        <div className="flex justify-between">
          <label className="font-bold pr-8">Telefono: </label>
          <input className="mb-2" defaultValue={telefono} />
        </div>
        <div className="flex justify-between">
          <label className="font-bold pr-8">Tel Registro: </label>
          <input className="mb-2" defaultValue={telwhats} />
        </div>
        <div className="flex justify-between">
          <label className="font-bold pr-8">Correo: </label>
          <input className="mb-2" defaultValue={correo} />
        </div>
      </form>
    </section>
  )
}