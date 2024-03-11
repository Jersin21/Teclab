import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { analisysVerRoute } from "../utils/APIroute";
import axios from "axios";
import FormVerAnalisys from "./FormVerAnalisys";
import PDF from "./PDF";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const FormContainer = styled.div`
  margin-left: 250px;
  margin-top: 10px;
  padding: 20px;
  background-color: #1a1a2e;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: auto;
  margin: 0;
`;
const ButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const DownloadButton = styled.button`
  position: fixed;
  top: 50px;
  right: 150px; 
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #2980b9;
  }
`;

const BackButton = styled.button`
  position: fixed;
  top: 50px;
  right: 20px; 
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #45a049;
  }

  svg {
    margin-right: 5px;
  }
`;


const FormVer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [images, setImages] = useState([]);
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    async function fetchAnalisis() {
      const res = await axios.get(`${analisysVerRoute}/${params.id}`, config);
      setData(res.data);
    }
    fetchAnalisis();
  }, []);
  return (
    <>
      <FormContainer>
        <Sidebar></Sidebar>
        <h1>Ver Resultado de Análisis</h1>
        <BackButton onClick={() => navigate("/medico")}>
          Volver
        </BackButton>
        {data.solicitud?.solicituddetalles?.map((detalle) => (
          <FormVerAnalisys key={detalle.id} analisys={detalle} />
        ))}

        <ButtonContainer>
          <PDFDownloadLink
            document={<PDF data={data} />}
            fileName="analisis.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <DownloadButton disabled>Cargando..</DownloadButton>
              ) : (
                <DownloadButton>Descargar Resultado</DownloadButton>
              )
            }
          </PDFDownloadLink>
        </ButtonContainer>
      </FormContainer>
    </>
  );
};

export default FormVer;
