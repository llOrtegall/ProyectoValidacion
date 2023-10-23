import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from './routes/Login.jsx';
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { Dashboard } from "./Components/Dashboard.jsx";
import { createRoot } from 'react-dom/client'
import { StrictMode } from "react";
import './index.css'
import { AuthContextProvider } from "./auth/AuthContext.jsx";


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

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
)
