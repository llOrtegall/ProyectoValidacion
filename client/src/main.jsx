import { createRoot } from 'react-dom/client'
import { StrictMode } from "react";
import { AuthContextProvider } from "./auth/AuthContext.jsx";
import { App } from "./App.jsx";
import './index.css'



const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>
)
