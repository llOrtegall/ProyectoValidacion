import { LoginUserComponent } from "../Components/LoginUserComponent.jsx";
import { RenderUsuarios } from "./RenderUsuarios.jsx";

export function Dashboard({ name, id, apellidos }) {

  return (
    <>
      <LoginUserComponent name={name} id={id} apellidos={apellidos} />
      <RenderUsuarios />
    </>

  )
}