import React from "react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import styled from "styled-components";
import { medicoRoute } from "../utils/APIroute";
import { useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const FormularioMedicoContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background-color: #1a1a2e;

 

`;
const FormContainer = styled.div`
  padding: 20px;
  background-color: #1a1a2e;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* Ajusté la altura al 100% de la ventana */
  overflow-y: auto; /* Habilité el desplazamiento vertical si es necesario */
`;

const FormularioMedico = styled.form`
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

  input {
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

const RegisterDoctor = () => {
  const [medico, setMedico] = useState({
    nombre: "",
    celular: "",
    especialidad: "",
    email: "",
    usuario: "",
    password: "",
  });
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-right",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 3000,
    theme: "dark",
  };
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedico({ ...medico, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(medicoRoute, medico,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true){
        toast.success(data.msg, toastOptions)
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }
  
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <FormContainer>
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
              name="celular"
              value={medico.celular}
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
            Email:
            <input
              type="text"
              name="email"
              value={medico.email}
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
            Password:
            <input
              type="password"
              name="password"
              value={medico.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Crear Médico</button>
        </FormularioMedico>
      </FormularioMedicoContainer>
      <ToastContainer transition={Flip}/>
      </FormContainer>
    </>
  );
};

export default RegisterDoctor;
