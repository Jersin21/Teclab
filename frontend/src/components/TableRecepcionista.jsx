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
  color: #333; 
`;

const TableHead = styled.thead`
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
    width: 150px; 
  }
`;

const ActionButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #2980b9;
  }
`;

function TableRecepcionista({ data }) {
  const navigate = useNavigate();

  if (data.length === 0) {
    return <NoData>No hay solicitudes por asignar</NoData>;
  }

  return (
    <TableContainer>
      <TableWrapper>
        <TableHead>
          <TableRow>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Tipo de muestra</th>
            <th>Estado</th>
            <th>Acciones</th>
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
