import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { analisysRoute, tipoanalisysRoute } from "../utils/APIroute";
import Sidebar from "./Sidebar";

const FormContainer = styled.div`
    margin-left: 250px; /* Ancho del Sidebar */
    display: flex;
  `;
  const RadioButtonsContainer = styled.div`
  overflow-y: hidden;
  overflow-x: scroll;
  width: 100%;
`;

function FormAnalisys() {
  const [name, setName] = useState("");
  const [tipo, setTipo] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [descripcion, setDescripcion] = useState("");

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

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const { data } = await axios.post(analisysRoute, {
        name,
        tipo,
        date,
        descripcion,
      });
      if (data.status == false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status == true) {
        toast.success("Se creo la sollicitud", toastOptions);
      }
    } else {
      await axios.put(analisysRoute + "/" + params.id, {
        name,
        tipo,
        date,
        descripcion,
      });
      // if (data.status == false) {
      //   toast.error(data.msg, toastOptions);
      // }
      // if (data.status === true) {
      //   toast.success("Se actualizo la solicitud", toastOptions);
      // }
    }
    e.target.reset();
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      fectTask();
    }
    async function fectTask() {
      const res = await axios.get(analisysRoute + "/" + params.id);
      setName(res.data.paciente);
      setDescripcion(res.data.observaciones);
      setDate(res.data.fecha);
      setTipo(res.data.muestra);
    }
    async function getAnalisys() {
      const res = await axios.get(tipoanalisysRoute);
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
          onChange={(e) => setTipo(e.target.value)}
          value={tipo}
        >
          <option value="Laboratorio">Laboratorio</option>
          <option value="Clinica">Envio de muestra</option>
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
        <RadioButtonsContainer >
        {data.map((item, index) => (
        
          <label key={index}>
            <input type="radio" value={item.name} id="" />
            {item.name}
          </label>
          
        ))}
        </RadioButtonsContainer>
        <button>{params.id ? "Update" : "Save"}</button>
      </form>
      <ToastContainer></ToastContainer>
    </FormContainer>
  );
}

export default FormAnalisys;
