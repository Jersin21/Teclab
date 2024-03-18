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
  
    if (idTipoUsuario !== 1) {
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
export default AdminPage