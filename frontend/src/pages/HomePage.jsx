import React from 'react'
import Sidebar from '../components/Sidebar'
import useAuth from "../hooks/authHooks";
import styled from 'styled-components';

const HomepageContainer = styled.div`
  display: flex;
  height: 100vh; /* Altura total de la ventana */
  background-color: #25136a; /* Color de fondo del Sidebar y del contenido */
  overflow-x: hidden;
  padding: 20px; /* Espaciado interior */
  margin-left: 250px; /* Ancho del Sidebar */
  color: white;


`;
export default function  Homepage() {
  const { auth } = useAuth();

  return (<>
  <HomepageContainer/>
  <Sidebar/>
  <h1>Bienvenido {auth.username}</h1>
<HomepageContainer/>
  </>
  )
}
