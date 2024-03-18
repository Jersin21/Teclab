import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TableRecepcionista from "../components/TableRecepcionista";
import axios from "axios";
import { analisysRoute, getmedicoRoute, recepcionistaRoute } from "../utils/APIroute";
import styled from "styled-components";
import useAuth from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";

function RecepcionistaPage() {
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
  const [data, setData] = useState([]);
  const [medico, setMedico] = useState([]);

  if (idTipoUsuario !== 7) {
    navigate("/");
  }
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    async function fectData() {
      const res = await axios.get(recepcionistaRoute, config);
      setData(res.data);
      const resMedico = await axios.get(getmedicoRoute,config);
      setMedico(resMedico.data);
      console.log(res.data)
      console.log(resMedico.data)
    }
    fectData();
  }, [idTipoUsuario, isLoading, navigate]);

  return (
    <HomepageContainer>
      <Sidebar />
      <ContentContainer>
        <TableContainer>
          <TableRecepcionista data={data} config={config} />
        </TableContainer>
      </ContentContainer>
    </HomepageContainer>
  );
}
const HomepageContainer = styled.div`
  display: flex;
  height: 100vh; 
  background-color: #25136a; 
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  flex-grow: 1; 
  padding: 20px; 
  flex-direction: column;
  align-items: flex-start; 
  justify-content: flex-start; 
  margin: 20px; 
`;

const TableContainer = styled.div`
  background-color: #25136a; 
  padding: 1rem;
  border-radius: 1rem;
`;
export default RecepcionistaPage;
