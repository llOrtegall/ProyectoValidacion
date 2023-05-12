import { useContext } from "react";
import { RegisterAndLoginForm } from "./RegisterAndLoginForm";
import { UserContext } from "./User.context";
import { Dashboard } from "./Components/Dashboard";

export default function Routes() {

  const { username, id, name, lastName } = useContext(UserContext)

  if (username) {
    return (<Dashboard inf={{ username, id, name, lastName }} />)
  }

  return (
    <RegisterAndLoginForm />
  )
}