import axios from "axios";
import { RegisterAndLoginForm } from "./RegisterAndLoginForm.jsx";
import { Dashboard } from "./Components/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./Components/ProtectedRoute.jsx";
import { BrowserRouter } from "react-router-dom";


export function App() {

  axios.defaults.baseURL = 'http://localhost:3000'
  axios.defaults.withCredentials = true;

  return (
    <BrowserRouter>7
      <Routes>
        <Route path="/" element={<RegisterAndLoginForm />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>

  )
}