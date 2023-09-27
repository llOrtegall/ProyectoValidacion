import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterAndLoginForm } from './routes/RegisterAndLoginForm.jsx';
import { Dashboard } from "./Components/Dashboard.jsx";
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { StrictMode } from "react";
import './index.css'
import { AuthProvider } from './auth/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterAndLoginForm />
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
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
