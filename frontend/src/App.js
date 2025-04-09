// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulario from './Formulario';
import Grafica from './Grafica';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Grafica />} />
        <Route path="/votacion" element={<Formulario />} />
      </Routes>
    </Router>
  );
}

export default App;
