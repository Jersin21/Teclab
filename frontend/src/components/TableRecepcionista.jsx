import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;
const NoData = styled.div`
  padding: 20px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  text-align: center;
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

function TableRecepcionista({ data },{config}) {
  const navigate = useNavigate();

  if (data.length === 0) {
    return (
      <TableContainer>
      <NoData>No hay solicitudes por asignar</NoData>
    </TableContainer>
    )
 }
  return (
    <TableContainer>
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
                    navigate(`/recepcionista/asignar/${item.id}`, {
                      state: item,
                    });
                  }}
                >
                  Asignar
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>
    </TableContainer>
  );
}

export default TableRecepcionista;
