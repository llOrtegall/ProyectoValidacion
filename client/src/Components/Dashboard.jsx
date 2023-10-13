import { LoginUserComponent } from "../Components/LoginUserComponent.jsx";

export function Dashboard({ name, id, apellidos }) {

  return (
    <>
      <LoginUserComponent name={name} id={id} apellidos={apellidos} />
      <section>
        Este Es la Dashboard
      </section>
    </>

  )
}