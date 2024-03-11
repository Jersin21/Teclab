import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import {centerRoute, getmedicoRoute } from "../utils/APIroute";
import styled from "styled-components";
import useAuth from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import TableCentros from "../components/TableCentros";

function AdminPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
    const {
      auth: { idTipoUsuario, isLoading },
    } = useAuth();
  
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const [clinicas, setClinicas] = useState([]);
  
    if (idTipoUsuario !== 2) {
      navigate("/");
    }
    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
      async function fectData() {
        const resClinica = await axios.get(centerRoute,config);
        setClinicas(resClinica.data);
      }
      fectData();
    }, [idTipoUsuario, isLoading, navigate]);
  

    return (
        <HomepageContainer>
          <Sidebar />
          <ContentContainer>
            <TableContainer>
              <TableCentros data={clinicas} config={config} />
            </TableContainer>
          </ContentContainer>
        </HomepageContainer>
      );
}

const HomepageContainer = styled.div`
  display: flex;
  height: 100vh; /* Altura total de la ventana */
  background-color: #25136a; /* Color de fondo del Sidebar y del contenido */
  overflow-x: hidden;
`;

// Estilos para el contenido principal
const ContentContainer = styled.div`
  flex-grow: 1; /* Hace que el contenido principal ocupe todo el espacio disponible */
  padding: 20px; /* Espaciado interior */
  flex-direction: column;
  align-items: flex-start; /* Alinéalo a la izquierda */
  justify-content: flex-start; /* Alinéalo hacia arriba */
  margin: 20px; /* Margen exterior */
`;

const TableContainer = styled.div`
  background-color: #25136a; // Cambia el color de fondo según tu preferencia
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); // Agrega sombra si lo deseas
`;
export default AdminPage