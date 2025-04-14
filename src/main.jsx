import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Ojo: debe ser 'react-router-dom'
import App from './App.jsx';
import './index.css'; // Tailwind debe estar aquí

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/* Aquí adentro va toda la lógica de rutas */}
    </BrowserRouter>
  </React.StrictMode>
);


