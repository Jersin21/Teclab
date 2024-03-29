import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { medicoRoute } from "../utils/APIroute";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
  height: 100vh;
  overflow-y: auto;
`;
const BackButton = styled.button`
  position: relative;
  top: 10px;
  bottom: 20px;
  left: 500px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-items: center;

  &:hover {
    background-color: #45a049;
  }

  svg {
    margin-right: 5px;
  }
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
const FormHeader = styled.h1`
  margin-bottom: 20px;
  padding-left: 100px;
  color: white;
  align-items: center;
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
  const params = useParams();
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const toastOptions = {
    position: "top-right",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 3000,
    theme: "dark",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedico({ ...medico, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, celular, especialidad, email, usuario, password } = medico;

    if (!params.id) {
      if (
        !nombre ||
        !celular ||
        !especialidad ||
        !email ||
        !usuario ||
        !password
      ) {
        toast.error("Por favor, completa todos los campos.", toastOptions);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Por favor, ingresa un email válido.", toastOptions);
        return;
      }
    } else {
      if (!nombre || !celular || !especialidad || !email || !usuario) {
        toast.error("Por favor, completa todos los camposs.", toastOptions);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Por favor, ingresa un email válido.", toastOptions);
        return;
      }
    }

    try {
      if (!params.id) {
        const { data } = await axios.post(medicoRoute, medico, config);

        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          toast.success("Se ha creado al medico", toastOptions);
          setTimeout(() => {
            window.location.href = "/medicos";
          }, 800);
        }
      } else {
        const { data } = await axios.put(
          `${medicoRoute}/${params.id}`,
          medico,
          config
        );
        if (data.status === true) {
          toast.success("Se actualizo el medico", toastOptions);
          setTimeout(() => {
            window.location.href = "/medicos";
          }, 800);
        } else {
          toast.error("No se pudo actualizar el medico", toastOptions);
          setTimeout(() => {
            window.location.href = "/medicos";
          }, 800);
        }
      }
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
    }
  };
  useEffect(() => {
    if (params.id) {
      fetchTask();
    }
    async function fetchTask() {
      try {
        const res = await axios.get(`${medicoRoute}/${params.id}`, config);
        const medicoData = res.data;
        const { especialidad, User } = medicoData;
        const { id: userid, email, username, password, persona } = User;
        const { id: personaid, nombre, celular } = persona;
        setMedico({
          nombre,
          celular,
          especialidad,
          email,
          userid,
          personaid,
          usuario: username,
          password,
        });
      } catch (error) {
        console.error("Error al obtener los datos del médico:", error);
      }
    }
  }, [params.id]);

  return (
    <>
      <Sidebar />
      <FormContainer>
        <FormularioMedicoContainer>
          <BackButton onClick={() => navigate("/medicos")}>Volver</BackButton>
          <FormHeader>
            {params.id ? "Actualizar Medico" : "Nuevo Medico"}
          </FormHeader>
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
            {!params.id && (
              <>
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
              </>
            )}
            <button type="submit">
              {params.id ? "Actualizar Médico" : "Crear Médico"}
            </button>
          </FormularioMedico>
        </FormularioMedicoContainer>
        <ToastContainer />
      </FormContainer>
    </>
  );
};

export default RegisterDoctor;
