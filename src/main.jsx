import { createRoot } from 'react-dom/client'
// import { App } from './App.jsx'
// import './index.css'

// import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from './Auth/AuthContext.jsx'

import { App2 } from './source/App2.jsx'

createRoot(document.getElementById('root')).render(
  <App2 />

  // <BrowserRouter>
  //   <AuthProvider>
  //     <App />
  //   </AuthProvider>
  // </BrowserRouter>
)
