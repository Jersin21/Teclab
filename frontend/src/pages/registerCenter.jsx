import React from "react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { centerRoute } from "../utils/APIroute";
import { useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormularioCentroMedicoContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const FormularioCentroMedico = styled.form`
  padding: 5px 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  input,
  textarea {
    padding: 5px;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
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
    const { nombre, direccion, telefono, especialidades } = centroMedico;
    const { data } = await axios.post(
      centerRoute,
      {
        nombre,
        direccion,
        telefono,
        especialidades,
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

      navigate("/")

    }
    //}
  };
  return (
    <>
      <Sidebar />
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

    </>
  );
}

export default RegisterCenter;
