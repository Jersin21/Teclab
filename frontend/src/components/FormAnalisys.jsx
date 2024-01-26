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
  margin-left: 300px; /* Ancho del Sidebar */
  margin-top: 30px; /* Ancho del Sidebar */
  display: flex;
`;

function FormAnalisys() {
  const [name, setName] = useState("");
  const [tipo, setTipo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [selectedAnalisis, setSelectedAnalisis] = useState([]);

  const params = useParams();
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

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const { data } = await axios.post(
        analisysRoute,
        {
          name,
          tipo,
          date,
          descripcion,
          idAnalisis: selectedAnalisis,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status == false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status == true) {
        toast.success("Se creo la sollicitud", toastOptions);
      }
    } else {
      await axios.put(
        analisysRoute + "/" + params.id,
        {
          name,
          tipo,
          date,
          descripcion,
          idAnalisis: selectedAnalisis,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(selectedAnalisis);
    }
    e.target.reset();
    navigate("/medico");
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
      console.log(res.data);
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
    <FormContainer>
      <Sidebar></Sidebar>

      <form onSubmit={handlesubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <select
          name=""
          id=""
          onChange={(e) => {
            setTipo(e.target.value);
          }}
          value={tipo}
        >
          <option value="">Seleccione una opcion</option>
          <option value="Clinica">Envio de muestra</option>
          <option value="Laboratorio">Laboratorio</option>
        </select>
        <input
          type="date"
          name=""
          id=""
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          name=""
          id=""
          value={descripcion}
          cols="100"
          rows="1"
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <RadioButtonsContainer
          datos={data}
          selectedAnalisisIds={selectedAnalisis}
          setSelectedAnalisis={setSelectedAnalisis}
        />

        <button>{params.id ? "Update" : "Save"}</button>
      </form>
      <ToastContainer></ToastContainer>
    </FormContainer>
  );
}

export default FormAnalisys;
