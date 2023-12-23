import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { Home } from './pages/Home.jsx'
import { Items } from './pages/Items.jsx'

export function App() {
  return (
    <Routes>
      <Route path="/" element={< Layout />}>
        <Route path="home" element={< Home />}></Route>
        <Route path="items" element={< Items />}></Route>
      </Route>
      <Route path="*" element={<h1>Not Found</h1>}></Route>
    </Routes>
  )
}
