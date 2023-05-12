import { CloseSession, UserIcon } from "./IconsSvg";

export function LoginUserComponent({ info }) {
  const { id, lastName, name, username } = info

  return (
    <nav className="flex items-center justify-between bg-slate-300 m-2 px-4 py-2 rounded-xl">
      <figure className="flex items-center">
        <UserIcon />
        <section>
          <h3 className="font-semibold text-xl">Bienvenido <span>{name}</span><span>{lastName}</span></h3>
          <div className="flex ">
            <p style={{ fontSize: '10px' }}>{username}</p>
            <p className="pl-2" style={{ fontSize: '10px' }}>{id}</p>
          </div>
        </section>
      </figure>

      <button id="close session" className="flex flex-col items-center text-center">
        <CloseSession />
        <p>Cerrar Session</p>
      </button>
    </nav >
  )
}