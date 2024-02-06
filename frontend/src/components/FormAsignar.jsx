import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { medicoRoute, recepcionistaRoute } from "../utils/APIroute";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
  background-color: #1a1a2e;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: auto;
`;

const FormHeader = styled.h1`
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  select {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid white;
    border-radius: 5px;
    background-color: #292a44;
    color: white;
    box-sizing: border-box;
  }

  button {
    width: 20%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
`;

const FormAsignar = () => {
  const params = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const [medicos, setMedicos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState("");
  const toastOptions = {
    position: "top-right",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 3000,
    theme: "dark",
  };
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await axios.get(medicoRoute, config);
        const medicos = response.data;
        setMedicos(medicos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicos();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${recepcionistaRoute}/${params.id}`,
        {
          idUsuarioLab: medicoSeleccionado,
        },
        config
      );
      e.target.reset();

      if (data.status === true) {
        toast.success("Se asignó exitosamente", toastOptions);
        setTimeout(() => {
          window.location.href = "/recepcionista";
        }, 1000);
      }
    } catch (error) {
      console.error(error);

      setTimeout(() => {
        toast.error("Error al asignar médico", toastOptions);
      }, 1000);
    }
  };

  return (
    <div>
      <FormContainer>
        <Sidebar />
        <FormHeader>Asignar médico</FormHeader>
        <StyledForm onSubmit={handleSubmit}>
          <select
            key="default"
            name=""
            onChange={(e) => {
              setMedicoSeleccionado(e.target.value);
            }}
          >
            <option key="default" value="">
              Seleccione un responsable
            </option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.persona.nombre}
              </option>
            ))}
          </select>
          <button type="submit">Asignar</button>
        </StyledForm>
      </FormContainer>
      <ToastContainer />
    </div>
  );
};

export default FormAsignar;
