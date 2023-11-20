import axios from "axios";
import React, { useState, useEffect } from "react";
import { medicoRoute } from "../utils/APIroute";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const FormContainer = styled.div`
  margin-left: 250px; /* Ancho del Sidebar */
  display: flex;
`;

const FormAsignar = ({ solicitud }) => {
  const [medicos, setMedicos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState("");

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await axios.get(medicoRoute);
        const medicos = response.data;
        setMedicos(medicos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicos();
  }, []);

  return (
    <div>
      <FormContainer>
        <Sidebar />

        <h1>Asignar médico</h1>
        <form>
          <select
            name=""
            onChange={(e) => setMedicoSeleccionado(e.target.value)}
          >
            {medicos.map((medicos) => (
              <option id={medicos.id} value={medicos.User.persona.nombre}>
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
