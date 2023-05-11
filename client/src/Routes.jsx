import { useContext } from "react";
import { RegisterAndLoginForm } from "./RegisterAndLoginForm";
import { UserContext } from "./User.context";
import { Dashboard } from "./Components/Dashboard";

export default function Routes() {

  const { username, name, id, apellidos } = useContext(UserContext)

  if (username) {
    return (<Dashboard />)
  }

  return (
    <RegisterAndLoginForm />
  )
}