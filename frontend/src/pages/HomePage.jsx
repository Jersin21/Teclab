import React from 'react';
import Sidebar from '../components/Sidebar';
import useAuth from "../hooks/authHooks";
import styled from 'styled-components';

const HomepageContainer = styled.div`
  display: flex;
  height: 100vh; /* Altura total de la ventana */
  background-color: #1a1a2e;
  overflow-x: hidden;
  padding: 20px; /* Espaciado interior */
  margin-left: 250px; /* Ancho del Sidebar */
  color: white;
`;

const ContentContainer = styled.div`
  flex: 1; /* Toma el espacio restante */
`;

export default function Homepage() {
  const { auth } = useAuth();

  return (
    <>
      <HomepageContainer>
        <Sidebar />
        <ContentContainer>
          <h1>Bienvenido {auth.username}</h1>
        </ContentContainer>
      </HomepageContainer>
    </>
  );
}
