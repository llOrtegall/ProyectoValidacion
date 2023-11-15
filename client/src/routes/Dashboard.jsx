// import { ChangedPassword } from '../Components/ChangedPasword.jsx'
import { LoginUserComponent } from '../Components/LoginUserComponent.jsx'
import { RenderUsuarios } from '../Components/RenderUsuarios.jsx'

// eslint-disable-next-line react/prop-types
export function Dashboard () {
  return (
    <>
      <LoginUserComponent />
      <RenderUsuarios />
      {/* <ChangedPassword /> */}
    </>
  )
}
