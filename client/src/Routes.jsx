import { useContext } from "react";
import { RegisterAndLoginForm } from "./RegisterAndLoginForm";
import { UserContext } from "./User.context";

export default function Routes() {
  const { username, name, id } = useContext(UserContext)

  if (username) {
    return 'Welcome: ' + name + ' ID: ' + id;
  }

  return (
    <RegisterAndLoginForm />
  )
}