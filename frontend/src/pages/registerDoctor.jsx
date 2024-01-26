import React from "react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import styled from "styled-components";

const FormularioMedicoContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  margin-left: 250px; /* Ancho del Sidebar */
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const FormularioMedico = styled.form`
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  input {
    padding: 5px;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }
`;

const RegisterDoctor = () => {
  const [medico, setMedico] = useState({
    nombre: "",
    telefono: "",
    especialidad: "",
    usuario: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedico({ ...medico, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos a tu servidor o realizar la lógica necesaria
    console.log("Datos del médico:", medico);
  };

  return (
    <>
      <Sidebar />
      <FormularioMedicoContainer>
        <FormularioMedico onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={medico.nombre}
              onChange={handleChange}
            />
          </label>

          <label>
            Teléfono:
            <input
              type="text"
              name="telefono"
              value={medico.telefono}
              onChange={handleChange}
            />
          </label>

          <label>
            Especialidad:
            <input
              type="text"
              name="especialidad"
              value={medico.especialidad}
              onChange={handleChange}
            />
          </label>

          <label>
            Usuario:
            <input
              type="text"
              name="usuario"
              value={medico.usuario}
              onChange={handleChange}
            />
          </label>

          <label>
            Contraseña:
            <input
              type="password"
              name="contraseña"
              value={medico.contraseña}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Crear Médico</button>
        </FormularioMedico>
      </FormularioMedicoContainer>
    </>
  );
};

export default RegisterDoctor;
