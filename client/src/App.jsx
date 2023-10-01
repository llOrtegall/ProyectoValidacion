import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from './routes/Login.jsx';
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { Dashboard } from "./Components/Dashboard.jsx";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [{
      path: "/dashboard",
      element: <Dashboard />
    }]
  }
])

export function App() {
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials = true;
  return (
    <RouterProvider router={router} />
  )
}