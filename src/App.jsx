import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.withCredentials = true

export function App () {
  return (
    <h1>App</h1>
  )
}
