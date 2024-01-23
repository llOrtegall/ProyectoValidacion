import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Auth/AuthContext.jsx'

// import { App2 } from './source/App2.jsx'
// <App2 />

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
