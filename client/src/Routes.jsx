import { useContext } from "react";
import { Login } from "./Login";
import { UserContext } from "./User.context";

export default function Routes() {
  const { username, id } = useContext(UserContext)

  if (username) {
    return 'logged in';
  }

  return (
    <Login />
  )
}