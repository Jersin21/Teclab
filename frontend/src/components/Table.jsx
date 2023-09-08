
import React from 'react';
import styled from 'styled-components';

// Estilos para la tabla
const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #25136A;
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
  color:white;
`;

const ActionButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;

const Table = ({ data }) => {
  console.log(data)
  return (
    <TableContainer>

    <TableWrapper>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Apellido</TableCell>
          <TableCell>Especialidad</TableCell>
          <TableCell>Ciudad</TableCell>
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
              <ActionButton style={{ backgroundColor: 'blue', color: 'white' }}>Editar</ActionButton>
              <ActionButton style={{ backgroundColor: 'red', color: 'white' }}>Eliminar</ActionButton>
              <ActionButton style={{ backgroundColor: 'green', color: 'white' }}>Visualizar</ActionButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableWrapper>
        </TableContainer>
  );
};

export default Table;
