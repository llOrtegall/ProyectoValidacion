import { useContext } from "react";
import { RegisterAndLoginForm } from "./RegisterAndLoginForm";
import { UserContext } from "./User.context";

export default function Routes() {
  const { username, name } = useContext(UserContext)

  if (username) {
    return 'Welcome: ' + name;
  }

  return (
    <RegisterAndLoginForm />
  )
}