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

function TableResponsable({ data }) {
  const navigate = useNavigate();
  if (data.length === 0) {
    return <NoData>No hay solicitudes por asignar</NoData>;
  }
  return (
    <TableContainer>
      <TableWrapper>
        <TableHead>
          <TableRow>
            <th>Nombre del Paciente</th>
            <th>Nombre del Médico</th>
            <th>Especialidad del Médico</th>
            <th>Observaciones</th>
            <th>Nombre de la Clínica</th>
            <th>Acciones</th>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.solicitudes.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.paciente}</TableCell>
              <TableCell>{item.medico.User.persona.nombre}</TableCell>
              <TableCell>{item.medico.especialidad}</TableCell>
              <TableCell>{item.observaciones}</TableCell>
              <TableCell>{item.medico.clinica.name}</TableCell>
              <TableCell>
                <ActionButton
                  onClick={() => {
                    navigate(`/responsable/subir/${item.id}`, {
                      state: item,
                    });
                  }}
                >
                  Subir
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>
    </TableContainer>
  );
}

export default TableResponsable;
