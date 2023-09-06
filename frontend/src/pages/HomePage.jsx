import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table'



// Estilos para el contenedor principal de la página
const HomepageContainer = styled.div`
  display: flex;
  height: 100vh; /* Altura total de la ventana */
  background-color: #0c0c0c; /* Color de fondo del Sidebar y del contenido */
`;

// Estilos para el sidebar (previamente definido)

// Estilos para el contenido principal
const ContentContainer = styled.div`
  flex: 1; /* Hace que el contenido principal ocupe todo el espacio disponible */
  padding: 20px; /* Espaciado interior */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinéalo a la izquierda */
  justify-content: flex-start; /* Alinéalo hacia arriba */
  margin: 20px; /* Margen exterior */
`;

// Estilos para la tabla (previamente definido)

const Homepage = () => {
  // Datos inventados para la tabla
  const data = [
    { nombre: 'Juan', apellido: 'Pérez', especialidad: 'Médico', ciudad: 'Lima' },
    { nombre: 'Ana', apellido: 'Gómez', especialidad: 'Enfermera', ciudad: 'Cusco' },
    { nombre: 'Carlos', apellido: 'Rodríguez', especialidad: 'Dentista', ciudad: 'Arequipa' },
  ];

  return (
    <HomepageContainer>
      <Sidebar />
      <ContentContainer>
        {/* Contenido principal */}
        <Table data={data} />
      </ContentContainer>
    </HomepageContainer>
  );
};

export default Homepage;
