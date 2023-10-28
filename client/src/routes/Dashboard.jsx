import { LoginUserComponent } from '../Components/LoginUserComponent.jsx'
import { RenderUsuarios } from '../Components/RenderUsuarios.jsx'

// eslint-disable-next-line react/prop-types
export function Dashboard ({ inf }) {
  const userLogin = inf

  return (
    <>
      <LoginUserComponent usuario={userLogin} />
      <RenderUsuarios />
    </>
  )
}
