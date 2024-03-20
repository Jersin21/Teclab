import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/authHooks";
import styled from "styled-components";
import axios from "axios";
import { centerRoute } from "../utils/APIroute";

const HomepageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1a1a2e;
  overflow-x: hidden;
  padding: 20px;
  margin-left: 250px;
  color: white;
`;

const ContentContainer = styled.div`
  flex: 1;
`;
const Homepage = () => {
  const { auth } = useAuth();
  const [clinica, setClinica] = useState({});
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const idTipoUsuario = auth.idTipoUsuario;

  useEffect(() => {
    if (auth.idClinica && idTipoUsuario !== 1) {
      fetchClinica();
    } else {
      setLoading(false); 
    }
  }, [auth.idClinica, idTipoUsuario]); 

  async function fetchClinica() {
    try {
      const { data } = await axios.get(`${centerRoute}/${auth.idClinica}`, config);
      setClinica(data);
      setLoading(false); 
    } catch (error) {
      console.error("Error al obtener datos de la clínica:", error);
      setLoading(false); 
    }
  }

  return (
    <>
      <HomepageContainer>
        <Sidebar />
        <ContentContainer>
          {idTipoUsuario !== 1 && !loading && clinica.id && (
            <>
              <h1>Bienvenido a Clinica {clinica.name}</h1>
              <h3>Bienvenido {auth.username}</h3>
            </>
          )}
        </ContentContainer>
      </HomepageContainer>
    </>
  );
};
  
  export default Homepage;
