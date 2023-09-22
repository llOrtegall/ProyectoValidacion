import { Route, Routes, BrowserRouter } from "react-router-dom";
import { RegisterAndLoginForm } from "./RegisterAndLoginForm";
import { Dashboard } from "./Components/Dashboard.jsx";
import axios from "axios";


export function App() {

  // TODO: axios raiz
  axios.defaults.baseURL = 'http://localhost:3000'
  axios.defaults.withCredentials = true;

  return (
    <RegisterAndLoginForm />
  )
}