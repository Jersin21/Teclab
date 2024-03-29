import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { centerRoute, medicoRoute } from "../utils/APIroute";

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
const CreateButton = styled(ActionButton)`
  background-color: #27ae60;
`;
const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

function TableCentros({ data }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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

  return (
    <>
      <TableContainer>
        <CreateButton
          onClick={() => {
            navigate("/registerCenter");
          }}
        >
          CREAR
        </CreateButton>
        <SearchInput
          type="text"
          placeholder="Buscar centro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TableWrapper>
          <TableHead>
            <TableRow>
              <th>Nombre de la Clinica</th>
              <th>Direccion</th>
              <th>Especialidad de la Clinica </th>
              <th>Acciones</th>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.direccion}</TableCell>
                <TableCell>{item.especialidades}</TableCell>
                <TableCell>
                  <DeleteButton
                    type="button"
                    onClick={async () => {
                      try {
                        const { data } = await axios.delete(
                          centerRoute + "/" + item.id,
                          config
                        );
                        if (data.status === false) {
                          toast.error(
                            "No se pudo eliminar el centro",
                            toastOptions
                          );
                        }
                        if (data.status === true) {
                          toast.success(
                            "Se eliminó el centro medico exitosamente",
                            toastOptions
                          );
                          setTimeout(() => {
                            window.location.reload("/admin");
                          }, 500);
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Eliminar
                  </DeleteButton>
                  <EditButton
                    onClick={() => {
                      navigate(`/admin/${item.id}`);
                    }}
                  >
                    Editar
                  </EditButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableWrapper>
      </TableContainer>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default TableCentros;
