import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { AuthProvider } from './context/AuthContent.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
