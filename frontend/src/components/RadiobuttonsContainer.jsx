import React, { useState, useEffect } from "react";

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
    const idAnalisis = e.target.value;

    setSelectedAnalisis((prevSelected) => {
      if (prevSelected.includes(idAnalisis)) {
        return prevSelected.filter((id) => id !== idAnalisis);
      } else {
        return [...prevSelected, idAnalisis];
      }
    });
  };

  return (
    <div>
      {Object.keys(categoriasConAnalisis).map((categoriaNombre, index) => (
        <div key={index}>
          <h3>{categoriaNombre}</h3>
          {categoriasConAnalisis[categoriaNombre].map(
            (analisis, analisisIndex) => (
              <label key={analisisIndex}>
                <input
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  value={analisis.id}
                  id={analisis.id}
                  checked={selectedAnalisisIds.includes(analisis.id)}
                />
                {analisis.name}
              </label>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default RadioButtonsContainer;
