import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import FormAnalisysSubir from "./FormAnalisysSubir";

import {
  analisysRoute,
  categoriasRoute,
  tipoanalisysRoute,
} from "../utils/APIroute";
import Sidebar from "./Sidebar";

const FormContainer = styled.div`
  margin-left: 250px; /* Ancho del Sidebar */
  margin-top: 30px; /* Ancho del Sidebar */
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const FormSubir = () => {
  const toastOptions = {
    position: "top-right",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 3000,
    theme: "dark",
  };
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fechAnalisis() {
      const res = await axios.get(`${categoriasRoute}/${params.id}`);
      setData(res.data);
    }
    fechAnalisis();
  }, []);

 

  return (
    <>
    <FormContainer>
      <Sidebar />
      <h1>Subir Resultado de Análisis</h1>
      <AnalysisListContainer>
        {data.solicitud?.solicituddetalles?.map((detalle, index) => (
          <FormAnalisysSubir
            key={index}
            category={detalle.analisis.categorium.name}
            analysis={detalle}
          />
        ))}
      </AnalysisListContainer>
      <ToastContainer />
    </FormContainer>
    </>
  );
};
const AnalysisListContainer = styled.div`
  max-height: 400px; /* Altura máxima del contenedor antes de mostrar la barra de desplazamiento */
  overflow-y: auto;  /* Mostrar barra de desplazamiento vertical cuando sea necesario */
  margin-left: 20px; /* Ajusta según sea necesario para el margen izquierdo */
  margin-right: 20px; /* Ajusta según sea necesario para el margen derecho */
`;

export default FormSubir;
