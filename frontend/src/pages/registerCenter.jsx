import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { centerRoute } from "../utils/APIroute";
import { useNavigate, useParams } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const FormContainer = styled.div`
  padding: 20px;
  background-color: #1a1a2e;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: auto;
`;

const FormularioCentroMedicoContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;
const BackButton = styled.button`
  position: absolute;
  top: 20px;
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
    name: "",
    direccion: "",
    telefono: "",
    especialidades: "",
    responsable: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCentroMedico({ ...centroMedico, [name]: value });
  };
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  const params = useParams();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, direccion, telefono, especialidades, responsable, password } =
      centroMedico;

    if (!params.id) {
      if (
        !name ||
        !direccion ||
        !especialidades ||
        !telefono ||
        !responsable ||
        !password
      ) {
        toast.error("Por favor, completa todos los campos.", toastOptions);
        return;
      }
    } else {
      if (!name || !direccion || !especialidades || !telefono) {
        toast.error("Por favor, completa todos los camposs.", toastOptions);
        return;
      }
    }
    try {
      if (!params.id) {
        const {
          name,
          direccion,
          telefono,
          especialidades,
          responsable,
          password,
        } = centroMedico;
        const { data } = await axios.post(
          centerRoute,
          {
            name,
            direccion,
            telefono,
            especialidades,
            responsable,
            password,
          },
          config
        );
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          toast.success(data.msg, toastOptions);
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        }
      } else {
        const { data } = await axios.put(
          `${centerRoute}/${params.id}`,
          centroMedico,
          config
        );
        if (data.status === true) {
          toast.success("Se actualizo el centro", toastOptions);
          setTimeout(() => {
            window.location.href = "/admin";
          }, 800);
        } else {
          toast.error("No se pudo actualizar el centro", toastOptions);
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
        const res = await axios.get(`${centerRoute}/${params.id}`, config);
        const centroData = res.data;
        setCentroMedico(centroData);
      } catch (error) {
        console.error("Error al obtener los datos del médico:", error);
      }
    }
  }, [params.id]);
  return (
    <>
      <Sidebar />
      <FormContainer>
        <FormularioCentroMedicoContainer>
          <FormularioCentroMedico onSubmit={handleSubmit}>
            <BackButton onClick={() => navigate("/admin")}>Volver</BackButton>
            <label>
              Nombre del Centro Médico:
              <input
                type="text"
                name="name"
                value={centroMedico.name}
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
            {!params.id && (
              <>
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
              </>
            )}
            <label>
              Descripción de las Especialidades:
              <textarea
                name="especialidades"
                value={centroMedico.especialidades}
                onChange={handleChange}
              />
            </label>
            <button type="submit">
              {params.id ? "Actualizar centro médico" : "Crear centro médico"}
            </button>
          </FormularioCentroMedico>
        </FormularioCentroMedicoContainer>
        <ToastContainer />
      </FormContainer>
    </>
  );
}

export default RegisterCenter;
