import { useEffect, useState } from "react";
import { getData } from "../services/getDataUser.js";

export function RenderUsuarios() {
  const [user, setUser] = useState([])

  useEffect(() => {
    getData()
      .then(data => { setUser(data) }
      )
      .catch(err => {
        console.log('Error: ', err)
      })
  }, [])

  return (
    <section>
      {user.length > 0
        ? user.map()}
    </section>
  )
}