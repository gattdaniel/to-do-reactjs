import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import  Authprovider  from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <App />
    </Authprovider>
    <ToastContainer/>
  </StrictMode>,
)
