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
  color: #333; /* Cambia el color del texto según tu preferencia */
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
  background-color: #3498db; /* Cambia el color del botón según tu preferencia */
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #2980b9; /* Cambia el color de fondo al pasar el ratón */
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
