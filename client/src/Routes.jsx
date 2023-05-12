import { RegisterAndLoginForm } from "./RegisterAndLoginForm";
import { Dashboard } from "./Components/Dashboard";
import { useContext } from "react";
import { UserContext } from "./User.context";

export default function Routes() {

  const { username, id, name, lastName } = useContext(UserContext)

  if (username) {
    return (<Dashboard infoUser={{ username, id, name, lastName }} />)
  }

  return (
    <RegisterAndLoginForm />
  )
}