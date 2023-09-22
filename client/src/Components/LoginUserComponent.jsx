import { CloseSession, UserIcon } from "./IconsSvg";

export function LoginUserComponent() {

  // const { id, lastName, name, username } = info

  return (
    <nav className="flex items-center justify-between bg-slate-300 m-2 px-4 py-2 rounded-xl">
      <figure className="flex items-center">
        <UserIcon />
        <section>
          <h3 className="font-semibold text-xl">Bienvenido <span>Ivan</span><span>Garzon</span></h3>
          <div className="flex ">
            <p style={{ fontSize: '10px' }}>CP11183075234523</p>
            <p className="pl-2" style={{ fontSize: '10px' }}>nfw7run238uhrh3nru23bn0782yb0upnf8wyebf08web</p>
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