import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  height: 100vh;
`;

const CategoryTitle = styled.h3`
  margin-top: 20px;
  text-align: left;
  color: #fff;
`;

const CheckboxRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const CheckboxInput = styled.input`
  cursor: pointer;
  height: 18px;
  width: 18px;
`;

const CheckboxLabel = styled.label`
  color: white;
  cursor: pointer;
  margin:10px;
  padding-bottom: 10px;
`;

const RadioButtonsContainer = ({
  datos,
  selectedAnalisisIds,
  setSelectedAnalisis,
}) => {
  const [categoriasConAnalisis, setCategoriasConAnalisis] = useState({});

  useEffect(() => {
    const groupedAnalisis = datos.reduce((result, item) => {
      const categoria = item.categorium || { id: 0, name: "Sin Categoría" };

      const categoriaNombre = categoria.name || "Sin Categoría";

      if (!result[categoriaNombre]) {
        result[categoriaNombre] = [];
      }

      result[categoriaNombre].push(item);
      return result;
    }, {});

    setCategoriasConAnalisis(groupedAnalisis);
  }, [datos]);
  const handleCheckboxChange = (e) => {
    const idAnalisis = parseInt(e.target.value, 10);

    setSelectedAnalisis((prevSelected) => {
      if (prevSelected.includes(idAnalisis)) {
        return prevSelected.filter((id) => id !== idAnalisis);
      } else {
        return [...prevSelected, idAnalisis];
      }
    });
  };

  return (
    <Container>
      {Object.keys(categoriasConAnalisis).map((categoriaNombre, index) => (
        <div key={index}>
          <CategoryTitle>{categoriaNombre}</CategoryTitle>
          <br />
          <CheckboxRow>
            {categoriasConAnalisis[categoriaNombre].map(
              (analisis, analisisIndex) => (
                <div key={analisisIndex}>
                  <CheckboxLabel htmlFor={analisis.id}>
                    {analisis.name}
                  </CheckboxLabel>
                    <CheckboxInput
                      onChange={handleCheckboxChange}
                      type="checkbox"
                      value={analisis.id}
                      id={analisis.id}
                      checked={selectedAnalisisIds.includes(analisis.id)}
                    />
                </div>
              )
            )}
          </CheckboxRow>
        </div>
      ))}
      <br />
    </Container>
  );
};

export default RadioButtonsContainer;
