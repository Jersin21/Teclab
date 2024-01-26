import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { analisysRoute } from "../utils/APIroute";
import axios from "axios";
import useAuth from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";

const MedicoPage = () => {
  const navigate = useNavigate();

  const {
    auth: { idTipoUsuario },
  } = useAuth();
  const [data, setData] = useState([]);
  if (idTipoUsuario !== 5) {
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (!token) {
      navigate("/login");
    }

    async function fetchData() {
      try {
        const response = await axios.get(analisysRoute, config);
        setData(response.data);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
    fetchData();
  }, [idTipoUsuario, navigate]);

  return (
    <HomepageContainer>
      <Sidebar />
      <ContentContainer>
        <TableContainer>
          <Table data={data} />
        </TableContainer>
      </ContentContainer>
    </HomepageContainer>
  );
};
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
export default MedicoPage;
