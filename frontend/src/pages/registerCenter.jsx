import React from "react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { centerRoute } from "../utils/APIroute";
import { useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormContainer = styled.div`
  padding: 20px;
  background-color: #1a1a2e;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* Ajusté la altura al 100% de la ventana */
  overflow-y: auto; /* Habilité el desplazamiento vertical si es necesario */
`;

const FormularioCentroMedicoContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const FormularioCentroMedico = styled.form`
  padding: 20px;
  background-color: #1a1a2e;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 10px;

  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  input,
  textarea {
    padding: 10px;
    border: 1px solid white;
    border-radius: 5px;
    background-color: #292a44;
    color: white;
    box-sizing: border-box;
  }

  button {
    padding: 15px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
`;
function RegisterCenter() {
  const [centroMedico, setCentroMedico] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    especialidades: "",
  });
  const navigate = useNavigate()
  const toastOptions =  {
    position: "top-right",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 3000,
    theme: "dark",
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCentroMedico({ ...centroMedico, [name]: value });
  };
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if (handleValidation()) {
    const { nombre, direccion, telefono, especialidades,responsable,password } = centroMedico;
    const { data } = await axios.post(
      centerRoute,
      {
        nombre,
        direccion,
        telefono,
        especialidades,
        responsable,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if(data.status === true){
      toast.success(data.msg, toastOptions)
      setTimeout(() => {
        navigate("/")
      }, 1000);
    }

  };
  return (
    <>
      <Sidebar />
      <FormContainer>
      <FormularioCentroMedicoContainer>
        <FormularioCentroMedico onSubmit={handleSubmit}>
          <label>
            Nombre del Centro Médico:
            <input
              type="text"
              name="nombre"
              value={centroMedico.nombre}
              onChange={handleChange}
            />
          </label>

          <label>
            Dirección:
            <input
              type="text"
              name="direccion"
              value={centroMedico.direccion}
              onChange={handleChange}
            />
          </label>

          <label>
            Teléfono:
            <input
              type="text"
              name="telefono"
              value={centroMedico.telefono}
              onChange={handleChange}
            />
          </label>
          <label>
            Responsable:
            <input
              type="text"
              name="responsable"
              value={centroMedico.responsable}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={centroMedico.password}
              onChange={handleChange}
            />
          </label>

          <label>
            Descripción de las Especialidades:
            <textarea
              name="especialidades"
              value={centroMedico.especialidades}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Registrar Centro Médico</button>
        </FormularioCentroMedico>
      </FormularioCentroMedicoContainer>
      <ToastContainer transition={Flip}/>
      </FormContainer>
    </>
  );
}

export default RegisterCenter;
