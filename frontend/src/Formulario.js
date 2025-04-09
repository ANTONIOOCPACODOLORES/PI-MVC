import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Formulario = () => {
  const [selectedProyecto, setSelectedProyecto] = useState('');
  const [puntaje, setPuntaje] = useState(0);
  const [equipos, setEquipos] = useState([]);
  const [puntajeManual, setPuntajeManual] = useState('');  // Para manejar el puntaje ingresado manualmente

  // Lista de equipos con logos y puntajes iniciales
  const equiposData = [
    { name: 'BrightBloom', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Glow.png' }},
    { name: 'SmartPet Solutions', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Meow.jpg' }},
    { name: 'XicoWeb', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Ixaya.jpeg' }},
    { name: 'BDMatrix', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Gym.png' }},
    { name: 'Violet', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Dimen.png' }},
    { name: 'Xicolab', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Xicolab.png' }},
    { name: 'MediTech', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_PillBox.png' }},
    { name: 'Virtall', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_iHome.png' }},
    { name: 'DreamStudios', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Iris.png' }},
    { name: 'SabeRed', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Sabores.png' }},
    { name: 'MedikOS', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_MedikOS.jpg' }}
  ];

  useEffect(() => {
    // Cuando el componente se monta
    setEquipos(equiposData);

    // Escuchar eventos de socket
    socket.on('conexionInicial', (data) => {
      setEquipos(data);
    });

    socket.on('puntajeActualizado', (data) => {
      setEquipos(data);

      // Si el usuario ya seleccionó un proyecto, actualiza el puntaje mostrado
      const proyecto = data.find((e) => e.name === selectedProyecto);
      if (proyecto) {
        setPuntaje(proyecto.puntaje);
      }
    });

    return () => {
      socket.off('conexionInicial');
      socket.off('puntajeActualizado');
    };
  }, [selectedProyecto]);

  const handleProyectoChange = (event) => {
    const proyectoSeleccionado = event.target.value;
    setSelectedProyecto(proyectoSeleccionado);

    const proyecto = equipos.find((e) => e.name === proyectoSeleccionado);
    if (proyecto) {
      setPuntaje(proyecto.puntaje);
    }
  };

  // Cambiar el puntaje manual ingresado por el usuario
  const handlePuntajeChange = (event) => {
    setPuntajeManual(event.target.value);
  };

  // Registrar el puntaje manual
  const handleRegistrarPuntaje = () => {
    if (selectedProyecto !== '' && puntajeManual !== '') {
      const index = equipos.findIndex((equipo) => equipo.name === selectedProyecto);
      socket.emit('registrarPuntajeManual', { index, puntaje: parseInt(puntajeManual) });
    } else {
      alert("Por favor, selecciona un proyecto y proporciona un puntaje.");
    }
  };

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      padding: '1.5rem',
      borderRadius: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      margin: '2rem auto',
      textAlign: 'center',
      maxWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
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

      <label htmlFor="puntajeInput" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
        Ingresa el Puntaje Manual:
      </label>
      <input
        type="number"
        id="puntajeInput"
        value={puntajeManual}
        onChange={handlePuntajeChange}
        style={{
          padding: '8px',
          fontSize: '15px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '100%',
          marginBottom: '1rem'
        }}
      />

      <button
        onClick={handleRegistrarPuntaje}
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
