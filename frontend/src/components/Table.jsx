import { useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { analisysRoute } from "../utils/APIroute";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Estilos para la tabla
const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #25136a;
  color: white;
`;
const TableContainer = styled.div`
  margin-left: 250px; /* Ancho del Sidebar */
`;
const TableBody = styled.tbody``;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  color: white;
`;

const ActionButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;

const Table = ({ data }) => {
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

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  return (
    <TableContainer>
      <ActionButton
        onClick={() => {
          navigate("/analisys");
        }}
        style={{ backgroundColor: "green", color: "white" }}
      >
        CREAR
      </ActionButton>

      <TableWrapper>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Tipo de muestra</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.paciente}</TableCell>
              <TableCell>{item.fecha}</TableCell>
              <TableCell>{item.muestra}</TableCell>
              <TableCell>{item.estado}</TableCell>
              <TableCell>
                <ActionButton
                  style={{ backgroundColor: "blue", color: "white" }}
                  onClick={() => {
                    navigate("/analisys/" + item.id);
                  }}
                >
                  Editar
                </ActionButton>
                <ActionButton
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={async () => {
                    try {
                      const { data } = await axios.delete(
                        analisysRoute + "/" + item.id,config
                      );
                      if (data.status === false) {
                        toast.error("No se pudo eliminar", toastOptions);
                      }
                      if (data.status === true) {
                        toast.success("Se Elinmino", toastOptions);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Eliminar
                </ActionButton>
                <ActionButton
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  Visualizar
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>
      <ToastContainer />
    </TableContainer>
  );
};

export default Table;
