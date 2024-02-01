import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar.jsx'

import { Home } from './pages/Home.jsx'

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.withCredentials = true

export function App () {
  return (
    <BrowserRouter>

      <NavBar />

      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
