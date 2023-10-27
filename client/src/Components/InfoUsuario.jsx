import { useState } from "react";
import { EditarUsuario } from "./EditarUsuario";
import { CloseIcon, InfoIcon } from "./IconsSvg";
import { NewUserCreate } from "./NewUserCreate";

// eslint-disable-next-line react/prop-types
export function InfoUsuario({ inf, fun }) {

  // eslint-disable-next-line react/prop-types
  const { nombre, cedula, telefono, telwhats, correo } = inf[0]
  const [showComponent, setShowComponent] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [crearUsuario, setCrearUsuario] = useState(false)

  const handleClickCreated = () => {
    setCrearUsuario(!crearUsuario)
  }

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };


  const handleClick = () => {
    setShowComponent(!showComponent)
  }

  const toggleComponent = fun

  return (
    <>
      <section className="flex m-2 p-2 bg-orange-600 text-yellow-50 rounded-lg justify-center shadow-xl ">
        <span className="font-semibold">Por Favor Antes De Agregar El Usuario Validar Con Alguna Página Del Estado La Información Recibida !!!</span>
      </section>

      <section className="w-auto h-full relative m-2 p-6 bg-zinc-400 rounded-lg shadow-2xl">

        <section className="flex items-center w-full h-full justify-start">
          <figure className="">
            <InfoIcon />
          </figure>

          <section className="flex items-center">

            <div className="">
              <div className="flex justify-between">
                <h1 className="font-medium pr-8 ">Nombres: </h1>
                <h1 className="">{nombre}</h1>
              </div>
              <div className="flex justify-between">
                <h1 className="font-medium pr-8 ">N° Cedula: </h1>
                <h1 className=" font-bold">{cedula}</h1>
              </div>
              <div className="flex justify-between">
                <h1 className="font-medium pr-8 ">Telefono: </h1>
                <h1 className="">{telefono}</h1>
              </div>
              <div className="flex justify-between">
                <h1 className="font-medium pr-8 ">Tel Registro: </h1>
                <h1 className="">{telwhats}</h1>
              </div>
              <div className="flex justify-between">
                <h1 className="font-medium pr-8 ">Correo: </h1>
                <h1 className="">{correo}</h1>
              </div>
              <div className="flex justify-between">
                <label className="font-medium pr-8 "> Usuario Validado: </label>
                <input type="checkbox" className="w-4" checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>

          </section>

          <aside className="flex flex-col justify-center">
            {isChecked === true
              ? < button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-green-400" onClick={handleClickCreated}>Crear Usuario</button>
              : <button disabled className=" font-semibold p-2 mx-4 my-2 rounded-xl bg-green-200 text-opacity-75 text-gray-400" >Crear Usuario</button>
            }
            {/* <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-green-400">Crear Usuario</button> */}
            <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-yellow-400" onClick={handleClick}>Editar Usuario</button>
            <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-purple-400">Validar Usuario</button>

          </aside>

          {showComponent && <EditarUsuario user={inf} fun={handleClick} />}

          {crearUsuario && <NewUserCreate user={inf} fun={handleClickCreated} />}


        </section>

        <button className="text-white absolute top-2 right-2 hover:bg-red-500 hover:rounded-full hover:text-white" onClick={toggleComponent}><CloseIcon /></button>

      </section >
    </>
  )
}

