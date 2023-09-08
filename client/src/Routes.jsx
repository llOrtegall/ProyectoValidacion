import { useContext } from "react";
import { Login } from "./Login";
import { UserContext } from "./User.context";

export default function Routes() {
  const { username, name } = useContext(UserContext)

  if (username) {
    return 'Welcome: ' + name;
  }

  return (
    <Login />
  )
}