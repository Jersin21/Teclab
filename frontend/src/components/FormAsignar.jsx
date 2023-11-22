import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { medicoRoute, recepcionistaRoute } from "../utils/APIroute";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const FormContainer = styled.div`
  margin-left: 300px; /* Ancho del Sidebar */
  margin-top: 30px; /* Ancho del Sidebar */
  display: flex;
`;

const FormAsignar = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [medicos, setMedicos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState("");

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await axios.get(medicoRoute);
        const medicos = response.data;
        setMedicos(medicos);
        console.log(medicos)
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicos();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { data } = await axios.put(`${recepcionistaRoute}/${params.id}`, {
      idUsuarioLab: medicoSeleccionado,
    });
    e.target.reset();
    navigate("/recepcionista");
  };

  return (
    <div>
      <FormContainer>
        <Sidebar />

        <h1>Asignar médico</h1>
        <form onSubmit={handleSubmit}>
          <select
            name=""
            onChange={(e) => {
              setMedicoSeleccionado(e.target.value);
            }}
          >
            <option value="">Seleccione un responsable</option>
            {medicos.map((medicos) => (
              <option id={medicos.id} value={medicos.User.id}>
                {medicos.User.persona.nombre} {medicos.User.persona.apellidos}
              </option>
            ))}
          </select>
          <button type="submit">Asignar</button>
        </form>
      </FormContainer>
    </div>
  );
};

export default FormAsignar;
