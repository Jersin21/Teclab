import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { analisysRoute } from "../utils/APIroute";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #25136a;
  color: white;

  th {
    padding: 10px;
    border: 1px solid #ddd;
    font-weight: bold;
    text-align: left;
  }
`;

const TableContainer = styled.div`
  margin-left: 250px;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  color: white;

  &:last-child {
    width: 300px;
  }
`;

const ActionButton = styled.button`
  margin-right: 5px;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4caf50;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #3498db;
`;

const DeleteButton = styled(ActionButton)`
  background-color: #e74c3c;
`;

const ViewButton = styled(ActionButton)`
  background-color: #2ecc71;
`;

const CreateButton = styled(ActionButton)`
  background-color: #27ae60;
`;
const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Table = ({ data }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.paciente.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  };

  return (
    <TableContainer>
      <CreateButton
        onClick={() => {
          navigate("/analisys");
        }}
      >
        CREAR
      </CreateButton>
        <SearchInput
        type="text"
        placeholder="Buscar paciente..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableWrapper>
        <TableHead>
          <TableRow>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Tipo de muestra</th>
            <th>Estado</th>
            <th>Acciones</th>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.paciente}</TableCell>
              <TableCell>{item.fecha}</TableCell>
              <TableCell>{item.muestra}</TableCell>
              <TableCell>{item.estado}</TableCell>
              <TableCell>
                <EditButton
                  onClick={() => {
                    if (item.estado === "Iniciado") {
                      navigate("/analisys/" + item.id);
                    } else {
                      toast.error(
                        "No se puede editar. La solicitud ya ha sido asignada",
                        toastOptions
                      );
                    }
                  }}
                >
                  Editar
                </EditButton>
                <DeleteButton
                  onClick={async () => {
                    try {
                      const { data } = await axios.delete(
                        analisysRoute + "/" + item.id,
                        config
                      );
                      if (data.status === false) {
                        toast.error(
                          "No se pudo eliminar la solicitud",
                          toastOptions
                        );
                      }
                      if (data.status === true) {
                        toast.success(
                          "Solicitud eliminada exitosamente",
                          toastOptions
                        );
                        setTimeout(() => {
                          window.location.reload();
                        }, 500);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Eliminar
                </DeleteButton>
                <ViewButton
                  onClick={() => {
                    if (item.estado == "Completado") {
                      navigate("/analisysVer/ver/" + item.id);
                    } else {
                      toast.error("No se puede visualizar.", toastOptions);
                    }
                  }}
                >
                  Visualizar
                </ViewButton>
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
