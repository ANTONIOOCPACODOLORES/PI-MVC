import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Formulario = ({ equipos }) => {
  const [selectedProyecto, setSelectedProyecto] = useState('');
  const [puntaje, setPuntaje] = useState(0);

  const handleProyectoChange = (event) => {
    const proyectoSeleccionado = event.target.value;
    setSelectedProyecto(proyectoSeleccionado);

    const proyecto = equipos.find((equipo) => equipo.name === proyectoSeleccionado);
    if (proyecto) {
      setPuntaje(proyecto.puntaje);
    }
  };

  const handleAumentarPuntaje = () => {
    if (selectedProyecto !== '') {
      const index = equipos.findIndex((equipo) => equipo.name === selectedProyecto);
      const proyecto = equipos[index];

      if (proyecto && proyecto.puntaje < 40) {
        socket.emit('aumentarPuntaje', index);
      }
    }
  };

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      padding: '1.5rem',
      borderRadius: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      margin: '2rem auto',
      textAlign: 'center',
      maxWidth: '420px'
    }}>
      <h2 style={{ color: '#8b1e3b', marginBottom: '1rem', fontSize: '20px' }}>
        DEMOSTRACIÓN DE PROYECTOS INTEGRADORES
      </h2>
      <p style={{ fontWeight: 'bold', color: '#333', marginBottom: '1.2rem', fontSize: '14px' }}>
        DEL ÁREA DE TECNOLOGÍAS DE LA INFORMACIÓN
      </p>

      <label htmlFor="proyecto" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
        Selecciona un Proyecto:
      </label>
      <select
        id="proyecto"
        value={selectedProyecto}
        onChange={handleProyectoChange}
        style={{
          padding: '8px',
          fontSize: '15px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: '280px',
          marginBottom: '1rem'
        }}
      >
        <option value="">Seleccionar...</option>
        {equipos.map((equipo) => (
          <option key={equipo.name} value={equipo.name}>
            {equipo.name}
          </option>
        ))}
      </select>

      <div style={{ marginBottom: '1rem', fontSize: '15px', color: '#444' }}>
        <strong>Puntaje alcanzado:</strong> {puntaje}
      </div>

      <button
        onClick={handleAumentarPuntaje}
        style={{
          padding: '8px 16px',
          backgroundColor: '#8b1e3b',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '15px',
          transition: 'background 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#a52a4a'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#8b1e3b'}
      >
        Registrar Puntaje
      </button>
    </div>
  );
};

export default Formulario;
