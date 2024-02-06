import React, { useState,useEffect } from "react";
import styled from "styled-components";
import InputFile from "./InputFile";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background-color: #1a1a2e;
  color: white;

  label {
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid white;
    border-radius: 5px;
    background-color: #292a44;
    color: white;
    box-sizing: border-box;
    resize: vertical;
  }

  input[type="file"] {
    display: none; /* Oculta el input de tipo file */
  }

  .file-input-label {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 15px;
  }
`;


const AnalysisForm = ({
  category,
  analysis,
  onResultChange,
  onImageChange,
  onRemoveImage,
  analysisId,
  
}) => {
  const [resultado, setResultado] = useState("");
  const [images, setImages] = useState([]);

  const handleResultadoChange = (e) => {
    const value = e.target.value;
    setResultado(value);
    onResultChange(analysis.id, value);
  };

  const handleImageChange = (updatedImages) => {
    setImages(updatedImages);
    onImageChange(analysis.id,updatedImages);
  };
  
  return (
    <Form>
      <h2>{category}</h2>
      <label htmlFor={`resultado-${analysis.analisis.id}`}>
        {analysis.analisis.name}:
      </label>
      <textarea
        id={`resultado-${analysis.analisis.id}`}
        name={`resultado-${analysis.analisis.id}`}
        value={resultado}
        onChange={handleResultadoChange}
        required
      ></textarea>
      <InputFile onChange={handleImageChange} analisisids={analysis.id} />
    </Form>
  );
};
export default AnalysisForm;
