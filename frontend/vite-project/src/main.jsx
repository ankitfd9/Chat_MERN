import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContextProvider.jsx'
import { SocketProvider } from './context/SocketContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)
