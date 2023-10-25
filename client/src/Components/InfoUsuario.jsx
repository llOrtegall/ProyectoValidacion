import { InfoIcon } from "./IconsSvg";

// eslint-disable-next-line react/prop-types
export function InfoUsuario({ user }) {
  return (
    <>
      <section className="flex w-auto m-2 p-2 bg-yellow-300 rounded-lg justify-center ">
        <span className="font-semibold">Por Favor Antes De Agregar El Usuario Validar Con Alguna Página Del Estado La Información Recibida</span>
      </section>
      <section className="flex m-2 p-6 bg-zinc-300 rounded-lg items-center">
        <figure className="w-auto h-full pr-2 ">
          <InfoIcon />
        </figure>
        <div className="flex flex-col border rounded-md p-6 bg-zinc-400 w-auto">
          {user.length > 0
            ? user.map(
              i => (
                <div key={i.cedula}>
                  <div className="flex justify-between">
                    <h1 className="font-bold pr-8">Nombres: </h1>
                    <h1 className="">{i.nombre}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="font-bold pr-8">N° Cedula: </h1>
                    <h1 className="">{i.cedula}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="font-bold pr-8">Telefono: </h1>
                    <h1 className="">{i.telefono}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="font-bold pr-8">Tel Registro: </h1>
                    <h1 className="">{i.telwhats}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="font-bold pr-8">Correo: </h1>
                    <h1 className="">{i.correo}</h1>
                  </div>
                  <div className="flex justify-between">
                    <label className="font-bold pr-8"> Usuario Validado: </label>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" className="w-4" />
                  </div>
                </div>
              ))
            : null}
        </div>
        <article className="grid grid-cols-1 w-auto h-auto">
          <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-green-400">Crear Usuario</button>
          <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-yellow-400">Editar Usuario</button>
          <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-red-400">Eliminar Usuario</button>
        </article>
      </section >
    </>
  )
}

