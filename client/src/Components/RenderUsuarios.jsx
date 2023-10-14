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
    <div>
      <h2>{console.log(user)}</h2>
    </div>
  )
}