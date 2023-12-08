import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './componentes/Login/Login';
import Inicio from './componentes/Inicio/Inicio';
import Calendario from './componentes/ventanaCalendario/ventanaCalendario'
import Panel from './componentes/ventanaPanel/ventanaPanel'
import Registro from './componentes/Registro/Registro';
import Sprints from './componentes/ventanaSprints/ventanaSprints';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/sprints" element={<Sprints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
