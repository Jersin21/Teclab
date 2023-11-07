import axios from "axios";
import React, { useState,useEffect } from "react";
import { medicoRoute } from "../utils/APIroute";
import Sidebar from "./Sidebar"

const FormAsignar = ({ solicitud }) => {
  const [medicos, setMedicos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState("");

  useEffect(() => {
    const fetchMedicos = async () => {
      const response = await axios.get(medicoRoute)
      const medicos = response.data
      setMedicos(medicos);
      console.log(medicos)
    };

    fetchMedicos();
  }, []);

  const handleEnviar = () => {
    // Actualizamos el estado de la solicitud
    solicitud.medico = medicoSeleccionado;
    solicitud.estado = "Asignado";

    // Actualizamos la tabla
    // ...
  };

  return (
    <div >
      <Sidebar/>
      <h1>Asignar médico</h1>
      <form onSubmit={handleEnviar}>
        <select
          value={medicoSeleccionado}
          onChange={(e) => setMedicoSeleccionado(e.target.value)}
          options={medicos.map((medico) => ({
            value: medico.especialidad,
            label: medico.especialidad,
          }))}
        />
        <button
          type="submit"
          
        >
          Asignar
        </button>
      </form>
    </div>
  );
};

export default FormAsignar;
