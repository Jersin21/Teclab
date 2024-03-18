import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { analisysRoute, tipoanalisysRoute } from "../utils/APIroute";
import Sidebar from "./Sidebar";
import RadioButtonsContainer from "./RadiobuttonsContainer";

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
const FormHeader = styled.h1`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  label {
    margin-bottom: 5px;
  }

  input,
  select,
  textarea {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid white;
    border-radius: 5px;
    background-color: #292a44;
    color: white;
    box-sizing: border-box;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
  }
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > div {
    width: 30%;
  }
`;

function FormAnalisys() {
  const [name, setName] = useState("");
  const [tipo, setTipo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [selectedAnalisis, setSelectedAnalisis] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
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

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!name || !tipo || !date || !descripcion) {
      toast.error("Por favor, completa todos los campos.", toastOptions);
      return;
    }
    if (selectedAnalisis.length === 0) {
      toast.error("Por favor, seleccione un analisis", toastOptions);
      return;
    }
    if (!params.id) {
      try {
        const { data } = await axios.post(
          analisysRoute,
          {
            name,
            tipo,
            date,
            descripcion,
            idAnalisis: selectedAnalisis,
          },
          config
        );
        if (data.status === true) {
          toast.success("Se creó la solicitud", toastOptions);
          setTimeout(() => {
            window.location.href = "/medico";
          }, 800);
        } else {
          toast.error("No se pudo crear la solicitud", toastOptions);
          setTimeout(() => {
            window.location.href = "/medico";
          }, 800);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const { data } = await axios.put(
        analisysRoute + "/" + params.id,
        {
          name,
          tipo,
          date,
          descripcion,
          idAnalisis: selectedAnalisis,
        },
        config
      );
      if (data.status === true) {
        toast.success("Se actualizo la solicitud", toastOptions);
        setTimeout(() => {
          window.location.href = "/medico";
        }, 800);
      } else {
        toast.error("No se pudo actualizar la solicitud", toastOptions);
        setTimeout(() => {
          window.location.href = "/medico";
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      fectTask();
    }
    async function fectTask() {
      const res = await axios.get(analisysRoute + "/" + params.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setName(res.data.paciente);
      setDescripcion(res.data.observaciones);
      setDate(res.data.fecha);
      setTipo(res.data.muestra);
      const analisisSeleccionados = res.data.solicituddetalles.map(
        (detalle) => detalle.idAnalisis
      );

      setSelectedAnalisis(analisisSeleccionados);
    }
    async function getAnalisys() {
      const res = await axios.get(tipoanalisysRoute, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    }
    getAnalisys();
  }, []);

  return (
    <div>
      <FormContainer>
        <Sidebar />
        <Form onSubmit={handlesubmit}>
          <BackButton onClick={() => navigate("/medico")}>Volver</BackButton>
          <FormHeader>
            {params.id ? "Actualizar Análisis" : "Nuevo Análisis"}
          </FormHeader>
          <button type="submit">{params.id ? "Actualizar" : "Guardar"}</button>
          <FlexRow>
            <div>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Ingrese el nombre"
              />
            </div>
            <div>
              <label htmlFor="tipo">Tipo:</label>
              <select
                id="tipo"
                onChange={(e) => {
                  setTipo(e.target.value);
                }}
                value={tipo}
              >
                <option value="">Seleccione una opción</option>
                <option value="Clinica">Envio de muestra</option>
                <option value="Laboratorio">Laboratorio</option>
              </select>
            </div>
            <div>
              <label htmlFor="date">Fecha:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </FlexRow>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            cols="30"
            rows="5"
            placeholder="Ingrese la descripción"
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <RadioButtonsContainer
            datos={data}
            selectedAnalisisIds={selectedAnalisis}
            setSelectedAnalisis={setSelectedAnalisis}
          />
        </Form>
      </FormContainer>
      <ToastContainer />
    </div>
  );
}

export default FormAnalisys;
