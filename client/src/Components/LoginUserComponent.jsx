import { CloseSession, UserIcon } from "./IconsSvg";

export function LoginUserComponent({ name, apellidos, id }) {
  return (
    <nav className="flex items-center justify-between bg-slate-300 m-2 px-4 py-2 rounded-xl">
      <figure className="flex items-center">
        <UserIcon />
        <div>
          <h3 className="font-semibold text-xl">Bienvenido {name} {apellidos}</h3>
          <p style={{ fontSize: '10px' }}>{id}</p>
        </div>
      </figure>

      <button id="close session" className="flex flex-col items-center text-center">
        <CloseSession />
        <p>Cerrar Session</p>
      </button>
    </nav >
  )
}