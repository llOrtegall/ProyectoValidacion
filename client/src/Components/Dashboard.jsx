import { LoginUserComponent } from "../Components/LoginUserComponent.jsx";
import { RenderUsuarios } from "./RenderUsuarios.jsx";

export function Dashboard({ infoUser }) {

  return (
    <>
      <LoginUserComponent info={infoUser} />
      <RenderUsuarios />
    </>

  )
}